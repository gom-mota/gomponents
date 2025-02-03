export const ROUTES = {
	'/': { name: 'Introduction', label: 'Introduction', nav: true },
	'/component/:name': { name: 'Component', label: 'Component' },
}

window.markdownToHtml = (markdown) => {
	const lines = markdown.split('\n')
	let html = ''

	lines.forEach((line) => {
		if (line.startsWith('# ')) {
			html += `<h1>${line.slice(2)}</h1>`
		} else if (line.startsWith('## ')) {
			html += `<h2>${line.slice(3)}</h2>`
		} else if (line.startsWith('### ')) {
			html += `<h3>${line.slice(4)}</h3>`
		} else if (line.startsWith('- ')) {
			html += `<li>${line.slice(2)}</li>`
		} else if (line.trim() === '') {
			html += '<br>'
		} else if (line.startsWith('`render')) {
			html += `<div class="component-preview-container doc">
						${line.slice(7)}
					</div>`
		} else {
			html += `<p>${line}</p>`
		}
	})

	return html
}
