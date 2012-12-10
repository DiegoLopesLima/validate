/* http://diegolopeslima.github.com/jQuery-AnyForm */
;(function($, window, undefined) {

	var

		// Parametros padrões do método jQuery.fn.validate
		defaults = {

			// Define se o formulário deve ser enviado caso esteja inválido
			sendForm : true,

			// Define se propiedades WAI-ARIA devem ser modificadas conforme a validação
			waiAria : true,

			// Define se o formulário deve ser validado no submit
			onSubmit : true,

			// Define se cada campo deve ser validado eu precionar uma tecla
			onKeyup : false,

			// Define se cada campo deve ser validado ao perder o foco
			onBlur : false,

			// Define se cada campo deve ser validado ao ser alterado
			onChange : false,

			// Define um name space que será incluido na delegação dos eventos
			nameSpace : 'validate',

			// Um objeto contendo funções com retorno boleano para validar os campos
			conditional : {},

			// Um objeto contendo funções para tratar o valor dos campos antes da validação
			prepare : {},

			// Uma função chamada para cada campo validado
			eachField : $.noop,

			// Uma função chamada para cada campo inválido
			eachInvalidField : $.noop,

			// Uma função chamada para cada campo válido
			eachValidField : $.noop,

			// Uma função chamada quando o formulário for inválido
			invalid : $.noop,

			// Uma função chamada quando o formulário é válido
			valid : $.noop,

			// Uma função ou seletor para filtrar os campos que deverão ser validados
			filter : '*'
		},

		// Divide os tipos de campos em grupos conforme o tipo de validação
		type = ['[type="color"],[type="date"],[type="datetime"],[type="datetime-local"],[type="email"],[type="file"],[type="hidden"],[type="month"],[type="number"],[type="password"],[type="range"],[type="search"],[type="tel"],[type="text"],[type="time"],[type="url"],[type="week"],textarea', 'select', '[type="checkbox"],[type="radio"]'],

		// Define uma variável contendo todos os tipos de campos
		allTypes = type.join(','),

		// Método para validar campos individuais
		validateField = function(event, options) {

			var

				// Define os status padrão do campo
				status = {
					pattern : true,
					conditional : true,
					required : true
				},

				// O campo atual
				field = $(this),

				// O valor do campo atual
				fieldValue = field.val(),

				// Um índice ou mais separados or espaços do objeto prepare para tratar o valor do campo antes da validação
				fieldPrepare = field.data('prepare'),

				// Expressão regular para validar o campo
				fieldPattern = (field.data('pattern') || /(?:)/),

				// Boleano que especifica se a expressão regular será sensivel ao case
				fieldIgnoreCase = field.data('ignore-case'),

				// Mascara para o campo do formulário baseada na expressão regula passada
				fieldMask = field.data('mask'),

				// Um índice dentro do objeto conditional contendo uma função que será convertida em Boleano para validar o campo
				fieldConditional = field.data('conditional'),

				// Um Boleano que diz se o campo é obrigatório
				fieldRequired = field.data('required'),

				// Um boleano que define se os espaços no início e final do valor do campo devem ser retirados antes da validação
				fieldTrim = field.data('trim'),

				reTrue = /^(true|1|)$/i,

				reFalse = /^(false|0)$/i;

			// Verifica se devo aparar os espaçoes no começo e fim do valor do campo
			if(reTrue.test(fieldTrim)) {

				fieldValue = $.trim(fieldValue);
			}

			// Verifica se fieldPrepare está no formato de função
			if($.isFunction(fieldPrepare)) {

				// Atualisa o valor a ser validado para o valor de retorno da função
				fieldValue = String(fieldPrepare.call(field, fieldValue));
			} else {

				// Verifica se existe a função de preparo passada
				if($.isFunction(options.prepare[fieldPrepare])) {

					// Atualisa o valor a ser validado para o valor de retorno da função
					fieldValue = String(options.prepare[fieldPrepare].call(field, fieldValue));
				}
			}

			// Verifica se o padrão não está no formato RegExp
			if($.type(fieldPattern) != 'regexp') {

				fieldIgnoreCase = reFalse.test(fieldIgnoreCase) ? false : true;

				// Converto o padrão informado para o formato RegExp
				fieldPattern = fieldIgnoreCase ? RegExp(fieldPattern, 'i') : RegExp(fieldPattern);
			}

			// Verifico se existe uma condicional
			if(fieldConditional != undefined) {

				// Verifico se a condiocinal está no formato de função
				if($.isFunction(fieldConditional)) {

					status.conditional = !!fieldConditional.call(field, event, options);
				} else {

					var

						// Divido as condiocionais em um Array
						conditionals = fieldConditional.split(/[\s\t]+/);

					// Percorro todas as condicionais
					for(var counter = 0, len = conditionals.length; counter < len; counter++) {

						if(conditionals[counter] in options.conditional && !options.conditional[conditionals[counter]].call(field, event, options)) {

							status.conditional = false;
						}
					}
				}
			}

			fieldRequired = reTrue.test(fieldRequired) ? true : false;

			// Verifica se o campo é obrigatório
			if(fieldRequired) {

				// Verifica o tipo de campo
				if(field.is(type[0] + ',' + type[1])) {

					// Verifica se o campo foi preenchido
					if(!fieldValue.length > 0) {

						status.required = false;
					}
				} else if(field.is(type[2])) {

					if(field.is('[name]')) {

						// Verifica se algum dos campos foi marcado
						if($('[name="' + field.attr('name') + '"]:checked').length == 0) {

							status.required = false;
						}
					} else {

						status.required = field.is(':checked');
					}
				}
			}

			// Verifica se é um tipo de campo cujo o texto deve ser validado
			if(field.is(type[0])) {

				// Verifica se o valor do campo é fiel ao padrão informado
				if(fieldPattern.test(fieldValue)) {

					// Verifica se o evento não é keyup e se uma máscara foi passada
					if(event.type != 'keyup' && fieldMask != undefined) {

						var

							// Uso o pattern informado para capturar os grupos de caracteres
							matches = fieldValue.match(fieldPattern);

						// Percorro todos os grupos de caracteres
						for(var i = 0, len = matches.length; i < len; i++) {

							// Substituo as ocorrências dos grupos na mascara informada
							fieldMask = fieldMask.replace(RegExp('\\$\\{' + i + '(?:\\:([^\\{\\}\\:]*))?\\}'), (matches[i] !== undefined ? matches[i] : '$1'));
						}

						// Verifica se o valor construido com a mascara é válido
						if(fieldPattern.test(fieldMask)) {

							// Atualizo o valor do campo
							field.val(fieldMask.replace(/\$\{[0-9]+(?:\:([^\{\}]*))?\}/g, '$1'));
						}
					}
				} else {

					// Verifica se o campo é obrigatório
					if(fieldRequired) {

						// Define o campo como inválido pelo pattern
						status.pattern = false;
					} else {

						// Verifica se algo foi preenchido
						if(fieldValue.length > 0) {

							// Define o campo como inválido pelo pattern
							status.pattern = false;
						}
					}
				}
			}

			// Chama o callback eachField
			options.eachField.call(field, event, status, options);

			// Verifica se o campo é válido
			if(status.required && status.pattern && status.conditional) {

				// Verifica se propriedades WAi-ARIA podem ser alteradas
				if(!!options.waiAria) {

					field.attr('aria-invalid', false);
				}

				// Chama o callback eachValidField
				options.eachValidField.call(field, event, status, options);
			} else {

				// Verifica se propriedades WAi-ARIA podem ser alteradas
				if(!!options.waiAria) {

					field.attr('aria-invalid', true);
				}

				// Chama o callback eachInvalidField
				options.eachInvalidField.call(field, event, status, options);
			}

			// Retorna os status do campo
			return status;
		};

	$.extend({

		// Método para alterar as opções padrões do método jQuery.fn.validate
		validateSetup : function(options) {

			return $.isPlainObject(options) ? $.extend(defaults, options) : defaults;
		},

		// Objeto com informações sobre o plugin
		validate : {
			version : '1.0'
		}
	}).fn.extend({

		// Método para validação de formulários
		validate : function(options) {

			options = $.isPlainObject(options) ? $.extend(defaults, options) : defaults;

			return $(this).validateDestroy().each(function() {

				var form = $(this);

				// Verifica se o elemento encapsulado é um formulário
				if(form.is('form')) {

					form.data('validate', {
						options : options
					});

					var fields = form.find(allTypes);

					// verifica se o formulário possui o atributo is
					if(form.is('[id]')) {

						fields = fields.add('[form="' + form.attr('id') + '"]').filter(allTypes);
					}

					fields = fields.filter(options.filter);

					// Verifica se deve validar ao soltar a tecla
					if(!!options.onKeyup) {

						fields.filter(type[0]).on('keyup.' + options.namespace, function(event) {

							validateField.call(this, event, options);
						});
					}

					// Verifica se devo validar ao desfocar um campo
					if(!!options.onBlur) {

						fields.on('blur.' + options.namespace, function(event) {

							validateField.call(this, event, options);
						});
					}

					// Verifica se devo validar ao alterar o valor de um campo
					if(!!options.onChange) {

						fields.on('change.' + options.namespace, function(event) {

							validateField.call(this, event, options);
						});
					}

					// Verifica se devo validar ao submeter o formulário
					if(!!options.onSubmit) {

						form.on('submit.' + options.namespace, function(event) {

							var formValid = true;

							fields.each(function() {

								// Armazena os status do campo percorrido atualmente
								var status = validateField.call(this, event, options);

								if(!status.pattern || !status.conditional || !status.required) {

									formValid = false;
								}
							});

							// Verifica se os dados do formulário são válidos
							if(formValid) {

								// Verifica se devo impedir que o formulário seja submetido
								if(!options.sendForm) {

									// Evita que o formulário seja submetido
									event.preventDefault();
								}

								// Verifica se o callback valid foi definido e é uma função
								if($.isFunction(options.valid)) {

									options.valid.call(form, event, options);
								}
							} else {

								// Evita que o formulário seja submetido
								event.preventDefault();

								// Verifica se o callback invalid foi definido e é uma função
								if($.isFunction(options.invalid)) {

									options.invalid.call(form, event, options);
								}
							}
						});
					}
				}
			});
		},

		// Metodo destrutor para o método jQuery.fn.validate
		validateDestroy : function() {

			var

				// Formulário que terá a função de validação destruida
				form = $(this),

				// Armazena os dados de validação contidos no campo
				dataValidate = form.data('validate');

			// Verifico se o elemento encapsulado é um formulário e se possui dados de validação
			if(form.is('form') && $.isPlainObject(dataValidate) && typeof(dataValidate.options.nameSpace) != 'undefined') {

				var

					// Armazena o name space que foi usado na delegação dos eventos
					nameSpace = dataValidate.nameSpace,

					// Armazenas os campos filhos do formulário e remove os dados da validação
					fields = form.removeData('validate').find(allTypes).andSelf();

				// Verifica se o formulário possui o atributo id
				if(form.is('[id]')) {

					// Procura por campos fora do formulário porém que são parte do mesmo
					fields = fields.add($('[form="' + form.attr('id') + '"]').filter(allTypes));
				}

				// Desliga os eventos com o name space usado
				fields.off('.' + nameSpace);
			}

			// Retorna o proprio elemento selecionado para proporcionar encadeamento
			return form;
		}
	});
})(jQuery, window);