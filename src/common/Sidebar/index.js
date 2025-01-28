import { ROUTES } from '../../utils.js'
import components from '../../components/index.js'

const Sidebar = () => {
	const sidebarElement = document.getElementById('sidebar')

	sidebarElement.innerHTML = /*html*/ `
            <nav>
                <ul>
                    <li>Getting Started</li>
    
                    <ul>
                        ${Object.entries(ROUTES)
							.filter(([_, { nav }]) => nav === true)
							.map(
								([route, { name, label }]) => /*html*/ `
                                    <li id="nav-${name}" onclick="navigateToRoute('${route}')">
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
                                <li id="nav-${name}" onclick="navigateToRoute('/gomponents/component/${name}')">
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

export default Sidebar
