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
			}
		},

		// 
		config = {
			namespace : 'validate',
			dataAttribute : 'validate'
		},

		// 
		type = ['[type="color"],[type="date"],[type="datetime"],[type="datetime-local"],[type="email"],[type="file"],[type="hidden"],[type="month"],[type="number"],[type="password"],[type="range"],[type="search"],[type="tel"],[type="time"],[type="url"],[type="week"],textarea' , 'select', '[type="checkbox"],[type="radio"]'],

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

				// 
				fieldPattern = field.data('pattern'),

				// 
				fieldIgnoreCase = field.data('ignore-case'),

				// 
				fieldMask = field.data('mask'),

				// 
				fieldConditional = field.data('conditional'),

				// 
				fieldRequired = field.data('required');

			// Verifico se o padrão não está no formato RegExp
			if(!fieldPattern.exec == 'function') {

				// Converto o padrão informado para o formato RegExp
				fieldPattern = RegExp(fieldPattern.replace(/\\/g, '\\'));
			}

			// Verifico se o valor do campo é fiel ao padrão informado
			if(fieldPattern.test(fieldValue)) {

				// Verifico se o evento não é keyup e se uma máscara foi passada
				if(event.type != 'keyup' && fieldMask != undefined) {

					var matches = fieldValue.match(fieldPattern);

					for(var i = 0, len = matches.length; i < len; i++) {

						fieldMask = fieldMask.replace(RegExp('\\$\\{' + i + '(?:\\:[^\\{\\}]*)?\\}/'), matches[i]);
					}

					field.val(fieldMask.replace(/\$\{[0-9]+(?:\:([^\{\}]*))?\}/g, '$1'));
				}
			} else {

				status.pattern = false;
			}

			return status;
		};

	$.extend({

		// 
		validateSetup : function(options) {

			return $.isPlainObject(options) ? $.extend(defaults, options) : defaults;
		},

		// 
		validateConfig : function(options) {

			return $.isPlainObject(options) ? $.extend(config, options) : config;
		}
	}).fn.extend({

		// 
		validate : function(options) {

			options = $.isPlainObject(options) ? $.extend(defaults, options) : defaults;

			return $(this).validateDestroy().each(function() {

				var form = $(this);

				if(form.is('form')) {

					form.data(config.dataAttribute, {
						options : options
					});

					var fields = form.find(allTypes);

					if(form.is('[id]')) {

						fields = fields.add('[form="' + form.attr('id') + '"]').filter(allTypes);
					}

					// Verifico se deve validar ao soltar a tecla
					if(!!options.on.keyup) {

						fields.filter(type[0]).on('keyup.' + options.namespace, function(event) {

							validateField.call(this, event);
						});
					}

					// Verifico se devo validar ao desfocar um campo
					if(!!options.on.blur) {

						fields.on('blur.' + options.namespace, function(event) {

							validateField.call(this, event);
						});
					}

					// Verifico se devo validar ao submeter o formulário
					if(!!options.on.submit) {

						form.on('submit.' + options.namespace, function(event) {

							var formValid = true;

							fields.each(function() {

								var status = validateField.call(this, event);

								if(!(status.pattern || status.conditional || status.required)) {

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
				form = $(this).removeData(config.dataAttribute),

				// 
				fields = form.find(allTypes);

			// 
			if(form.is('[id]')) {

				fields = fields.add($('[form="' + form.attr('id') + '"]').filter(allTypes));
			}

			fields.add(form).off('.' + config.namespace);

			return form;
		}
	});
})(jQuery, window, document);