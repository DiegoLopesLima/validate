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

			if(event.type == 'keyup') {

				//
			}
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

			return $(this).each(function() {

				var form = $(this).validateDestroy();

				if(form.is('form')) {

					form.data(config.dataAttribute, options);

					var fields = form.find(allTypes);

					if(form.is('[id]')) {

						fields.add($('[form="' + form.attr('id') + '"]').filter(allTypes));
					}

					if(!!options.on.keyup) {

						fields.on('keyup.' + options.namespace, function(event) {

							validateField.call(this, event);
						});
					}

					if(!!options.on.blur) {

						fields.on('blur.' + options.namespace, function(event) {

							validateField.call(this, event);
						});
					}

					if(!!options.on.submit) {

						form.on('submit.' + options.namespace, function(event) {

							fields.each(function() {

								validateField.call(this, event);
							});
						});
					}
				}
			});
		},

		// 
		validateDestroy : function() {

			var form = $(this).removeData(config.dataAttribute);

			form.find(allTypes).andSelf().add($('[form="' + form.attr('id') + '"]').filter(allTypes)).off('.' + config.namespace);

			return form;
		}
	});
})(jQuery, window, document);