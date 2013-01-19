/* jQuery Validate 1.1.1 - https://github.com/DiegoLopesLima/Validate */
;(function(defaults, $, window, undefined) {

	var

		type = ['[type="color"],[type="date"],[type="datetime"],[type="datetime-local"],[type="email"],[type="file"],[type="hidden"],[type="month"],[type="number"],[type="password"],[type="range"],[type="search"],[type="tel"],[type="text"],[type="time"],[type="url"],[type="week"],textarea', 'select', '[type="checkbox"],[type="radio"]'],

		// Define uma variável contendo todos os tipos de campos
		allTypes = type.join(','),

		extend = {},

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
				fieldValue = field.val() || '',

				// Um índice de uma extenção para validação
				fieldValidate = field.data('validate'),

				// Objeto contendo uma validação criada por jQuery.fn.validateExtend
				validation = fieldValidate !== undefined ? extend[fieldValidate] : {},

				// Um índice ou mais separados or espaços do objeto prepare para tratar o valor do campo antes da validação
				fieldPrepare = field.data('prepare') || validation.prepare,

				// Expressão regular para validar o campo
				fieldPattern = (field.data('pattern') || ($.type(validation.pattern) == 'regexp' ? validation.pattern : /(?:)/)),

				// Boleano que especifica se a expressão regular será sensivel ao case
				fieldIgnoreCase = field.attr('data-ignore-case') || field.data('ignoreCase') || validation.ignoreCase,

				// Mascara para o campo do formulário baseada na expressão regula passada
				fieldMask = field.data('mask') || validation.mask,

				// Um índice dentro do objeto conditional contendo uma função que será convertida em Boleano para validar o campo
				fieldConditional = field.data('conditional') || validation.conditional,

				// Um Boleano que diz se o campo é obrigatório
				fieldRequired = field.data('required'),

				// O id do elemento que receberá as descrições
				fieldDescribedby = field.data('describedby') || validation.describedby,

				// Um índice de uma objeto que descreve os estados do campo
				fieldDescription = field.data('description') || validation.description,

				// Um boleano que define se os espaços no início e final do valor do campo devem ser retirados antes da validação
				fieldTrim = field.data('trim'),

				reTrue = /^(true|)$/i,

				reFalse = /^false$/i,

				// Um objeto contendo descrições para os estados do campo
				fieldDescription = $.isPlainObject(fieldDescription) ? fieldDescription : (options.description[fieldDescription] || {}),

				name = 'validate';

			fieldRequired = fieldRequired != '' ? (fieldRequired || !!validation.required) : true;

			fieldTrim = fieldTrim != '' ? (fieldTrim || !!validation.trim) : true;

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

				fieldIgnoreCase = !reFalse.test(fieldIgnoreCase);

				// Converto o padrão informado para o formato RegExp
				fieldPattern = fieldIgnoreCase ? RegExp(fieldPattern, 'i') : RegExp(fieldPattern);
			}

			// Verifico se existe uma condicional
			if(fieldConditional != undefined) {

				// Verifico se a condiocinal está no formato de função
				if($.isFunction(fieldConditional)) {

					status.conditional = !!fieldConditional.call(field, fieldValue, options);
				} else {

					var

						// Divido as condiocionais em um Array
						conditionals = fieldConditional.split(/[\s\t]+/);

					// Percorro todas as condicionais
					for(var counter = 0, len = conditionals.length; counter < len; counter++) {

						if(options.conditional.hasOwnProperty(conditionals[counter]) && !options.conditional[conditionals[counter]].call(field, fieldValue, options)) {

							status.conditional = false;
						}
					}
				}
			}

			fieldRequired = reTrue.test(fieldRequired);

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
						if($('[name="' + field.prop('name') + '"]:checked').length == 0) {

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
					if(event.type != 'keyup' && fieldMask !== undefined) {

						var

							// Uso o pattern informado para capturar os grupos de caracteres
							matches = fieldValue.match(fieldPattern);

						// Percorro todos os grupos de caracteres
						for(var i = 0, len = matches.length; i < len; i++) {

							// Substituo as ocorrências dos grupos na mascara informada
							fieldMask = fieldMask.replace(RegExp('\\$\\{' + i + '(?::`([^`]*)`)?\\}', 'g'), (matches[i] !== undefined ? matches[i] : '$1'));
						}

						fieldMask = fieldMask.replace(/\$\{\d+(?::`([^`]*)`)?\}/g, '$1');

						// Verifica se o valor construido com a mascara é válido
						if(fieldPattern.test(fieldMask)) {

							// Atualizo o valor do campo
							field.val(fieldMask);
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

			var

				describedby = $('[id="' + fieldDescribedby +'"]'),

				log = fieldDescription.valid;

			if(describedby.length > 0 && event.type != 'keyup') {

				if(!status.required) {

					log = fieldDescription.required;
				} else if(!status.pattern) {

					log = fieldDescription.pattern;
				} else if(!status.conditional) {

					log = fieldDescription.conditional;
				}

				describedby.html(log || '');
			}

			// Chama o callback eachField
			options.eachField.call(field, event, status, options);

			// Verifica se o campo é válido
			if(status.required && status.pattern && status.conditional) {

				// Verifica se propriedades WAi-ARIA podem ser alteradas
				if(!!options.waiAria) {

					field.prop('aria-invalid', false);
				}

				// Chama o callback eachValidField
				options.eachValidField.call(field, event, status, options);
			} else {

				// Verifica se propriedades WAi-ARIA podem ser alteradas
				if(!!options.waiAria) {

					field.prop('aria-invalid', true);
				}

				// Chama o callback eachInvalidField
				options.eachInvalidField.call(field, event, status, options);
			}

			// Retorna os status do campo
			return status;
		};

	$.extend({

		// Método para extender as validações
		validateExtend : function(options) {

			return $.extend(extend, options);
		},

		// Método para alterar as opções padrões do método jQuery.fn.validate
		validateSetup : function(options) {

			return $.extend(defaults, options);
		}
	}).fn.extend({

		// Método para validação de formulários
		validate : function(options) {

			options = $.extend({}, defaults, options);

			return $(this).validateDestroy().each(function() {

				var form = $(this);

				// Verifica se o elemento encapsulado é um formulário
				if(form.is('form')) {

					form.data(name, {
						options : options
					});

					var fields = form.find(allTypes);

					// verifica se o formulário possui o atributo is
					if(form.is('[id]')) {

						fields = fields.add('[form="' + form.prop('id') + '"]').filter(allTypes);
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
				dataValidate = form.data(name);

			// Verifico se o elemento encapsulado é um formulário e se possui dados de validação
			if(form.is('form') && $.isPlainObject(dataValidate) && typeof(dataValidate.options.nameSpace) == 'string') {

				var

					// Armazena o name space que foi usado na delegação dos eventos
					nameSpace = dataValidate.nameSpace,

					// Armazenas os campos filhos do formulário e remove os dados da validação
					fields = form.removeData(name).find(allTypes).add(form);

				// Verifica se o formulário possui o atributo id
				if(form.is('[id]')) {

					// Procura por campos fora do formulário porém que são parte do mesmo
					fields = fields.add($('[form="' + form.prop('id') + '"]').filter(allTypes));
				}

				// Desliga os eventos com o name space usado
				fields.off('.' + nameSpace);
			}

			// Retorna o proprio elemento selecionado para proporcionar encadeamento
			return form;
		}
	});
})({

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

	// Um objeto contendo descrições para os possíveis estados do campo
	description : {},

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
}, jQuery, window);