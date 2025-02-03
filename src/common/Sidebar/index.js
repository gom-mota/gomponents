import { ROUTES } from '../../utils.js'
import components from '../../components/index.js'

const Sidebar = () => {
	const sidebarElement = document.getElementById('sidebar')

	const render = () => {
		sidebarElement.innerHTML = /*html*/ `
        <style>
            @import url('/src/common/Sidebar/styles.css');
        </style>

        <header>
            <div>
                <h1>Gomlib</h1>
                <span>web components library</span>
            </div>

            <button>
                <ion-icon name="logo-github"></ion-icon>
            </button>
        </header>
        
        <nav>
            <ul>
                <li>Getting Started</li>

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

                <li>Components</li>

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
	}

	render()

	const navItems = document.querySelectorAll('#sidebar li')

	navItems.forEach((item) => {
		item.addEventListener('click', () => {
			navItems.forEach((i) => i.classList.remove('active'))
			item.classList.add('active')
		})
	})

	window.onload = () => {
		const lastPathnamePart = window.location.pathname.split('/').pop()

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

export default Sidebar
