(function($, undefined) {

	'use strict';

	var

		// Plugin name.
		name = 'validate',

		writable = 'input[type=color],input[type=date],input[type=datetime],input[type=datetime-local],input[type=email],input[type=file],input[type=hidden],input[type=month],input[type=number],input[type=password],input[type=range],input[type=search],input[type=tel],input[type=text],input[type=time],input[type=url],input[type=week],textarea,select,input:not([type])',

		checkable = 'input[type=checkbox],input[type=radio]',

		fieldTypes = checkable + ',' + writable,

		emptyFunction = $.noop,

		emptyString = '',

		isFunction = $.isFunction,

		isPlainObject = $.isPlainObject,

		// Default properties.
		defaults = {
			valid : emptyFunction,
			invalid : emptyFunction,
			validated : emptyFunction,
			eachValid : emptyFunction,
			eachInvalid : emptyFunction,
			events : [],
			filter : '*',
			sendForm : true,
			selectFirstInvalid : true,
			clearInvalidFields : false,
			conditional : {},
			prepare : {},
			description : {},
			prepareAll : null
		},

		getBoolean = function(value) {

			return (/^(true|)$/).test(value);
		},

		getArray = function(value) {

			return $.isArray(value) ? value : emptyString.split.call(value || emptyString, /[\s\uFEFF\xA0]+/);
		},

		attributes = {
			chars : function(value) {

				return emptyString.replace.call(value || '.', /([\[\]])/g, '\\$1');
			},
			conditional : function(value) {

				return;
			},
			confirm : function(value) {

				return;
			},
			ignorecase : function(value) {

				return !getBoolean(value) ? undefined : 'i';
			},
			mask : function(value) {

				return;
			},
			maxlength : function(value) {

				return Math.round(value) || Infinity;
			},
			minlength : function(value) {

				return Math.round(value) || 0;
			},
			pattern : function(value) {

				return (/^(regexp|string)$/).test($.type(value)) ? value : /(?:)/;
			},
			prepare : function(value) {

				return;
			},
			required : function(value) {

				return;
			},
			trim : function(value) {

				return;
			}
		},

		validate = {},

		getFieldAttribute = function(target, attribute) {

			var

				response = target.data(attribute);

			if(response === undefined && /^trim|required|m(in|ax)length|prepare|conditional|ignorecase|validate|description|chars$/.test(attribute)) {

				var

					parent = target.parents('*').filter(function() {

						return $(this).data(attribute) !== undefined;
					}).filter(':first');

				if(parent.length === 1) {

					response = parent.data(attribute);
				}
			}

			if(response === undefined && typeof target.data(name) == 'string') {

				response = validate[target.data(name)];
			}

			if(attributes.hasOwnProperty(attribute)) {

				attributes[attribute].call(target, response);
			}

			return response;
		},

		namespace = function(events) {

			return events.replace(/([\s\uFEFF\xA0]+|$)/g, '.' + name + '$1');
		},

		validateField = function(event, bool) {

			var

				field = $(this),

				form = field.prop('form').length > 0 ? $('#' + field.prop('form')) : field.closest('form'),

				options = form.data(name),

				response = {
					valid : true,
					status : {
						required : true,
						minlength : true,
						maxlength : true,
						pattern : true,
						confirm : true,
						conditional : true
					}
				},

				minlength = getFieldAttribute(field, 'minlength'),

				maxlength = getFieldAttribute(field, 'maxlength'),

				pattern = getFieldAttribute(field, 'pattern'),

				mask = getFieldAttribute(field, 'mask'),

				prepare = getFieldAttribute(field, 'prepare'),

				fieldName = field.prop('nome'),

				fieldType = field.prop('type'),

				value = getFieldAttribute(field, 'trim') ? $.trim(field.val()) : field.val(),

				valueLength = value.length,

				filled = false;

			if(isFunction(options.prepareAll)) {

				value = String(options.prepareAll.call(field, value));
			}

			if(isFunction(prepare)) {

				value = String(prepare.call(field, value));
			}

			pattern = new RegExp($.type(pattern) == 'regexp' ? pattern.source : pattern, getFieldAttribute(field, 'ignorecase'));

			if(field.is(writable)) {

				filled = valueLength > 0;

				response.status.minlength = valueLength >= minlength;

				response.status.maxlength = valueLength <= maxlength;
			} else {

				if(fieldName.length > 0) {

					var

						checked = $('[type="' + fieldType + '"][name="' + fieldName + '"]:checked');

					filled = checked.length > 0;

					response.status.minlength = checked.length >= minlength;

					response.status.maxlength = checked.length <= maxlength;
				}
			}

			if(getFieldAttribute(field, 'required')) {

				response.status.required = filled;

				response.status.pattern = pattern.test(value);
			} else if(filled) {

				response.status.pattern = pattern.test(value);
			}

			if(!bool && event && event.type != 'keyup' && response.status.pattern && typeof mask == 'string') {

				var

					parts = value.match(pattern) || [],

					newValue = mask;

				for(var currentPart = 0, partLength = parts.length; currentPart < partLength; currentPart++) {

					newValue = newValue.replace(new RegExp('(^|[^\\\\])\\$\\{' + currentPart + '(?::`([^`]*)`)?\\}'), parts[currentPart] ? '$1' + parts[currentPart].replace(/\$/g, '$$') : '$1$2');
				}

				newValue = newValue.replace(/(?:^|[^\\])\$\{\d+(?::`([^`]*)`)?\}/g, '$1');

				if(pattern.test(newValue)) {

					field.val(newValue);
				}
			}

			if(bool) {

				return response.valid;
			} else {

				if(response.valid) {

					if(isFunction(options.valid)) {

						options.eachValid.call(field);
					}

					field.triggerHandler('valid');
				} else {

					if(isFunction(options.invalid)) {

						options.eachInvalid.call(field);
					}

					field.triggerHandler('invalid');
				}

				if(isFunction(options.validated)) {

					options.eachField.call(field);
				}

				field.triggerHandler('validated');

				return response;
			}
		},

		validateForm = function(event, bool) {

			var

				form = $(this),

				options = form.data(name),

				fields = form.find(fieldTypes),

				valid = true;

			if(form.prop('id').length > 0) {

				fields = fields.add($(fieldTypes).filter('[form="' + form.prop('id') + '"]'));
			}

			fields.each(function() {

				if(!validateField.call(this, event, bool).valid) {

					valid = false;

					return false;
				}
			});

			if(bool) {

				return valid;
			} else {

				if(valid) {

					if(!options.sendForm) {

						event.preventDefault();
					}

					if(isFunction(options.valid)) {

						options.valid.call(form);
					}

					form.triggerHandler('valid');
				} else {

					event.preventDefault();

					if(isFunction(options.invalid)) {

						options.invalid.call(form);
					}

					form.triggerHandler('invalid');
				}

				if(isFunction(options.validated)) {

					options.validated.call(form);
				}

				form.triggerHandler('validated');
			}
		},

		extend = function(target, index, value) {

			if(typeof index == 'string') {

				if(value !== undefined) {

					target[index] = value;
				} else {

					return target[index];
				}
			} else if(isPlainObject(index)) {

				return $.extend(target, index);
			}

			return target;
		},

		plugin = {
			init : function() {

				var

					element = $(this);

				if(element.is('form')) {

					var

						options = element.data(name),

						fields = element.find(fieldTypes);

					if(element.prop('id').length > 0) {

						fields = fields.add($(fieldTypes).filter('[form="' + element.prop('id') + '"]'));
					}

					element.on(namespace('submit'), function(event) {

						validateForm.call(this, event, options);
					});

					fields.on(namespace('keyup blur change'), function(event) {

						if($.inArray(event.type, getArray(options.events)) > -1) {

							validateField.call(this, event);
						}
					}).on(namespace('keypress'), function(event) {

						if(!new RegExp('[' + getFieldAttribute.call(this, 'chars') + ']').test(String.fromCharCode(event.keyCode))) {

							event.preventDefault();
						}
					});
				} else {

					$.error('This is not a form.');
				}
			},
			destroy : function() {

				var

					form = $(this);


				if(form.is('form')) {

					var

						fields = form.find(fieldTypes);

					if(form.prop('id').length > 0) {

						fields = fields.add($(fieldTypes).filter('[form="' + form.prop('id') + '"]'));
					}

					form.add(fields).off('.' + name).removeData(name);

					return form;
				} else {

					$.error('This is not a form.');
				}
			},
			valid : function() {

				var

					element = $(this),

					valid = true;

				element.each(function() {

					if(element.is('form')) {

						validateForm.call(element, null, true);
					} else if(element.is(fieldTypes)) {

						validateField.call(element, null, true);
					}
				});

				return valid;
			}
		};

	$.fn[name] = function(options) {

		return isFunction(plugin[options]) ? plugin[options].apply(this, Array.prototype.slice.call(arguments, 1)) : $(this).each(function() {

			plugin.init.call($(this).data(name, $.extend({}, defaults, options)));
		});
	};

	$[name] = $.extend(function(index, value) {

		return extend(defaults, index, value);
	}, {
		add : function(index, value) {

			return extend(validate, index, value);
		},
		extend : function(index, value) {

			return extend(plugin, index, value);
		},
		version : '2.0.0'
	});
})(jQuery);