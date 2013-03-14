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
<!-- Code -->
```

### data-confirm
Lorem ipsum dolor sit ammet.

#### Example

```html
<!-- Code -->
```

### data-counter
Lorem ipsum dolor sit ammet.

#### Example

```html
<!-- Code -->
```

### data-ignore-case
Lorem ipsum dolor sit ammet.

#### Example

```html
<!-- Code -->
```

### data-mask
Lorem ipsum dolor sit ammet.

#### Example

```html
<!-- Code -->
```

### data-maxlength
Lorem ipsum dolor sit ammet.

#### Example

```html
<!-- Code -->
```

### data-minlength
Lorem ipsum dolor sit ammet.

#### Example

```html
<!-- Code -->
```

### data-pattern
Lorem ipsum dolor sit ammet.

#### Example

```html
<!-- Code -->
```

### data-prepare
Lorem ipsum dolor sit ammet.

#### Example

```html
<!-- Code -->
```

### data-required
Lorem ipsum dolor sit ammet.

#### Example

```html
<!-- Code -->
```

### data-trim
Lorem ipsum dolor sit ammet.

#### Example

```html
<!-- Code -->
```

### data-validate
Lorem ipsum dolor sit ammet.

#### Example

```html
<!-- Code -->
```

### data-describedby
Lorem ipsum dolor sit ammet.

#### Example

```html
<!-- Code -->
```


## Callbacks

### beforeValidation
Lorem ipsum dolor sit ammet.

#### Example

```javascript
// Code
```

### valid
Lorem ipsum dolor sit ammet.

#### Example

```javascript
// Code
```

### invalid
Lorem ipsum dolor sit ammet.

#### Example

```javascript
// Code
```

### eachInvalidField
Lorem ipsum dolor sit ammet.

#### Example

```javascript
// Code
```

### eachValidField
Lorem ipsum dolor sit ammet.

#### Example

```javascript
// Code
```

### afterValidation
Lorem ipsum dolor sit ammet.

#### Example

```javascript
// Code
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
jQuery.validate.extend({
	method : function() {

		// ...
	},
	otherMethod : function() {

		// ...
	}
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
	method : function() {

		// ...
	},
	otherMethod : function() {

		// ...
	}
});
```