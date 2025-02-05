import ComponentSetting from '../../common/ComponentSetting/index.js'
import components from '../../components/index.js'

const Component = async ({ name }) => {
	const tag = components[name]
	const baseComponentPath = `/src/components/${tag}`

	if (tag) await import(`${baseComponentPath}/index.js`)

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

	window.handleClickTab = async (element) => {
		handleRenderActiveTab(element)

		if (element.id === 'documentation') {
			document.getElementById('documentation-tab-content').innerHTML =
				await fetch(`${baseComponentPath}/doc.md`)
					.then((response) => response.text())
					.then((markdown) => markdownToHtml(markdown))
		}
	}

	const render = async () => {
		if (!tag) return /*html*/ `<h1>${name} component not found.</h1>`

		return /*html*/ `
			<style>
				@import url('/src/pages/Component/style.css');
			</style>

			<div class='component-container'>
				<header>
					<h1>${name}</h1>
					
					<div class='tag-code-container'>
						<span class='tag-highlight'>&lt;</span>${tag}<span class='tag-highlight'>&gt;</span>
					</div>
				</header>

				<div id='component-tabs-container' class='component-tabs-container'>
						<button id='live-preview' class='tab-button active' onclick='handleClickTab(this)'>Live Preview</button>
						<button id='documentation' class='tab-button' onclick='handleClickTab(this)'>Documentation</button>
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
			const config = await fetch(`${baseComponentPath}/config.json`).then(
				(response) => response.json()
			)

			const livePreviewTabContentElement = document.getElementById(
				'live-preview-tab-content'
			)

			ComponentSetting(livePreviewTabContentElement, { tag, config })
		}
	}

	return {
		title: name,
		description: `${name} component page`,
		render,
		after_render,
	}
}

export default Component
