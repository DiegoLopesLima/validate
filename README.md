# jQuery Validate

> License: <a href="http://www.opensource.org/licenses/mit-license.php" target="_blank">_MIT_</a>

> Version: _1.2.0_

> Requires: _jQuery 1.7+_

> Author: [Diego Lopes Lima](https://github.com/DiegoLopesLima)

## Demos
* [Required fields](#)
* [Conditional validation](#)
* [Confirmation field](#)
* [Regular expressions](#)
* [Field masks](#)
* [Extending jQuery Validate](#)

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

### data-confirm
Lorem ipsum dolor sit amet.

#### Example

```html
<input type="text" id="password" />

<input type="text" data-confirm="password" />
```

### data-pattern
Lorem ipsum dolor sit amet.

#### Example

```html
<input type="text" data-pattern="^\d+$" />
```

### data-ignorecase
Lorem ipsum dolor sit amet.

#### Example

```html
<input type="text" data-pattern="^[a-z]+$" data-ignorecase />
```

Equivalent to

```html
<input type="text" data-pattern="^[a-zA-Z]+$" />
```

### data-mask
Lorem ipsum dolor sit amet.

#### Example

```html
<input type="text" data-pattern="^(?:Mr\.\s+)?([\S\s]+)$" data-mask="Mr. ${1}" />
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

### beforeValidate
Accepts a function called before validation.

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
	beforeValidate : function() {

		console.log('Before validate');
	},
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

### valueHook
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

### Example

```javascript
jQuery('form').validate({
	description : {
		events : ['keyup', 'blur', 'change'],
		default : 'Fill in the field correctly.',
		custom : {
			email : {
				events : ['blur', 'change'],
				conditional : 'This email has already been registered.',
				required : 'This field is required.',
				pattern : function(value) {

					return '"' + valid + '" is not a valid email.';
				},
				default : 'Invalid value.'
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

> You can use the attributes `data-required`, `data-trim` and `data-ignorecase`.