# jQuery AnyForm

-

Para usar jQuery AnyForm você só precisa ter incluido em seu código uma versão da biblioteca <a href="http://jquery.com/" target="_blank">jQuery</a> igual ou superior a `1.7` e o arquivo com o plugin, que pode ser baixado nos links abaixo.

* <a href="https://www.dropbox.com/s/e0uozcatlzrrd1f/jQuery%20AnyForm%201.0.zip" target="_blank">Download jQuery AnyForm 1.0.zip</a>
* <a href="https://www.dropbox.com/s/x9kimxyxpudnuyw/jQuery%20AnyForm%201.0.tar" target="_blank">Download jQuery AnyForm 1.0.tar</a>
* <a href="https://www.dropbox.com/s/0wzauwilgf4jm57/jQuery%20AnyForm%201.0.rar" target="_blank">Download jQuery AnyForm 1.0.rar</a>

Usar o jQuery AnyForm é muito simples! Você só precisa encapsular o formulário que deseja validar e chamar o método `jQuery.fn.validate`.

Veja um exemplo:
```html
<script>jQuery('form').validate();</script>
```

Depois de chamar o método validate você pode fazer a maioria das validações mais usadas com <a href="http://www.w3.org/TR/2011/WD-html5-20110525/elements.html#embedding-custom-non-visible-data-with-the-data-attributes" target="_blank">atributos de dados</a>, que são totalmente válidos para o <a href="http://www.w3.org/TR/html5/" target="_blank">HTML5</a> segundo as especificações da <a href="http://www.w3.org/" target="_blank">W3C</a>.

Veja um exemplo de como tornar um campo obrigatório:
```html
<form>
	<input type="text" data-required />
</form>
```

jQuery AnyForm suporta todos os campos do <a href="http://www.w3.org/TR/html5/" target="_blank">HTML5</a> e utiliza <a href="http://www.w3.org/WAI/PF/aria/" target="_blank">WAI-ARIA</a> para tornar a validação acessível a leitores de tela. Além disso esta ferramenta dispõe de vários attributos e parâmetros para te ajudar desde as situações mais simples até as mais complexas.

## Attributos suportados

### data-conditional
Aceita um índice que será procurado no objeto do parâmetro `conditional` do método `jQuery.fn.validate`. Deve conter uma função de retorno boleano que será usada para verificar o campo (Leia <a href="#conditional">`conditional`</a>).

### data-ignore-case
Aceita um valor boleano que especifica se letras em maiusculo e minusculo podem ser tratadas como iguais.

### data-mask
Aceita uma mascara que será usada para alterar o valor do campo após ser verificado e válido. Você pode usar os grupos baseados na expressão passada no atributo `data-pattern

Veja o exemplo abaixo de um campo de preço:
```html
<input type="text" data-pattern="^([0-9])(?:[,\.]([0-9])([0-9])?)?[0-9]*$" data-mask="R$ ${1:0},${2:0}${3:0}" />
```

### data-pattern
Aceita uma expressão regular para testar o valor do campo.

### data-prepare
Aceita um índice que será procurado no objeto do parâmetro `prepare` do método `jQuery.fn.validate`. Deve conter uma função para retornar o valor do campo tratado (Leia <a href="#prepare">`prepare`</a>).

### data-required
Aceita valores boleanos e especifica se o campo é obrigatório. O valor padrão é true.

### data-trim
Aceita valores boleanos e especifica se o valor do campo deve ter os espaços do início e fim retirados antes da validação (O valor do campo não é alterado).

#### Observações
* Os campos que não possuem nenhum atributo são tratados como válidos.
* Você pode usar os métodos <a href="http://api.jquery.com/data/" target="_blank">`jQuery.fn.data`</a> e <a href="http://api.jquery.com/jQuery.data/" target="_blank">`jQuery.data`</a> para configurar os campos.
* Os patterns de campos não obrigatórios só são verificados caso o usuário tente preencher algo.

Veja um exemplo:
```html
<form>
	<input type="text" name="idade" />

	<button type="submit">Enviar</button>
</form>

<script>
	jQuery('form').validate();

	jQuery('[name="idade"]').data({
		required : true,
		pattern : /^[0-9]+$/
	});
</script>
```

## Parâmetros suportados por `jQuery.fn.validate`

### conditional
Aceita um objeto que vai armazenar funções para verificar o campos do formulário (Leia <a href="#data-conditional">data-conditional</a>).

Veja um exemplo de confirmação de senha:
```html
<form>
	<input type="text" name="senha" />

	<input type="text" name="confirma-senha" data-conditional="confirm-senha" />

	<button type="submit">Enviar</button>
</form>

<script>
	jQuery('form').validate({
		conditional : {
			'confirm-senha' : function() {

				return jQuery(this).val() == jQuery('[name="senha"]').val();
			}
		}
	});
</script>
```

### filter
O parâmetro filter aceita um seletor ou função para filtrar quais campos dentro do formulário devem ser verificados.

Veja um exemplo de como validar apenas textarea's e campos do tipo texto:
```html
<script>
	jQuery('form').validate({
		filter : '[type="text"], textarea'
	});
</script>
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
Aceita um objeto que vai armazenar funções para preparar o valor dos campos do formulário antes da validação (Leia <a href="#data-prepare">data-prepare</a>).

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
```html
<script>jQuery('form').validateDestroy();</script>
```

## Alterando as propriedades padrões do método `jQuery.fn.validate`
Você pode alterar os valores padrões dos parâmetros passados para o método `jQuery.fn.validate` usando o método `jQuery.fn.validateSetup`.

Veja o exemplo:

```html
<script>
	jQuery('form').validateSetup({
		sendForm : false,
		onKeyup : true
	});
</script>
```