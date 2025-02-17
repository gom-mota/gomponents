import { ROUTES } from '../../utils.js'
import components from '../../components/index.js'

const Sidebar = () => {
	const render = /*html*/ `
        <header>
            <div>
                <h1>Gomlib</h1>
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
                    ${Object.keys(components)
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
    `

	const after_render = () => {
		const navItems = document.querySelectorAll('#sidebar li')

		navItems.forEach((item) => {
			item.addEventListener('click', () => {
				navItems.forEach((i) => i.classList.remove('active'))
				item.classList.add('active')
			})
		})

		window.onload = () => {
			const hasMatchRoute = handleMatchRoute(window.location.pathname)

			const lastPathnamePart = window.location.pathname.split('/').pop()

			if (hasMatchRoute) {
				if (lastPathnamePart) {
					const navItemElement = Array.from(navItems).find(
						(item) => item.id === `nav-${lastPathnamePart}`
					)

					if (navItemElement) navItemElement.classList.add('active')
				} else
					document
						.getElementById(`nav-${ROUTES['/'].name.toLowerCase()}`)
						.classList.add('active')
			}
		}
	}

	return { render, after_render }
}

const mount = (container) => {
	const { render, after_render } = Sidebar()

	container.innerHTML += render
	after_render()
}

export default mount
