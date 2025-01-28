const Component = async ({ name }) => {
	const render = () => {
		return /*html*/ `
			<h1>Component: ${name}</h1>
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
