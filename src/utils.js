export const ROUTES = {
	'/': { name: 'Introduction', label: 'Introdução', nav: true },
	'/usage': { name: 'Usage', label: 'Uso', nav: true },
	'/component/:name': { name: 'Component', label: 'Componente' },
}

export const markdownToHtml = (markdown) => {
	const lines = markdown.split('\n')
	const tagStack = []
	let html = ''

	const openTagRegex = /^<([a-zA-Z][^\s/>]*)[^>]*>$/
	const closeTagRegex = /^<\/([a-zA-Z][^\s/>]*)>$/

	const markdownHtmlTag = {
		'# ': (line) => `<h1>${line.slice(2)}</h1>`,
		'## ': (line) => `<h2>${line.slice(3)}</h2>`,
		'### ': (line) => `<h3>${line.slice(4)}</h3>`,
		'- ': (line) => `<li>${line.slice(2)}</li>`,
	}

	for (const line of lines) {
		const openMatch = line.match(openTagRegex)
		const closeMatch = line.match(closeTagRegex)

		if (openMatch) {
			tagStack.push(openMatch[1])
			html += line
			continue
		}

		if (closeMatch) {
			if (
				tagStack.length &&
				tagStack[tagStack.length - 1] === closeMatch[1]
			) {
				tagStack.pop()
			}
			html += line
			continue
		}

		if (tagStack.length > 0) {
			html += line
			continue
		}

		const markdownKey = Object.keys(markdownHtmlTag).find((prefix) =>
			line.startsWith(prefix)
		)

		if (markdownKey) {
			html += markdownHtmlTag[markdownKey](line)
		} else if (line.trim() === '') {
			html += '<br>'
		} else {
			html += `<p>${line}</p>`
		}
	}

	return `<div class="doc-container">${html}</div>`
}
