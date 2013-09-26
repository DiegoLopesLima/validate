(function(window, undefined) {

	'use strict';

	var

		document = window.document,

		name = 'validate',

		form = $('<form>', {
			appendTo : 'body'
		});

	QUnit.test('Initialization', function() {

		form.validate();

		ok($.isPlainObject(form.data(name)), 'Verifies if plugin was initialized.');

	});

	QUnit.test('Destroy', function() {

		ok(!$.isPlainObject(form.validate('destroy').data(name)), 'Verifies if plugin was destroyed.');

	});

	form.remove();

})(window);