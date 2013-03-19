# jQuery Validate

> License: <a href="http://www.opensource.org/licenses/mit-license.php" target="_blank">_MIT_</a>

> Version: _1.2.0_

> Requires: _jQuery 1.7+_

## Demos
* [Required fields](#)
* [Conditional validation](#)
* [Confirmation field](#)
* [Regular expressions](#)
* [Field masks](#)
* [Extending jQuery Validate](#)

## Contribute
Lorem ipsum dolor sit ammet.

```git
git clone git@github.com:DiegoLopesLima/Validate.git
```

## Usage

```javascript
jQuery('form').validate();
```

### Example

## Attributes
Lorem ipsum dolor sit ammet.

### data-conditional
Lorem ipsum dolor sit ammet.

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
Lorem ipsum dolor sit ammet.

#### Example

```html
<input type="text" id="password" />

<input type="text" data-confirm="password" />
```

### data-counter
Lorem ipsum dolor sit ammet.

#### Example

```html
<input type="text" id="password" data-maxlength="25" data-counter="remaining" />

<p><span id="remaining"></span> characters remaining.</p>
```

### data-ignorecase
Lorem ipsum dolor sit ammet.

#### Example

```html
<input type="text" data-pattern="^[a-z]+$" data-ignorecase />
```

Equivalent to

```html
<input type="text" data-pattern="^[a-zA-Z]+$" />
```

### data-pattern
<input type="text" data-pattern="^\d+$" />

#### Example

```html
<!-- Code -->
```

### data-mask
Lorem ipsum dolor sit ammet.

#### Example

```html
<input type="text" data-pattern="^(?:Mr\.\s+)?([\S\s]+)$" data-mask="Mr. ${1}" />
```

### data-maxlength
Lorem ipsum dolor sit ammet.

#### Example

```html
<input type="text" data-maxlength="10" />
```

### data-minlength
Lorem ipsum dolor sit ammet.

#### Example

```html
<input type="text" data-minlength="10" />
```

### data-prepare
Lorem ipsum dolor sit ammet.

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
Lorem ipsum dolor sit ammet.

#### Example

```html
<input type="text" data-required />
```

Or

```html
<input type="text" data-required="true" />
```

### data-trim
Lorem ipsum dolor sit ammet.

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

### data-describedby
Lorem ipsum dolor sit ammet.

#### Example

```html
<input type="text" data-required data-describedby="desc-name" data-description="name" />

<span id="desc-name"></span>
```

```javascript
jQuery('form').validate({
	description : {
		name : {
			required : '<span class="error">A name is required field.</span>',
			valid : 'Correct.'
		}
	}
});
```

## Callbacks

### beforeValidate
Accepts a function called before validation.

### valid
Lorem ipsum dolor sit ammet.

### invalid
Lorem ipsum dolor sit ammet.

### eachInvalidField
Lorem ipsum dolor sit ammet.

### eachValidField
Lorem ipsum dolor sit ammet.

### afterValidation
Lorem ipsum dolor sit ammet.

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

## Options

### filter
Lorem ipsum dolor sit ammet.

### events
Lorem ipsum dolor sit ammet.

### sendForm
Lorem ipsum dolor sit ammet.

### conditional
Lorem ipsum dolor sit ammet.

### prepare
Lorem ipsum dolor sit ammet.

### description
Lorem ipsum dolor sit ammet.

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

## Methods

### validate
Lorem ipsum dolor sit ammet.

#### Example

```javascript
// Validates a form.
jQuery('form').validate('validate');
```

### option
Lorem ipsum dolor sit ammet.

#### Example

```javascript
// Sets the filter options to `*`.
jQuery('form').validate('option', 'filter', '*');

// Gets the filter option.
jQuery('form').validate('option', 'filter');
```

### destroy
Lorem ipsum dolor sit ammet.

#### Example

```javascript
// Destroy all events and plugin data.
jQuery('form').validate('destroy');
```

## Changind default properties
Lorem ipsum dolor sit ammet.

```javascript
jQuery.validate({
	property : 'Custom value'
});
```

## Adding validation shortcuts
Lorem ipsum dolor sit ammet.

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
Lorem ipsum dolor sit ammet.

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