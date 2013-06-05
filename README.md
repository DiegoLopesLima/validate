# jQuery Validate <a rel="license" href="http://creativecommons.org/licenses/by/3.0/" target="_blank" title="Creative Commons License"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by/3.0/80x15.png" /></a>

[![NPM version](https://badge.fury.io/js/grunt.png)](http://badge.fury.io/js/grunt)
[![Build Status](https://travis-ci.org/DiegoLopesLima/Validate.png)](https://travis-ci.org/DiegoLopesLima/Validate)

> License: <span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">Validate</span> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution 3.0 Unported License</a>.

> Version: _2.0.0_

> Requires: _jQuery 1.7+_

> Author: [Diego Lopes Lima](https://github.com/DiegoLopesLima)

## Demos
* [Lorem ipsum](#)
* [Lorem ipsum](#)
* [Lorem ipsum](#)
* [Lorem ipsum](#)
* [Lorem ipsum](#)

## Usage

```javascript
jQuery('form').validate();
```

### Example

## Attributes
Lorem ipsum dolor sit amet.

### data-conditional
Lorem ipsum dolor sit amet.

#### Example

```html
<form>
	<input type="text" data-conditional="ofAge" />
</form>
```

```javascript
jQuery('form').validate({
	conditional : {
		ofAge : function(value) {

			return Number(value) > 17;
		}
	}
});
```

### data-chars
Lorem ipsum dolor sit amet.

#### Example

```html
<input type="number" name="age" data-chars="0-9" />
```

### data-confirm
Lorem ipsum dolor sit amet.

#### Example

```html
<input type="password" id="password" />

<input type="password" data-confirm="password" />
```

### data-pattern
Lorem ipsum dolor sit amet.

#### Example

```html
<input type="number" data-pattern="^\d+$" />
```

### data-describe
Lorem ipsum dolor sit amet.

### data-ignorecase
Lorem ipsum dolor sit amet.

#### Example

```html
<input type="text" data-pattern="^[a-z]+$" data-ignorecase="false" />
```

### data-mask
Lorem ipsum dolor sit amet.

#### Example

```html
<input type="date" data-pattern="^(\d{2})\/?(\d{2})\/?(\d{4})$" data-mask="${1}/${2}/${3}" />
```

### data-maxlength
Lorem ipsum dolor sit amet.

#### Example

```html
<input type="text" data-maxlength="10" />
```

### data-minlength
Lorem ipsum dolor sit amet.

#### Example

```html
<input type="text" data-minlength="10" />
```

### data-prepare
Lorem ipsum dolor sit amet.

#### Example

```html
<form>
	<input type="text" data-prepare="placeholder" placeholder="Lorem ipsum" value="Lorem ipsum" />
</form>
```

```javascript
jQuery('form').validate({
	prepare : {
		placeholder : function(value) {

			return value != $(this).prop('placeholder') ? value : '';
		}
	}
});
```

### data-required
Lorem ipsum dolor sit amet.

#### Example

```html
<input type="text" data-required />
```

Or

```html
<input type="text" data-required="true" />
```

### data-trim
Lorem ipsum dolor sit amet.

#### Example

```html
<input type="text" data-trim />
```

Or

```html
<input type="text" data-trim="true" />
```

### data-validate
See [Adding validation shortcuts](#adding-validation-shortcuts).

## Using `jQuery.data` to attributes declare

### Example

```javascript
jQuery('input[name="age"]').data({
	pattern : /^\d+$/,
	required : true,
	conditional : function(value) {

		return Number(value) > 17;
	}
});
```

## Callbacks

### valid
Lorem ipsum dolor sit amet.

### invalid
Lorem ipsum dolor sit amet.

### eachInvalidField
Lorem ipsum dolor sit amet.

### eachValidField
Lorem ipsum dolor sit amet.

### afterValidation
Lorem ipsum dolor sit amet.

### Example

```javascript
jQuery('form').validate({
	eachInvalidField : function() {

		console.log('Each invalid field');
	},
	eachValidField : function() {

		console.log('Each valid field');
	},
	eachField : function() {

		console.log('Each field');
	},
	valid : function() {

		console.log('Valid form');
	},
	invalid : function() {

		console.log('Invalid form');
	},
	afterValidation : function() {

		console.log('After validation');
	}
});
```

## Events
Lorem ipsum dolor sit amet.

### valid
Lorem ipsum dolor sit amet.

#### Example

```javascript
// In forms.
jQuery('form').on('valid', function() {});

// In fields.
jQuery('input').on('valid', function() {});
```

### invalid
Lorem ipsum dolor sit amet.

#### Example

```javascript
// In forms.
jQuery('form').on('invalid', function() {});

// In fields.
jQuery('input').on('invalid', function() {});
```

### validated
Lorem ipsum dolor sit amet.

#### Example

```javascript
// In forms.
jQuery('form').on('validated', function() {});

// In fields.
jQuery('input').on('validated', function() {});
```

## Options

### clearInvalidFields
Lorem ipsum dolor sit amet.

### clause
Lorem ipsum dolor sit amet.

### filter
Lorem ipsum dolor sit amet.

### events
Lorem ipsum dolor sit amet.

### selectFirstInvalid
Lorem ipsum dolor sit amet.

### sendForm
Lorem ipsum dolor sit amet.

### conditional
Lorem ipsum dolor sit amet.

### prepare
Lorem ipsum dolor sit amet.

### prepareAll
Lorem ipsum dolor sit amet.

### description
Lorem ipsum dolor sit amet.

### Example

```javascript
jQuery('form').validate({
	filter : '[type=text]',
	events : ['keyup', 'change', 'blur'],
	sendForm : false,
	conditional : {
		ofAge : function(value) {

			return Number(value) > 17;
		}
	},
	prepare : {
		placeholder : function(value) {

			return value != $(this).prop('placeholder') ? value : '';
		}
	},
	description : {
		name : {
			required : '<span class="error">A name is required field.</span>',
			valid : 'Correct.'
		}
	}
});
```

## Field description
Lorem ipsum dolor sit amet.

### Example

```html
<form>
	<input type="number" id="age" data-required />

	<span data-describe="age" data-description="intenger"></span>
</form>
```

```javascript
$('form').validate({
	description : {
		events : 'keyup blur change',
		error : {
			message : 'Fill in the field correctly.'
		},
		success : 'Ok.',
		custom : {
			intenger : {
				error : 'Fill your age correctly.'
			}
		}
	}
});
```

## Methods

### validate
Lorem ipsum dolor sit amet.

#### Example

```javascript
// Validates a form.
jQuery('form').validate('validate');
```

### option
Lorem ipsum dolor sit amet.

#### Example

```javascript
// Sets the filter options to `*`.
jQuery('form').validate('option', 'filter', '*');

// Gets the filter option.
jQuery('form').validate('option', 'filter');
```

### destroy
Lorem ipsum dolor sit amet.

#### Example

```javascript
// Destroy all events and plugin data.
jQuery('form').validate('destroy');
```

### valid
Lorem ipsum dolor sit amet.

#### Example

```html
<input type="text" name="test" data-required />
```

```javascript
jQuery('[name="test"]').validate('valid');
```

## Changind default properties
Lorem ipsum dolor sit amet.

```javascript
jQuery.validate({
	property : 'Custom value'
});
```

## Adding validation shortcuts
Lorem ipsum dolor sit amet.

### Example

```javascript
jQuery.validate.add('age', {
	pattern : /^\d+$/,
	conditional : function(value) {

		return Number(value) > 0;
	}
});
```

### Usage

```html
<form>
	<input type="text" data-validate="age" />
</form>
```

```javascript
jQuery('form').validate();
```

### Multiple methods

```javascript
jQuery.validate.add({
	method : function() {z},
	otherMethod : function() {}
});
```

## Getting current version
You can get the current plugin version using the `jQuery.validate.version` variable.

Example

```javascript
console.log(jQuery.validate.version);
```

## Extending `jQuery.fn.validate`
Lorem ipsum dolor sit amet.

### Example

```javascript
jQuery.validate.extend('methodName', function(param) {
	
	return param;
});
```

### Usage

```javascript
jQuery('form').validate('methodName', 'Lorem ipsum');
```

### Multiple methods

```javascript
jQuery.validate.extend({
	method : function() {},
	otherMethod : function() {}
});
```

## Tips
Lorem ipsum dolor sit amet.

### Wraping fields

```html
<input type="text" name="name" data-required />

<input type="text" name="age" data-required />
```

You can use a element to wrap the fields.

```html
<div data-required>
	<input type="text" name="name" />

	<input type="text" name="age" />
</div>
```

> You can use the attributes `data-required`, `data-trim`, `data-minlength`, `data-maxlength` and `data-ignorecase`.