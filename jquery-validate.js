(function($, window, document, undefined) {

	var

		// 
		defaults = {
			sendForm : true,
			waiAria : true,
			on : {
				submit : true,
				keyup : false,
				blur : false
			},
			nameSpace : 'validate'
		},

		// 
		type = ['[type="color"],[type="date"],[type="datetime"],[type="datetime-local"],[type="email"],[type="file"],[type="hidden"],[type="month"],[type="number"],[type="password"],[type="range"],[type="search"],[type="tel"],[type="text"],[type="time"],[type="url"],[type="week"],textarea','select','[type="checkbox"],[type="radio"]'],

		// 
		allTypes = type.join(','),

		// 
		validateField = function(event) {

			var

				// 
				status = {
					pattern : true,
					conditional : true,
					required : true
				},

				// 
				field = $(this),

				// 
				fieldValue = field.val(),

				// 
				fieldPrepare = field.data('prepare'),

				// Expressão regular para validar o campo
				fieldPattern = (field.data('pattern') || /(?:)/),

				// Boleano que especifica se a expressão regular será sensivel ao case
				fieldIgnoreCase = field.data('ignore-case'),

				// Mascara para o campo do formulário baseada na expressão regula passada
				fieldMask = field.data('mask'),

				// 
				fieldConditional = field.data('conditional'),

				// 
				fieldRequired = field.data('required');

			// Verifico se o padrão não está no formato RegExp
			if(typeof fieldPattern != 'object' && fieldPattern.exec != 'function') {

				fieldIgnoreCase = (fieldIgnoreCase == 'false' || fieldIgnoreCase == false) ? false : true;

				// Converto o padrão informado para o formato RegExp
				fieldPattern = fieldIgnoreCase ? RegExp(fieldPattern.replace(/\\/g, '\\'), 'i') : RegExp(fieldPattern.replace(/\\/g, '\\'));
			}

			// Verifico se é um tipo de campo cujo o texto deve ser validado
			if(field.is(type[0])) {

				// Verifico se o valor do campo é fiel ao padrão informado
				if(fieldPattern.test(fieldValue)) {

					// Verifico se o evento não é keyup e se uma máscara foi passada
					if(event.type != 'keyup' && fieldMask != undefined) {

						var matches = fieldValue.match(fieldPattern);

						for(var i = 0, len = matches.length; i < len; i++) {

							fieldMask = fieldMask.replace(RegExp('\\$\\{' + i + '(?:\\:([^\\{\\}\\:]*))?\\}'), (matches[i] !== undefined ? matches[i] : '$1'));
						}

						field.val(fieldMask.replace(/\$\{[0-9]+(?:\:([^\{\}]*))?\}/g, '$1'));
					}
				} else {

					status.pattern = false;
				}
			}

			if(field.is(type[0] + ',' + type[1])) {

				//
			} else {

				//
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

					// Verifico se deve validar ao soltar a tecla
					if(!!(options.on.keyup || false)) {

						fields.filter(type[0]).on('keyup.' + options.namespace, function(event) {

							validateField.call(this, event);
						});
					}

					// Verifico se devo validar ao desfocar um campo
					if(!!(options.on.blur || false)) {

						fields.on('blur.' + options.namespace, function(event) {

							validateField.call(this, event);
						});
					}

					// Verifico se devo validar ao submeter o formulário
					if(!!(options.on.submit || true)) {

						form.on('submit.' + options.namespace, function(event) {

							var formValid = true;

							fields.each(function() {

								var status = validateField.call(this, event);

								if(!status.pattern || !status.conditional || !status.required) {

									formValid = false;
								}
							});

							// Verifico se os dados do formulário são válidos
							if(formValid) {

								// Verifico se devo impedir que o formulário seja submetido
								if(!options.sendForm) {

									// Evita que o formulário seja submetido
									event.preventDefault();
								}
							} else {

								// Evita que o formulário seja submetido
								event.preventDefault();
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