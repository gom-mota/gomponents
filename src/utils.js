export const ROUTES = {
	'/': { name: 'Introduction', label: 'Introdução', nav: true },
	'/usage': { name: 'Usage', label: 'Uso', nav: true },
	'/component/:name': { name: 'Component', label: 'Componente' },
}

window.markdownToHtml = (markdown) => {
	const lines = markdown.split('\n')
	let html = ''
	let inRenderBlock = false
	let renderContent = ''

	lines.forEach((line) => {
		// Se encontrar a palavra-chave "start-render", marca o início do bloco
		if (line.includes('`start-render')) {
			inRenderBlock = true
			renderContent = '' // Limpa o conteúdo do bloco ao começar
		}
		// Se encontrar a palavra-chave "end-render", marca o fim do bloco e envolve o conteúdo com a div pai
		else if (line.includes('`end-render') && inRenderBlock) {
			html += `<div class="component-preview-container doc">${renderContent}</div>`
			inRenderBlock = false
		}
		// Se estamos dentro de um bloco de renderização, acumula o conteúdo
		else if (inRenderBlock) {
			renderContent += `${line}\n` // Acumula as linhas dentro do bloco
		}
		// Verifica a palavra-chave "`color" seguida de um código de cor (ex: #ff0000) e texto opcional
		else if (
			/^`color\s+#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})\s+(.+)$/.test(
				line.trim()
			)
		) {
			// Extrai a cor e o texto da linha usando expressão regular
			const [_, color, text] = line
				.trim()
				.match(/^`color\s+#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})\s+(.+)$/)
			html += `<div class="hex-color-block" style="background: #${color};"><span>${text}</span></div>`
		}
		// Se a linha contém uma tag <div>, não adiciona <p> em volta
		else if (line.includes('<div>') || line.includes('</div>')) {
			html += line // Apenas adiciona a linha como está
		}
		// Outras condições de formatação
		else if (line.startsWith('# ')) {
			html += `<h1>${line.slice(2)}</h1>`
		} else if (line.startsWith('## ')) {
			html += `<h2>${line.slice(3)}</h2>`
		} else if (line.startsWith('### ')) {
			html += `<h3>${line.slice(4)}</h3>`
		} else if (line.startsWith('- ')) {
			html += `<li>${line.slice(2)}</li>`
		} else if (line.trim() === '') {
			html += '<br>'
		} else {
			html += `<p>${line}</p>` // Envolvem as outras linhas com <p>
		}
	})

	// Se o Markdown terminar com um bloco aberto, adiciona a div com o conteúdo ainda em aberto (caso necessário)
	if (inRenderBlock) {
		html += `<div class="component-preview-container doc">${renderContent}</div>`
	}

	return `<div class="doc-container">${html}</div>`
}
