Este é um botão simples que aciona uma função de retorno ao ser clicado.

## Color

<div>
`color #e0ff8b default
`color #ffa58b alert
</div>

## Variants

Aparência do botão. Pode ser utilizado para diferenciar ações em tela.

`start-render

<div>
    <gom-button label="Primary"></gom-button>
    <gom-button label="Secondary" variant="secondary"></gom-button>
    <gom-button label="Text" variant="text"></gom-button>
</div>
<div>
    <gom-button label="Primary" color="alert"></gom-button>
    <gom-button label="Secondary" variant="secondary" color="alert"></gom-button>
    <gom-button label="Text" variant="text" color="alert"></gom-button>
</div>

`end-render

## Disabled

Estado de desabilitado do botão.

`start-render

<div>
    <gom-button label="Primary" disabled="true"></gom-button>
    <gom-button label="Secondary" variant="secondary" disabled="true"></gom-button>
    <gom-button label="Text" variant="text" disabled="true"></gom-button>
</div>
<div>
    <gom-button label="Primary" color="alert" disabled="true"></gom-button>
    <gom-button label="Secondary" variant="secondary" color="alert" disabled="true"></gom-button>
    <gom-button label="Text" variant="text" color="alert" disabled="true"></gom-button>
</div>

`end-render
