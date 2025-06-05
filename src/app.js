import Sidebar from './common/Sidebar/index.js'
import { ROUTES } from './utils.js'
import components from './components/index.js'
import { loadComponents, observeComponents } from '../index.js'

const handleGithubPages404File = () => {
	const search = window.location.search

	if (search && search[1] === '/') {
		const pathnameAndSearch = search.substring(1)
		const hash = window.location.hash

		window.history.replaceState(null, null, `${pathnameAndSearch}${hash}`)
	}
}

const renderPageContent = async (name, params) => {
	const content = document.getElementById('content')

	const { default: Page } = await import(`./pages/${name}/index.js`)

	const { render, after_render, title, description } = await Page(params)

	window.scrollTo({ top: 0, behavior: 'instant' })

	content.innerHTML = await render()
	await after_render()

	loadComponents(components.internal)

	document.title = `${title} | gomlib`
	document
		.querySelector('meta[name="description"]')
		.setAttribute('content', description)
}

window.handleMatchRoute = (pathname) =>
	Object.keys(ROUTES).find((route) => {
		const pattern = `^${route.replace(/:\w+/g, '([^/]+)')}$`
		const regex = new RegExp(pattern)

		return regex.test(pathname)
	})

const getRouteParams = (pathname, route) => {
	const pattern = `^${route.replace(/:\w+/g, '([^/]+)')}$`
	const matchRoute = pathname.match(pattern)

	const params = {}

	if (matchRoute) {
		const paramKeys = route.match(/:\w+/g) || []

		paramKeys.forEach(
			(param, index) => (params[param.slice(1)] = matchRoute[index + 1])
		)
	}

	return params
}

const handleRouteChange = () => {
	const pathname = window.location.pathname
	const currentRoute = handleMatchRoute(pathname)

	if (currentRoute) {
		const params = getRouteParams(pathname, currentRoute)

		renderPageContent(ROUTES[currentRoute].name, params)
	} else {
		renderPageContent('NotFound')
	}
}

window.navigateToRoute = (pathname) => {
	if (pathname !== window.location.pathname) {
		window.history.pushState(null, null, pathname)
		handleRouteChange()
	}
}

const handleRenderCommon = () => {
	Sidebar(document.getElementById('sidebar'))
}

const init = () => {
	observeComponents(components.internal)
	handleGithubPages404File()
	handleRouteChange()
	window.addEventListener('popstate', handleRouteChange)
	handleRenderCommon()
}

init()

//TODO: refatorar para deixar de criar funções no escopo global (window)
