# jQuery AnyForm

-

To use jQuery AnyForm you just need include in your code a version of the <a href="http://jquery.com/" target="_blank">jQuery library</a> equal or more than `1.7` and a file with the plugin that can be downloaded in links down:

* <a href="https://www.dropbox.com/s/1snmc1w1xr2jc2u/jQuery%20AnyForm%201.0.1.zip" target="_blank">Download jQuery AnyForm 1.0.1.zip</a>
* <a href="https://www.dropbox.com/s/55uestr790j46kz/jQuery%20AnyForm%201.0.1.tar" target="_blank">Download jQuery AnyForm 1.0.1.tar</a>
* <a href="https://www.dropbox.com/s/55uestr790j46kz/jQuery%20AnyForm%201.0.1.rar" target="_blank">Download jQuery AnyForm 1.0.1.rar</a>

See also: <a href="https://github.com/DiegoLopesLima/jQuery-AnyForm/wiki/Downloads" target="_blank">Downloads</a>

You just need select a form and calling the `jQuery.fn.validate` method.

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
Accepts a boolean value to specify if field is case-insensitive. (Default:true)

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
Accepts a boolean value to specify if field is required. (Default:false)

### data-trim
Aceita valores boleanos e especifica se o valor do campo deve ter os espaços do início e fim retirados antes da validação (O valor do campo não é alterado).

#### Observações
* Os campos que não possuem nenhum atributo são tratados como válidos.
* Você pode usar os métodos <a href="http://api.jquery.com/data/" target="_blank">`jQuery.fn.data`</a> e <a href="http://api.jquery.com/jQuery.data/" target="_blank">`jQuery.data`</a> para configurar os campos.

Veja um exemplo:
```html
<form>
	<input type="text" name="idade" />

	<button type="submit">Enviar</button>
</form>
```

```javascript
jQuery('form').validate();

jQuery('[name="idade"]').data({
	required : true,
	pattern : /^[0-9]+$/
});
```
* Os patterns de campos não obrigatórios só são verificados caso o usuário tente preencher algo.

## Parâmetros suportados por `jQuery.fn.validate`

### conditional
Aceita um objeto que vai armazenar funções para verificar o campos do formulário (Leia <a href="#data-conditional">`data-conditional`</a>).

Veja um exemplo de confirmação de senha:
```html
<form>
	<input type="text" name="senha" />

	<input type="text" name="confirma-senha" data-conditional="confirm-senha" />

	<button type="submit">Enviar</button>
</form>
```

```
jQuery('form').validate({
	conditional : {
		'confirm-senha' : function() {

			return jQuery(this).val() == jQuery('[name="senha"]').val();
		}
	}
});
```

### filter
O parâmetro filter aceita um seletor ou função para filtrar quais campos dentro do formulário devem ser verificados.

Veja um exemplo de como validar apenas textarea's e campos do tipo texto:
```javascript
jQuery('form').validate({
	filter : '[type="text"], textarea'
});
```

### nameSpace
Um name space que será atribuido na delegação de todos os eventos do plugin. Por padrão seu valor é `validate`.

### onBlur
Aceita um valor boleado que especifica se os campos devem ser verificados ao perderem o foco. Por padrão seu valor é `false`.

### onChange
Aceita um valor boleado que especifica se os campos devem ser verificados ao serem alterados. Por padrão seu valor é `false`.

### onKeyup
Aceita um valor boleado que especifica se os campos devem ser verificados ao precionar uma tecla. Por padrão seu valor é `false`.

### onSubmit
Aceita um valor boleado que especifica se os campos devem ser verificados no envio do formulário. Por padrão seu valor é `true`.

### prepare
Aceita um objeto que vai armazenar funções para preparar o valor dos campos do formulário antes da validação (Leia <a href="#data-prepare">`data-prepare`</a>).

### sendForm
Aceita um valor boleado que especifica se o formulário deve ser enviado ao ser verificado e válido (Útil para formulários enviados por <a href="http://api.jquery.com/jQuery.ajax/" target="_blank">AJAX</a>). Por padrão seu valor é `true`.

### waiAria
Aceita um valor boleado que especifica se <a href="http://www.w3.org/WAI/PF/aria/" target="_blank">WAI-ARIA</a> pode ser usado e modificado.


## Callbacks

### valid
Aceita uma função que será executada sempre que o formulário for verificado e esteja válido. O contexto do escopo da função (`this`) é o próprio formulário e os parâmetros passados são respectivamente `event` e `options`.

### invalid
Aceita uma função que será executada sempre que o formulário for verificado e esteja inválido. O contexto do escopo da função (`this`) é o próprio formulário e os parâmetros passados são respectivamente `event` e `options`.

### eachField
Aceita uma função que será executada cada vez que um campo for verificado. O contexto do escopo da função (`this`) é o próprio campo e os parâmetros retornados são respectivamente `event`, `status` e `options`.

### eachInvalidField
Aceita uma função que será executada cada vez que um campo for verificado e esteja inválido. O contexto do escopo da função (`this`) é o próprio campo e os parâmetros retornados são respectivamente `event`, `status` e `options`.

### eachValidField
Aceita uma função que será executada cada vez que um campo for verificado e esteja válido. O contexto do escopo da função (`this`) é o próprio campo e os parâmetros retornados são respectivamente `event`, `status` e `options`.


## Retirando a validação do formulário
As vezes é necessário retirar a validação de um formulário em uma situação específica, para isso você pode utilizar o método `jQuery.fn.validateDestroy`.

Veja o exemplo:
```javascript
jQuery('form').validateDestroy();
```

## Alterando as propriedades padrões do método `jQuery.fn.validate`
Você pode alterar os valores padrões dos parâmetros passados para o método `jQuery.fn.validate` usando o método `jQuery.fn.validateSetup`.

Veja o exemplo:
```javascript
jQuery('form').validateSetup({
	sendForm : false,
	onKeyup : true
});
```

## Observações
* Os atributos ou qualquer propriedade dos campos podem ser alteradas a qualquer momento sem a necessidade de chamar `jQuery.fn.validate` novamente.
* Não há necessidade de fazer nenhuma modificação para que a validação reconheça campos externos ao formulário que utilizem o atributo `form`.

Exemplo:
```html
<form id="my-form"></form>

<input type="text" form="my-form" />
```

```javascript
jQuery('form').validate();
```