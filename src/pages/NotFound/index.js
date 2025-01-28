const NotFound = async () => {
	const render = () => {
		return /*html*/ `
			<h1>not found page</h1>
		`
	}

	return {
		title: 'Not Found',
		description: 'Not found page',
		render,
		after_render: () => null,
	}
}

export default NotFound
