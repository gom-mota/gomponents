import components from '../../components/index.js'

const Component = async ({ name }) => {
	const tag = components[name]

	const render = async () => {
		if (!tag) return /*html*/ `<h1>Not found component</h1>`

		await import(`../../components/${tag}/index.js`)

		return /*html*/ `
			<h1>Component: ${name}</h1>

			<${tag}></${tag}>
		`
	}

	return {
		title: name,
		description: `${name} component page`,
		render,
		after_render: () => null,
	}
}

export default Component
