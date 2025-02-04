// index.js
import components from './src/components/index.js'

const allComponents = new Set(Object.values(components))
const loadedComponents = new Set()

async function loadComponent(tag) {
	if (customElements.get(tag) || loadedComponents.has(tag)) return

	if (allComponents.has(tag)) {
		try {
			await import(`./src/components/${tag}/index.js`)
			loadedComponents.add(tag)
		} catch (error) {
			console.error(`Error loading ${tag} component: `, error)
		}
	} else {
		console.warn(`${tag} component not found.`)
	}
}

const observer = new MutationObserver((mutations) => {
	const nodesToLoad = []

	mutations.forEach((mutation) => {
		mutation.addedNodes.forEach((node) => {
			if (node.nodeType === Node.ELEMENT_NODE) {
				const tagName = node.tagName.toLowerCase()

				if (
					allComponents.has(tagName) &&
					!loadedComponents.has(tagName)
				)
					nodesToLoad.push(tagName)
			}
		})
	})

	if (nodesToLoad.length > 0)
		requestIdleCallback(() => nodesToLoad.forEach(loadComponent))
})

observer.observe(document.documentElement, { childList: true, subtree: true })

document.addEventListener('DOMContentLoaded', () => {
	allComponents.forEach((tagName) => {
		const existingComponent = document.querySelector(tagName)
		if (existingComponent && !loadedComponents.has(tagName))
			loadComponent(tagName)
	})
})
