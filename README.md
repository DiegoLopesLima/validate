> Coming soon: [Warble is a client side and server side library to quickly handle your data writing less and doing more](https://github.com/Tradusy/warble).

# jQuery Validate

> License: <a href="http://www.opensource.org/licenses/mit-license.php" target="_blank">_MIT_</a>.

> Version: _1.1.2_.

> Requires: _jQuery 1.7+_.

To use _jQuery Validate_ you just need to include in your code a version of the <a href="http://jquery.com/" target="_blank">jQuery library</a> equal or more recent than `1.7` and a file with the plugin. <a href="https://www.dropbox.com/s/p5xhpb52572xy5b/jQuery%20Validate%201.1.2.zip" target="_blank">Click here to download the plugin</a>.

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

_jQuery Validate_ supports all fields of the HTML5 and uses <a href="http://www.w3.org/WAI/PF/aria/" target="_blank">WAI-ARIA</a> for accessibility. You can use several attributes to your validations.

## Attributes

<table>
	<tr>
		<th width="110px">Attribute</th>

		<th>Description</th>

		<th width="75px">Default</th>
	</tr>

	<tr>
		<td>data-conditional</td>

		<td>Accepts one or more indexes separated by spaces from the `conditional` object that should contain a the boolean return function.</td>

		<td></td>
	</tr>

	<tr>
		<td>data-ignore-case</td>

		<td>Accepts a boolean value to specify if field is case-insensitive.</td>

		<td>true</td>
	</tr>

	<tr>
		<td>data-mask</td>

		<td>Accepts a mask to change the field value to the specified format. The mask should use the character groups of the regular expression passed to the <a href="#data-pattern">`data-pattern`</a> attribute.</td>

		<td>${0}</td>
	</tr>

	<tr>
		<td>data-pattern</td>

		<td>Accepts a regular expression to test the field value.</td>

		<td>/(?:)/</td>
	</tr>

	<tr>
		<td>data-prepare</td>

		<td>Accepts a index from the `prepare` object that should contain a function to receive the field value and returns a new value treated.</td>

		<td></td>
	</tr>

	<tr>
		<td>data-required</td>

		<td>Accepts a boolean value to specify if field is required.</td>

		<td>false</td>
	</tr>

	<tr>
		<td>data-trim</td>

		<td>Accepts a boolean value. If true, removes the spaces from the ends in the field value. (The field value is not changed)</td>

		<td>false</td>
	</tr>

	<tr>
		<td>data-validate</td>

		<td>You can use the `data-validate` to calling extensions.</td>

		<td></td>
	</tr>
</table>

## Parameters

<table>
	<tr>
		<th width="110px">Parameter</th>

		<th>Description</th>

		<th width="75px">Default</th>
	</tr>

	<tr>
		<td>conditional</td>

		<td>Accepts a object to store functions from validation.</td>

		<td></td>
	</tr>

	<tr>
		<td>filter</td>

		<td>Accepts a selector string or function to filter the validated fields.</td>

		<td>*</td>
	</tr>

	<tr>
		<td>nameSpace</td>

		<td>A namespace used in all delegates events.</td>

		<td>validate</td>
	</tr>

	<tr>
		<td>onBlur</td>

		<td>Accepts a boolean value. If true, triggers the validation when blur the field.</td>

		<td>false</td>
	</tr>

	<tr>
		<td>onChange</td>

		<td>Accepts a boolean value. If true, triggers the validation when change the field value.</td>

		<td>false</td>
	</tr>

	<tr>
		<td>onKeyup</td>

		<td>Accepts a boolean value. If true, triggers the validation when press any key.</td>

		<td>false</td>
	</tr>

	<tr>
		<td>onSubmit</td>

		<td>Accepts a boolean value. If true, triggers the validation when submit the form.</td>

		<td>true</td>
	</tr>

	<tr>
		<td>prepare</td>

		<td>Accepts a object to store functions to prepare the field values.</td>

		<td></td>
	</tr>

	<tr>
		<td>sendForm</td>

		<td>Accepts a boolean value. If false, prevents submit the form (Useful to submit forms via <a href="http://api.jquery.com/jQuery.ajax/" target="_blank">AJAX</a>).</td>

		<td>true</td>
	</tr>

	<tr>
		<td>waiAria</td>

		<td>Accepts a boolean value. If false, disables <a href="http://www.w3.org/WAI/PF/aria/" target="_blank">WAI-ARIA</a>.</td>

		<td>true</td>
	</tr>
</table>

## Callbacks

<table>
	<tr>
		<th width="110px">Callback</th>

		<th>Description</th>
	</tr>

	<tr>
		<td>valid</td>

		<td>Accepts a function to be calling when form is valid. The context (`this`) is the current verified form and the parameters are respectively `event` and `options`.</td>
	</tr>

	<tr>
		<td>invalid</td>

		<td>Accepts a function to be calling when form is invalid. The context (`this`) is the current verified form and the parameters are respectively `event` and `options`.</td>
	</tr>

	<tr>
		<td>eachField</td>

		<td>Accepts a function to be calling to each field. The context (`this`) is the current verified field and the parameters are respectively `event`, `status` and `options`.</td>
	</tr>

	<tr>
		<td>eachInvalidField</td>

		<td>Accepts a function to be calling when field is invalid. The context (`this`) is the current verified field and the parameters are respectively `event`, `status` and `options`.</td>
	</tr>

	<tr>
		<td>eachValidField</td>

		<td>Accepts a function to be calling when field is valid. The context (`this`) is the current verified field and the parameters are respectively `event`, `status` and `options`.</td>
	</tr>
</table>

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

## Creating descriptions
You can create descriptions to the field states.

Example:
```html
<form>
	<input type="text" data-describedby="messages" data-description="test" />

	<span id="messages"></span>
</form>
```

```javascript
$('form').validate({
	description : {
		test : {
			required : '<div class="error">Required</div>',
			pattern : '<div class="error">Pattern</div>',
			conditional : '<div class="error">Conditional</div>',
			valid : '<div class="success">Valid</div>'
		}
	}
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
