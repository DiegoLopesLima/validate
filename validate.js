;(function($, undefined) {

	'use strict';

	var

		// The plugin name.
		name = 'validate',

		// Event namespace.
		namespace = '.' + name,

		// Empty function.
		noop = $.noop,

		// Default properties.
		defaults = {

			// A function called when the form is valid.
			valid : noop,

			// A function called when the form is invalid.
			invalid : noop,

			// A function called before validate form.
			beforeValidate : noop,

			// A function called after validate form.
			afterValidate : noop,

			// A function called for each invalid field.
			eachInvalidField : noop,

			// A function called for each valid field.
			eachValidField : noop,

			// 
			filter : '*',

			// 
			events : [],

			// 
			eachField : noop,

			// 
			sendForm : true,

			// 
			conditional : {},

			// 
			prepare : {},

			// 
			description : {}
		},

		writable = 'input:not([type]),input[type=color],input[type=date],input[type=datetime],input[type=datetime-local],input[type=email],input[type=file],input[type=hidden],input[type=month],input[type=number],input[type=password],input[type=range],input[type=search],input[type=tel],input[type=text],input[type=time],input[type=url],input[type=week],textarea,select',

		checkable = 'input[type=checkbox],input[type=radio]',

		// Fields selector.
		types = writable + ',' + checkable,

		// Extensions.
		validate = {},

		regExpTrue = /^(true|)$/,

		regExpFalse = /^false$/,

		generateNamespace = function(events) {

			return String(events).replace(/(\s+|$)/g, namespace + '$1');
		},

		// A function to validate fields.
		validateField = function(options, event) {

			var

				// Current field.
				element = $(this),

				// Current field data.
				data = element.data(name),

				// A conditional function.
				fieldConditional = data.conditional,

				// A field id to confirm.
				fieldConfirm = String(data.confirm),

				// 
				fieldIgnorecase = regExpTrue.test(data.ignorecase) ? true : false,

				// A mask to field value
				fieldMask = data.mask || '${0}',

				// 
				fieldMaxlength = Number(data.maxlength) || Infinity,

				// 
				fieldMinlength = Number(data.minlength) || 0,

				// A regular expression to validate the field value.
				fieldPattern = data.pattern || /(?:)/,

				// 
				fieldPrepare = data.prepare,

				// 
				fieldRequired = regExpTrue.test(data.required) ? true : false,

				// 
				fieldTrim = regExpTrue.test(data.trim) ? true : false,

				// 
				fieldValidate = data.validate,

				// 
				fieldDescribedby = data.describedby,

				// Current field value
				fieldValue = fieldTrim ? $.trim(element.val())  : element.val(),

				// 
				fieldLength = fieldValue.length,

				// Current field name
				fieldName = element.prop('name'),

				// 
				sameName = $('[name="' + fieldName + '"]'),

				// Current field status
				status = {
					required : true,
					pattern : true,
					conditional : true,
					confirm : true,
					minlength : true,
					maxlength : true
				},

				valid = true,

				fieldType = element.prop('type'),

				filled;

			// 
			if(element.is(checkable)) {

				filled = fieldName.length > 0 ? sameName.filter(':checked').length > 0 : false;

				status.minlength = sameName.filter(':checked') >= fieldMinlength;

				status.maxlength = sameName.filter(':checked') <= fieldMaxlength;
			} else {

				filled = fieldLength > 0;

				status.minlength = fieldLength >= fieldMinlength;

				status.maxlength = fieldLength <= fieldMaxlength;
			}

			if(fieldRequired) {

				status.required = filled;

				status.pattern = fieldPattern.test(fieldValue);
			} else if(filled) {

				status.pattern = fieldPattern.test(fieldValue);

				if(event.type !== 'keyup') {

					var

						shares = fieldValue.match(fieldPattern);

					for(var i = 0; i < shares.length; i++) {

						fieldMask = fieldMask.replace(new RegExp('(?:^|[^\\\\])\\$\\{' + i + '(?::`([^`]*)`)?\\}', 'g'), (shares[i] !== undefined ? shares[i] : '$1'));
					}

					fieldMask = fieldMask.replace(/(?:^|[^\\])\$\{(\d+)(?::`([^`]*)`)?\}/g, '$2');

					if(fieldPattern.test(fieldMask)) {

						element.val(fieldMask);
					}
				}
			}

			if(fieldConfirm.length > 0) {

				var

					confirmation =  $('#' + fieldConfirm);

				if(confirmation.length > 0) {

					status.confirm = confirmation.val() === fieldValue;
				}
			}

			if(typeof fieldConditional === 'function') {

				status.conditional = !!fieldConditional.call(element, fieldValue);
			} else {

				var

					conditionals = String(fieldConditional).split(/\s+/),

					validConditionals = true;

				for(var i = 0, len = conditionals.length; i < len; i++) {

					if(!conditionals[i].call(element, fieldValue)) {

						validConditionals = false;
					}
				}

				status.conditional = validConditionals;
			}

			// 
			for(var item in status) {

				if(!status[item]) {

					valid = item;

					break;
				}
			}

			// 
			element.prop('aria-invalid', !valid).data(name, {
				valid : valid
			});

			return {
				valid : valid,
				status : status
			};
		},

		methods = {
			destroy : function() {

				var

					// 
					element = $(this),

					// 
					fields = element.find(types);

				// 
				if(element.is('[id]')) {

					fields = fields.add($(types).filter('[form="' + element.prop('id') + '"]'));
				}

				element.add(fields.filter(element.data(name).filter)).removeData(name).off(namespace);

				return element;
			},
			validate : function(event) {

				var

					// Current form
					element = $(this),

					// Current form data
					data = element.data(name),

					// 
					fields = element.find(types),

					// 
					valid = true;

				data.beforeValidate.call(element);

				if(element.is('[id]')) {

					fields = fields.add($(types).filter('[form="' + element.prop('id') + '"]'));
				}

				fields.filter(data.filter).each(function() {

					var

						response = validateField.call(element, data),

						status = response.status;

					if(response.valid) {

						data.eachValidField.call(this);
					} else {

						valid = false;

						data.eachInvalidField.call(this, status);
					}

					data.eachField.call(this, status);
				});

				if(valid) {

					if(!data.sendForm) {

						event.preventDefault();
					}

					data.valid.call(element);

					element.trigger('valid');
				} else {

					event.preventDefault();

					data.invalid.call(element);

					element.trigger('invalid');
				}

				data.beforeValidate.call(element, valid);

				element.trigger('validated');
			},
			counter : function(options) {

				options = options || {};

				var

					// 
					start = Math.round(options.start) || 0,

					// 
					element = $(this),

					// 
					counter = $(options.target),

					// 
					prepare = options.prepare;

				element.on(generateNamespace('keydown keyup mouseup'), function(event) {

					// 
				});
			},
			option : function(property, value) {

				var

					// Current form
					element = $(this),

					// Current form data
					data = element.data(name);

				if(typeof property === 'string') {

					if(value !== undefined) {

						element.data(name)[property] = value;
					} else {

						return data[property];
					}
				} else {

					return element.data(name, $.extend({}, data, property));
				}

				return element;
			}
		};

	$[name] = function(property, value) {

		if(typeof property === 'string') {

			if(value !== undefined) {

				defaults[property] = value;
			} else {

				return defaults[property];
			}
		} else {

			return $.extend(defaults, property);
		}

		return defaults;
	};

	$.fn[name] = function() {

		var

			param = [];

		for(var i = 0; i < arguments.length; i++) {

			param.push(arguments[i]);
		}

		return $(this).each(function() {

			var

				element = $(this);

			// Verifies if the current element is a form.
			if(element.is('form')) {

				if(typeof param[0] === 'string' && methods.hasOwnProperty(param[0])) {

					return methods[param[0]].apply(element, param.shift());
				}

				element.data(name, $.extend({}, defaults, param[0])).on('submit' + namespace, function(event) {

					methods.validate.call(element, event);
				});

				var

					data = element.data(name),

					fields = element.find(types);

				if(element.is('[id]')) {

					fields = fields.add($(types).filter('[form="' + element.prop('id') + '"]'));
				}

				fields = fields.filter(data.filter);

				fields.on(generateNamespace('keyup change blur'), function(event) {

					var

						data = element.data(name);

					if($.inArray(event.type, data.events)) {

						var

							response = validateField.call(element, data, event),

							status = response.status;

						if(response.valid) {

							data.eachValidField.call(this);

							$(this).trigger('valid');
						} else {

							valid = false;

							data.eachInvalidField.call(this, status);

							$(this).trigger('invalid');
						}

						data.eachField.call(this, status);

						$(this).trigger('validated');
					}
				});
			}
		});
	};

	// A function to add validation shortcuts
	$[name].add = function(property, value) {

		if(typeof property === 'string') {

			if(value !== undefined) {

				validate[property] = value;
			} else {

				return validate[property];
			}
		} else {

			return $.extend(validate, property);
		}

		return validate;
	};

	// A function to extend the methods
	$[name].extend = function(property, value) {

		if(typeof property === 'string') {

			if(value !== undefined) {

				methods[property] = value;
			} else {

				return methods[property];
			}
		} else {

			return $.extend(methods, property);
		}

		return methods;
	};

	$.expr[':'].validate = function(element, index, data) {

		element = $(element);

		var

			param = $.trim(data[3]),

			valid;

		if(param === 'valid') {

			valid = true;
		} else if(param === 'invalid') {

			valid = false;
		} else {

			return false;
		}

		return valid === validateField.call(element).valid;
	};

	// Stores the plugin version
	$[name].version = '1.2.0';
})(jQuery);