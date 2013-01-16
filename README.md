# jQuery AnyForm
To use jQuery AnyForm you just need include in your code a version of the <a href="http://jquery.com/" target="_blank">jQuery library</a> equal or more than `1.7` and a file with the plugin that can be downloaded in links down:

* <a href="https://www.dropbox.com/s/1snmc1w1xr2jc2u/jQuery%20AnyForm%201.0.1.zip" target="_blank">Download jQuery AnyForm 1.0.1.zip</a>
* <a href="https://www.dropbox.com/s/55uestr790j46kz/jQuery%20AnyForm%201.0.1.tar" target="_blank">Download jQuery AnyForm 1.0.1.tar</a>
* <a href="https://www.dropbox.com/s/55uestr790j46kz/jQuery%20AnyForm%201.0.1.rar" target="_blank">Download jQuery AnyForm 1.0.1.rar</a>

See also: <a href="https://github.com/DiegoLopesLima/jQuery-AnyForm/wiki/Downloads">Downloads</a>, <a href="https://github.com/DiegoLopesLima/jQuery-AnyForm/wiki">Wiki</a>, <a href="https://github.com/DiegoLopesLima/jQuery-AnyForm/wiki/Changelog">Changelog</a>.

After this, you just need select your form and calling the `jQuery.fn.validate` method.

See a example:
```javascript
jQuery('form').validate();
```

After calling the `jQuery.fn.validate` method, you can validate your fields using <a href="http://www.w3.org/TR/2011/WD-html5-20110525/elements.html#embedding-custom-non-visible-data-with-the-data-attributes" target="_blank">data attributes</a>, that are valid to the <a href="http://www.w3.org/TR/html5/" target="_blank">HTML5</a>, according to the <a href="http://www.w3.org/" target="_blank">W3C</a>.

See a example to required field:
```html
<form>
	<input type="text" data-required />
</form>
```

jQuery AnyForm supports all fields of the HTML5 and uses <a href="http://www.w3.org/WAI/PF/aria/" target="_blank">WAI-ARIA</a> for accessibility. You can use several attributes to your validations.

## Attributes
See down the supported attributes.

### data-conditional
Accepts one or more indexes separated by spaces from the `conditional` object that should contain a the boolean return function. (See <a href="#conditional">`conditional`</a>)

Example:
```html
<form>
	<input type="password" id="password" />

	<input type="password" data-conditional="confirmPassword" />
</form>
```

```javascript
jQuery('form').validate({
	conditional : {
		confirmPassword : function() {

			return $(this).val() == $('#password').val();
		}
	}
});
```

### data-ignore-case
Accepts a boolean value to specify if field is case-insensitive. (Default:`true`)

### data-mask
Accepts a mask to change the field value to the specified format. The mask should use the character groups of the regular expression passed to the <a href="#data-pattern">`data-pattern`</a> attribute.

Example:
```html
<input type="text" data-pattern="^([0-9]+)(?:[,.]([0-9])([0-9])?)?[0-9]*^" data-mask="${1},${2:`0`}${3:`0`}" />
```

### data-pattern
Accepts a regular expression to test the field value.

### data-prepare
Accepts a index from the `prepare` object that should contain a function to receive the field value and returns a new value treated. (See <a href="#prepare">`prepare`</a>)

### data-required
Accepts a boolean value to specify if field is required. (Default:`false`)

### data-trim
Accepts a boolean value. If true, removes the spaces from the ends in the field value. (The field value is not changed)

### data-validate
You can use the `data-validate` to calling extensions. (See <a href="#creating-extensions">Creating extensions</a>)

## Supported parameters

### conditional
Accepts a object to store functions from validation. (See <a href="#data-conditional">`data-conditional`</a>)

### filter
Accepts a selector string or function to filter the validated fields.

Example to only validate text areas and text fields:
```javascript
jQuery('form').validate({
	filter : '[type="text"], textarea'
});
```

### nameSpace
A namespace used in all delegates events. (Default:`jQueryAnyForm`)

### onBlur
Accepts a boolean value. If true, triggers the validation when blur the field. (Default:`false`)

### onChange
Accepts a boolean value. If true, triggers the validation when change the field value. (Default:`false`)

### onKeyup
Accepts a boolean value. If true, triggers the validation when press any key. (Default:`false`)

### onSubmit
Accepts a boolean value. If true, triggers the validation when submit the form. (Default:`true`)

### prepare
Accepts a object to store functions to prepare the field values. (See <a href="#data-prepare">`data-prepare`</a>).

### sendForm
Accepts a boolean value. If false, prevents submit the form (Useful to submit forms via <a href="http://api.jquery.com/jQuery.ajax/" target="_blank">AJAX</a>). (Default:`true`)

### waiAria
Accepts a boolean value. If false, disables <a href="http://www.w3.org/WAI/PF/aria/" target="_blank">WAI-ARIA</a>. (Default:`true`)

## Callbacks

### valid
Accepts a function to be calling when form is valid. The context (`this`) is the current verified form and the parameters are respectively `event` and `options`.

### invalid
Accepts a function to be calling when form is invalid. The context (`this`) is the current verified form and the parameters are respectively `event` and `options`.

### eachField
Accepts a function to be calling to each field. The context (`this`) is the current verified field and the parameters are respectively `event`, `status` and `options`.

### eachInvalidField
Accepts a function to be calling when field is invalid. The context (`this`) is the current verified field and the parameters are respectively `event`, `status` and `options`.

### eachValidField
Accepts a function to be calling when field is valid. The context (`this`) is the current verified field and the parameters are respectively `event`, `status` and `options`.


## Removing validation
You can remove validation of a form using the `jQuery.fn.validateDestroy` method.

Example:
```javascript
jQuery('form').validateDestroy();
```

## Changing the default values of `jQuery.fn.validate`
You can changes the default values of `jQuery.fn.validate` using `jQuery.validateSetup` method.

Example:
```javascript
jQuery('form').validateSetup({
	sendForm : false,
	onKeyup : true
});
```

## Creating extensions
You can use the `jQuery.validateExtend` method to extend the validations and calling the extensions with `data-validate` attribute.

Example:
```html
<form>
	<input type="text" name="age" data-validate="age" />
</form>
```

```javascript
jQuery('form').validate();

jQuery.validateExtend({
	age : {
		required : true,
		pattern : /^[0-9]+$/,
		conditional : function(value) {

			return Number(value) > 17;
		}
	}
});
```

## Observations
* You can change any attribute without the need to call jQuery.fn.validate again.
* Fields without validation attributes are considered valid.
* You can use the <a href="http://api.jquery.com/data/" target="_blank">`jQuery.fn.data`</a> e <a href="http://api.jquery.com/jQuery.data/" target="_blank">`jQuery.data`</a> and <a href="http://api.jquery.com/jQuery.data/" target="_blank">`jQuery.data`</a> methods to configure validation.

Example:
```html
<form>
	<input type="text" name="age" />

	<button type="submit">Send</button>
</form>
```

```javascript
jQuery('form').validate();

jQuery('[name="age"]').data({
	required : true,
	pattern : /^[0-9]+$/,
	conditional : function(value) {

		return Number(value) > 17;
	}
});
```