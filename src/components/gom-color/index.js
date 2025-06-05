class GomColor extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({ mode: 'open' })

		this._color = '#ffffffba'
		this._text = 'color'
	}

	render() {
		return /*html*/ `
            <style>
                @import url('/src/components/gom-color/styles.css');
            </style>

            <div style="background: ${this._color};">
                <span class='color-text'>${this._color}</span>
                <span>${this._text}</span>
            </div>
        `
	}

	connectedCallback() {
		if (this.hasAttribute('color')) this._color = this.getAttribute('color')
		if (this.hasAttribute('text')) this._text = this.getAttribute('text')

		this.shadowRoot.innerHTML = this.render()
	}
}

customElements.define('gom-color', GomColor)
