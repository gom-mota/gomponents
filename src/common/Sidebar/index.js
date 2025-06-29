import { ROUTES } from '../../app.js'
import components from '../../components/index.js'

const Sidebar = () => {
	const render = /*html*/ `
	<div class='sidebar-container'>
        <header>
            <div>
                <h1>GOMUI</h1>
                <span>web components lib</span>
            </div>

            <a href="https://github.com/gom-mota/gomponents" target="_blank">
                <ion-icon name="logo-github"></ion-icon>
            </a>
        </header>
        
        <nav>
            <ul>
                <li>Ponto de Partida</li>

                <ul>
                    ${Object.entries(ROUTES)
						.filter(([_, { nav }]) => nav === true)
						.map(
							([route, { name, label }]) => /*html*/ `
                                <li 
                                    id="nav-${name.toLowerCase()}"
                                    onclick="navigateToRoute('${route}')">
                                        ${label}
                                </li>
                            `
						)
						.join('')}
                </ul>

                <li>Componentes</li>

                <ul>
                    ${Object.keys(components.expose)
						.map(
							(name) => /*html*/ `
                                <li id="nav-${name}" onclick="navigateToRoute('/component/${name}')">
                                    ${name}
                                </li>
                            `
						)
						.join('')}
                </ul>
            </ul>
        </nav>
	</div>
    `

	const after_render = () => {
		const navItems = document.querySelectorAll('#sidebar li[id^="nav-"]')
		const pathname = window.location.pathname

		navItems.forEach((item) => item.classList.remove('active'))

		const pathParts = pathname.split('/').filter(Boolean)

		const lastPathPart = pathParts.length
			? pathParts.pop()
			: ROUTES['/'].name.toLowerCase()

		const currentPathNavItemId = `nav-${lastPathPart}`

		const navItemElement = document.getElementById(currentPathNavItemId)

		if (navItemElement) navItemElement.classList.add('active')

		navItems.forEach((item) => {
			item.addEventListener('click', () => {
				navItems.forEach((i) => i.classList.remove('active'))
				item.classList.add('active')
			})
		})
	}

	return { render, after_render }
}

const mount = (container) => {
	const { render, after_render } = Sidebar()

	container.innerHTML += render
	after_render()
}

export default mount
