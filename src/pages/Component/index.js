import ComponentSetting from '../../common/ComponentSetting/index.js'
import components from '../../components/index.js'

const Component = async ({ name }) => {
	const tag = components[name]
	const baseComponentPath = `/src/components/${tag}`

	let config

	const pageName = tag ? name : 'not found'

	if (tag) {
		await import(`${baseComponentPath}/index.js`)

		config = await fetch(`${baseComponentPath}/config.json`).then(
			(response) => response.json()
		)
	}

	window.copyPreviewRenderCode = () => {
		const previewRenderCode = document.getElementById(
			'component-preview-render'
		).innerHTML

		navigator.clipboard
			.writeText(previewRenderCode)
			.then(() => {
				alert(`Código copiado!`)
			})
			.catch(function (err) {
				console.error('Erro ao copiar o texto: ', err)
			})
	}

	const handleRenderActiveTab = (element) => {
		const tabButtonsElement = document.querySelectorAll(
			'#component-tabs-container button'
		)

		tabButtonsElement.forEach((tab) => tab.classList.remove('active'))

		element.classList.add('active')

		const tabContentsElement = document.querySelectorAll(
			'#component-tabs-contents>div'
		)

		tabContentsElement.forEach((tab) => {
			tab.style.display = tab.id.includes(element.id) ? 'flex' : 'none'
		})
	}

	const handleComponentCallbacks = () => {
		const components = document.querySelectorAll(tag)

		if (config && config.properties) {
			Object.entries(config.properties).forEach(([key, prop]) => {
				if (prop.type === 'function') {
					const callback = eval(prop.default)

					const [firstComponent, ...otherComponents] = components

					firstComponent[key] = callback

					for (const component of otherComponents) {
						component[key] = (...args) => {
							firstComponent[key](...args)
						}
					}
				}
			})
		}
	}

	window.handleClickTab = async (element) => {
		if (
			element.id === 'documentation' &&
			!element.classList.contains('active')
		) {
			document.getElementById('documentation-tab-content').innerHTML =
				await fetch(`${baseComponentPath}/doc.md`)
					.then((response) => response.text())
					.then((markdown) => markdownToHtml(markdown))

			handleComponentCallbacks()
		}

		handleRenderActiveTab(element)
	}

	const render = async () => {
		if (!tag) return /*html*/ `<h1>${name} component not found.</h1>`

		return /*html*/ `
			<div class='component-container'>
				<header>
					<h1>${name}</h1>
					
					<div class='tag-code-container'>
						<span class='tag-highlight'>&lt;</span>${tag}<span class='tag-highlight'>&gt;</span>
					</div>
				</header>

				<div id='component-tabs-container' class='component-tabs-container'>
						<button id='live-preview' class='tab-button active' onclick='handleClickTab(this)'>Pré-visualização</button>
						<button id='documentation' class='tab-button' onclick='handleClickTab(this)'>Documentação</button>
				</div>

				<div id='component-tabs-contents'>
					<div id='live-preview-tab-content' class='live-preview-tab-content'>
						<div class='component-preview-container'>
							<div id='component-preview-render'>	
								<${tag}></${tag}>
							</div>

							<button id="copy-code" class="copy-button" onclick="copyPreviewRenderCode()">
								<ion-icon name="copy-outline"></ion-icon>
								Copiar Código
							</button>
						</div>				
					</div>
						
					<div id='documentation-tab-content' class='documentation-tab-content'> </div>
				</div>
			</div>
		`
	}

	const after_render = async () => {
		if (tag) {
			const livePreviewTabContentElement = document.getElementById(
				'live-preview-tab-content'
			)

			ComponentSetting(livePreviewTabContentElement, { tag, config })

			handleComponentCallbacks()
		}
	}

	return {
		title: pageName,
		description: `${pageName} component page`,
		render,
		after_render,
	}
}

export default Component
