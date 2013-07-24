(function(window, undefined) {

	'use strict';

	//

	var

		document = window.document,

		name = 'validate',

		versions = ['1.7', '1.7.1', '1.7.2', '1.8.0', '1.8.1', '1.8.2', '1.8.3', '1.9.0', '1.9.1', '1.10.0', '1.10.1', '1.10.2', '2.0.0', '2.0.1', '2.0.2', '2.0.3'],

		loadJquery = function(version, callback) {

			var

				current = document.getElementById('jquery') || 0,

				script = document.createElement('script');

			script.src =  'http://ajax.googleapis.com/ajax/libs/jquery/' + version + '/jquery.min.js';

			script.id = 'jquery';

			script.onload = function() {

				var

					validate = document.createElement('script');

				validate.src = name + '.js';

				validate.onload = function() {

					callback(version);
				};

				document.body.appendChild(validate);
			};

			if(current.length > 0) current.remove();

			document.body.appendChild(script);
		},

		tests = function(version) {

			// Load jQuery.
			QUnit.test('Load jQuery ' + version, function() {

				ok(QUnit.is('function', window.jQuery), 'jQuery loaded successfully.');
			});

			// Initialize jQuery Validate.
			QUnit.test('Initialization', function() {

				ok(QUnit.is('function', $.fn.validate), 'Validate initializated successfully.');
			});
		};

	for(var i in versions) loadJquery(versions[i], tests);
})(window);