(function($, undefined) {

	'use strict';

	var

		// Plugin name.
		name = 'validate',

		writable = 'input[type=color],input[type=date],input[type=datetime],input[type=datetime-local],input[type=email],input[type=file],input[type=hidden],input[type=month],input[type=number],input[type=password],input[type=range],input[type=search],input[type=tel],input[type=text],input[type=time],input[type=url],input[type=week],textarea,select,input:not([type])',

		checkable = 'input[type=checkbox],input[type=radio]',

		parentAttributes = 'trim required minlength maxlength prepare conditional ignorecase validate description chars',

		booleanAttributes = 'trim required ignorecase',

		fieldTypes = checkable + ',' + writable,

		emptyFunction = $.noop,

		emptyString = '',

		isFunction = $.isFunction,

		isPlainObject = $.isPlainObject,

		isArray = $.isArray,

		reSpace = /[\s\uFEFF\xA0]+/,

		reTrue = /^(true|)$/,

		reFalse = /^false$/,

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

		namespace = function(events) {

			return events.replace(/(\s+|$)/g, '.' + name + '$1');
		},

		getArray = function(value) {

			return isArray(value) ? value : emptyString.split.call(value || emptyString, reSpace);
		},

		getAttr = function(target, attribute) {

			var

				value = $.inArray(attribute, parentAttributes.split(reSpace)) > -1 ? target.data(attribute) !== undefined ? target.data(attribute) : target.parents('*').filter(function() {

				return $(this).data(attribute) !== undefined;
			}).filter(':first').data(attribute) : $(this).data(attribute);

			return $.inArray(attribute, booleanAttributes.split(reSpace)) > -1 ? reTrue.test(value) ? true : (reFalse.test(value) ? false : value) : value;
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

		validate = function(options, event, bool) {

			var

				element = $(this),

				response = {
					valid : true
				};

			if(element.is('form')) {

				var

					fields = element.find(fieldTypes);

				if(element.prop('id').length > 0) {

					fields = fields.add($(fieldTypes).filter('[form="' + element.prop('id') + '"]'));
				}

				fields.each(function() {

					if(!validate.call(this, event, options).valid) {

						response.valid = false;

						return false;
					}
				});

				if(!bool) {

					if(isFunction(options.valid)) {

						options.valid.call(element);
					}

					if(isFunction(options.invalid)) {

						options.invalid.call(element);
					}

					if(isFunction(options.validated)) {

						options.validated.call(element);
					}
				}
			} else if(element.is(fieldTypes)) {

				response.status = {
					required : true,
					minlength : true,
					maxlength : true,
					pattern : true,
					confirm : true,
					conditional : true
				};

				var

					form = element.closest('form');

				if(form.length === 0 && element.prop('form').length > 0) {

					form = $('form#' + element.prop('form'));
				}

				var

					value = element.val(),

					fieldName = element.prop('name'),

					trim = getAttr(element, 'trim'),

					prepare = getAttr(element, 'prepare'),

					conditional = getAttr(element, 'conditional'),

					ignoreCase = getAttr(element, 'ignoreCase') === false ? false : true,

					pattern = getAttr(element, 'pattern'),

					minlength = Number(getAttr(element, 'minlength')) || 0,

					maxlength = Number(getAttr(element, 'maxlength')) || Infinity,

					mask = getAttr(element, 'mask'),

					description = getAttr(element, 'description'),

					filled = false,

					status = {};

				if(isFunction(prepare)) {

					value = String(prepare.call(element, value));
				} else if(typeof prepare == 'string') {

					prepare = getArray(prepare);

					for(var currentPrepare = 0, prepareLength = prepare.length; currentPrepare < prepareLength; currentPrepare++) {

						var

							currentPrepareFunction = options.prepare[prepare[currentPrepare]];

						value = isFunction(currentPrepareFunction) ? String(currentPrepareFunction.call(element, value)) : value;
					}
				}

				value = trim ? $.trim(value) : value;

				pattern = new RegExp($.type(pattern) == 'regexp' ? pattern.source : pattern, ignoreCase ? 'i' : undefined);

				// Verifies if field is filled.
				if(element.is(writable)) {

					filled = value.length > 0;

					status.minlength = value.length >= minlength;

					status.maxlength = value.length >= maxlength;
				} else if(name.length > 0) {

					var

						checked = $('[name="' + fieldName + '"]:checked');

					filled = checked.length > 0;

					status.minlength = checked.length >= minlength;

					status.maxlength = checked.length >= maxlength;
				}

				// Verifies is field is required.
				if(getAttr(element, 'required')) {

					status.required = filled;

					status.pattern = pattern.test(value);
				} else if(filled) {

					status.pattern = pattern.test(value);
				}

				if(isFunction(conditional)) {

					status.conditional = !!conditional.call(element, value);
				} else if(typeof conditional == 'string') {

					conditional = getArray(conditional);

					for(var currentConditional = 0, conditionalLength = conditional.length; currentConditional < conditionalLength; currentConditional++) {

						var

							currentConditionalFunction = options.conditional[conditional[currentConditional]];

						if(isFunction(currentConditionalFunction) && !currentConditionalFunction.call(element, value)) {

							status.conditional = false;

							break;
						}
					}
				}

				if(!bool && event && event.type != 'keyup' && status.pattern && typeof mask == 'string') {

					var

						parts = value.match(pattern) || [];

					value = mask;

					for(var currentPart = 0, partLength = parts.length; currentPart < partLength; currentPart++) {

						value = value.replace(new RegExp('(^|[^\\\\])\\$\\{' + currentPart + '(?::`([^`]*)`)?\\}'), parts[currentPart] ? '$1' + parts[currentPart].replace(/\$/g, '$$') : '$1$2');
					}

					value = value.replace(/(?:^|[^\\])\$\{\d+(?::`([^`]*)`)?\}/g, '$1');

					if(pattern.test(value)) {

						element.val(value);
					}
				}

				var

					descriptionIndex = options.description[description],

					descriptionObject = $.extend({}, descriptionIndex, descriptionIndex.custom),

					customDescription = isPlainObject(descriptionObject.custom) ? descriptionObject.custom : {},

					customDescriptionEvents = getArray(customDescription.events),

					events = customDescriptionEvents.length > 0 ? customDescriptionEvents : getArray(options.events),

					message,

					describe;

				if(!bool) {

					element.attr('aria-invalid', !response.valid);
				}
			}

			if(!bool) {

				if(response.valid) {

					element.triggerHandler('valid');
				} else {

					element.triggerHandler('invalid');
				}

				element.triggerHandler('validated');
			}

			return bool ? response.valid : response;
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

						validate.call(this, event, options);
					});

					fields.on(namespace('keyup blur change'), function(event) {

						if($.inArray(event.type, getArray(options.events)) > -1) {

							validate.call(this, event, options);
						}
					}).on(namespace('keypress'), function(event) {

						if(!new RegExp('[' + emptyString.replace.call($(this).data('chars') || '.', /([\[\]])/g, '\\$1') + ']').test(String.fromCharCode(event.keyCode))) {

							event.preventDefault();
						}
					});
				}
			},
			destroy : function() {

				var

					element = $(this),

					fields = element.find(fieldTypes);

				if(element.prop('id').length > 0) {

					fields = fields.add($(fieldTypes).filter('[form="' + element.prop('id') + '"]'));
				}

				element.add(fields).off('.' + name).removeData(name);

				return element;
			},
			valid : function() {

				var

					element = $(this),

					options = element.data(name),

					valid = true;

				element.each(function() {

					if(!validate.call(this, null, options, true)) {

						valid = false;

						return false;
					}
				});

				return valid;
			}
		};

	$.fn[name] = function(options) {

		return isFunction(plugin[options]) ? plugin[options].apply(this, Array.prototype.slice.call(arguments, 1)) : $(this).each(function() {

			plugin.init.call($(plugin.destroy.call(this)).data(name, $.extend({}, defaults, options)));
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
		version : '1.2.0'
	});
})(jQuery);