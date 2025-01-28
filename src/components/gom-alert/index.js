class GomAlert extends HTMLElement {
	constructor() {
		super()

		const shadow = this.attachShadow({ mode: 'open' })

		const style = document.createElement('style')

		style.innerHTML = `
             @import url('/src/components/gom-alert/styles.css');

        `

		this.alertDiv = document.createElement('div')
		this.alertDiv.className = 'alert'
		shadow.appendChild(style)
		shadow.appendChild(this.alertDiv)

		this.updateAlert()
	}

	static get observedAttributes() {
		return ['message', 'type']
	}

	attributeChangedCallback(name, oldValue, newValue) {
		this.updateAlert()
	}

	updateAlert() {
		this.alertDiv.innerText = this.getAttribute('message') || 'Alerta!'
		this.alertDiv.className =
			'alert ' + (this.getAttribute('type') || 'info')
	}
}

customElements.define('gom-alert', GomAlert)
