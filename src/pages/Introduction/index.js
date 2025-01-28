const Introduction = async () => {
	const render = () => {
		return /*html*/ `
			<h1>Introduction page content</h1>
		`
	}

	return {
		title: 'Introduction',
		description: 'Introduction page',
		render,
		after_render: () => null,
	}
}

export default Introduction
