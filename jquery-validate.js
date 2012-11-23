(function($, window, document, undefined) {

	var

		// 
		defaults = {
			sendForm : true,
			waiAria : true,
			on : {
				submit : true,
				keyup : false,
				blur : false,
				change : false
			},
			nameSpace : 'validate',
			conditionals : {},
			eachField : $.noop,
			eachInvalidField : $.noop,
			eachValidField : $.noop,
			invalid : $.noop,
			valid : $.noop
		},

		// 
		type = ['[type="color"],[type="date"],[type="datetime"],[type="datetime-local"],[type="email"],[type="file"],[type="hidden"],[type="month"],[type="number"],[type="password"],[type="range"],[type="search"],[type="tel"],[type="text"],[type="time"],[type="url"],[type="week"],textarea', 'select', '[type="checkbox"],[type="radio"]'],

		// 
		allTypes = type.join(','),

		// 
		validateField = function(event, options) {

			var

				// 
				status = {
					pattern : true,
					conditional : true,
					required : true
				},

				// O campo atual
				field = $(this),

				// O valor do campo atual
				fieldValue = field.val(),

				// ?
				fieldPrepare = field.data('prepare'),

				// Expressão regular para validar o campo
				fieldPattern = (field.data('pattern') || /(?:)/),

				// Boleano que especifica se a expressão regular será sensivel ao case
				fieldIgnoreCase = field.data('ignore-case'),

				// Mascara para o campo do formulário baseada na expressão regula passada
				fieldMask = field.data('mask'),

				// Um índice dentro do objeto conditionals contendo uma função que será convertida em Boleano para validar o campo
				fieldConditional = field.data('conditional'),

				// Um Boleano que diz se o campo é obrigatório
				fieldRequired = field.data('required'),

				// Um boleano que define se os espaços no início e final do valor do campo devem ser retirados antes da validação
				fieldTrim = field.data('trim');

			// Verifica se o padrão não está no formato RegExp
			if(typeof fieldPattern != 'object' && fieldPattern.exec != 'function') {

				fieldIgnoreCase = (fieldIgnoreCase == 'false' || fieldIgnoreCase == false) ? false : true;

				// Converto o padrão informado para o formato RegExp
				fieldPattern = fieldIgnoreCase ? RegExp(fieldPattern, 'i') : RegExp(fieldPattern);
			}

			// Verifica se devo aparar os espaçoes no começo e fim do valor do campo
			if(/^(?:true|1|)$/i.test(fieldTrim)) {

				fieldValue = $.trim(fieldValue);
			}

			if(typeof fieldConditional == 'function') {

				status.conditional = !!fieldConditional();
			} else {

				status.conditional = !!options.conditionals[fieldConditional];
			}

			fieldRequired = /^(?:true|1|)$/i.test(fieldRequired) ? true : false;

			// Verifica se o campo é obrigatório
			if(fieldRequired) {

				if(field.is(type[0] + ',' + type[1])) {

					if(!fieldValue.length > 0) {

						status.required = false;
					}
				} else if(field.is(type[2]) && field.is('[name]')) {

					if($('[name="' + field.attr('name') + '"]:checked').length == 0) {

						status.required = false;
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
						if(!fieldValue.length > 0) {

							// Define o campo como inválido pelo pattern
							status.pattern = false;
						}
					}
				}
			}

			// Chama o callback eachField
			options.eachField.call(field, event, status, options);

			// Verifica se o campo é válido
			if(status.required || status.pattern || status.conditional) {

				// Chama o callback eachValidField
				options.eachValidField.call(field, event, status, options);
			} else {

				// Chama o callback eachInvalidField
				options.eachInvalidField.call(field, event, options);
			}

			return status;
		};

	$.extend({

		// 
		validateSetup : function(options) {

			return $.isPlainObject(options) ? $.extend(defaults, options) : defaults;
		}
	}).fn.extend({

		// 
		validate : function(options) {

			options = $.isPlainObject(options) ? $.extend(defaults, options) : defaults;

			return $(this).validateDestroy().each(function() {

				var form = $(this);

				if(form.is('form')) {

					form.data('validate', {
						options : options
					});

					var fields = form.find(allTypes);

					if(form.is('[id]')) {

						fields = fields.add('[form="' + form.attr('id') + '"]').filter(allTypes);
					}

					// Verifica se deve validar ao soltar a tecla
					if(!!(options.on.keyup || false)) {

						fields.filter(type[0]).on('keyup.' + options.namespace, function(event) {

							validateField.call(this, event, options);
						});
					}

					// Verifica se devo validar ao desfocar um campo
					if(!!(options.on.blur || false)) {

						fields.on('blur.' + options.namespace, function(event) {

							validateField.call(this, event, options);
						});
					}

					// Verifica se devo validar ao alterar o valor de um campo
					if(!!(options.on.change || false)) {

						fields.on('change.' + options.namespace, function(event) {

							validateField.call(this, event, options);
						});
					}

					// Verifica se devo validar ao submeter o formulário
					if(!!(options.on.submit || true)) {

						form.on('submit.' + options.namespace, function(event) {

							var formValid = true;

							fields.each(function() {

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

								if(typeof(options.valid) == 'function') {

									options.valid.call(form, event, options);
								}
							} else {

								// Evita que o formulário seja submetido
								event.preventDefault();

								if(typeof(options.invalid) == 'function') {

									options.invalid.call(form, event, options);
								}
							}
						});
					}
				}
			});
		},

		// 
		validateDestroy : function() {

			var

				//
				form = $(this),

				// 
				dataValidate = form.data('validate');

			if(form.is('form') && typeof dataValidate == 'object' && typeof(dataValidate.options.nameSpace) != 'undefined') {

				var

					// 
					nameSpace = dataValidate.nameSpace,

					// 
					fields = form.removeData('validate').find(allTypes).andSelf();

				// 
				if(form.is('[id]')) {

					fields = fields.add($('[form="' + form.attr('id') + '"]').filter(allTypes));
				}

				fields.off('.' + nameSpace);
			}

			return form;
		}
	});
})(jQuery, window, document);