const ComponentSetting = (component, config) => {
	const inputTypes = {
		text: (prop, key) => {
			return /*html*/ `
                <input type="text" placeholder="Digite aqui." value="${prop.default}" oninput="updateComponent('${component}', '${key}', this.value)">
            `
		},
		check: (prop, key) => {
			return /*html*/ `
                <input type="checkbox" id="${key}" ${
				prop.default ? 'checked' : ''
			} onchange="updateComponent('${component}', '${key}', this.checked)">
            `
		},
		radio: (prop, key) => {
			return prop.options
				.map(
					(option) => /*html*/ `
						<input type="radio" name="${key}" id="${option}" value="${option}" ${
						prop.default === option ? 'checked' : ''
					} onclick="updateComponent('${component}', '${key}', this.value)">
                        
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
                <select onchange="updateComponent('${component}', '${key}', this.value)">
                    ${options}
                </select>
            `
		},
	}

	const render = () => /*html*/ `
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

	window.updateComponent = (component, propName, value) => {
		const renderedComponent = document.querySelector(component)
		renderedComponent.setAttribute(propName, value)
	}

	const setInitialProps = (config, component) => {
		Object.entries(config.properties).forEach(([key, prop]) => {
			if (prop.default !== undefined)
				updateComponent(component, key, prop.default)
		})
	}

	setInitialProps(config, component)

	return render()
}

export default ComponentSetting
