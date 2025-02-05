const ComponentSetting = (props) => {
	const { tag, config } = props

	const inputTypes = {
		text: (prop, key) => {
			return /*html*/ `
                <input type="text" placeholder="Digite aqui." value="${prop.default}" oninput="updateComponent('${tag}', '${key}', this.value)">
            `
		},
		check: (prop, key) => {
			return /*html*/ `
                <input type="checkbox" id="${key}" ${
				prop.default ? 'checked' : ''
			} onchange="updateComponent('${tag}', '${key}', this.checked)">
            `
		},
		radio: (prop, key) => {
			return prop.options
				.map(
					(option) => /*html*/ `
						<input type="radio" name="${key}" id="${option}" value="${option}" ${
						prop.default === option ? 'checked' : ''
					} onclick="updateComponent('${tag}', '${key}', this.value)">
                        
						<label for="${option}">${option}</label>
                    `
				)
				.join('')
		},
		select: (prop, key) => {
			const options = prop.options
				.map(
					(option) =>
						/*html*/ `<option value="${option}">${option}</option>`
				)
				.join('')

			return /*html*/ `
                <select onchange="updateComponent('${tag}', '${key}', this.value)">
                    ${options}
                </select>
            `
		},
	}

	const render = /*html*/ `
			<style>
				@import url('/src/common/ComponentSetting/styles.css');
			</style>

             <table class='component-setting'>
				<thead>
					<tr>
						<th>Name</th>
						<th>Description</th>
						<th>Default</th>
						<th>Control</th>
					</tr>
				</thead>

				<tbody>
					${Object.entries(config.properties)
						.map(
							([key, prop]) =>
								`<tr>
									<td>${key}</td>
									<td>${prop.description}</td>
									<td>${prop.default}</td>
									<td>${inputTypes[prop.type](prop, key) || '-'}</td>
								</tr>`
						)
						.join('')}
				</tbody>
			</table>
        `

	const after_render = () => {
		window.updateComponent = (tag, propName, value) => {
			const renderedComponent = document.querySelector(tag)
			renderedComponent.setAttribute(propName, value)
		}

		const setInitialProps = () => {
			Object.entries(config.properties).forEach(([key, prop]) => {
				if (prop.default !== undefined)
					updateComponent(tag, key, prop.default)
			})
		}

		setInitialProps()
	}

	return { render, after_render }
}

const mount = (container, props) => {
	const { render, after_render } = ComponentSetting(props)

	container.innerHTML += render
	after_render()
}

export default mount
