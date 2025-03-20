const Introduction = async () => {
	const render = () => {
		return /*html*/ `
		<div class='introduction-container'>
			<h1>Introdução</h1>
			
			<p>Gomlib é uma biblioteca focada no uso de Web Components, uma tecnologia versátil no desenvolvimento web
			moderno. O objetivo é oferecer elementos HTML personalizados, que funcionem de forma consistente em
			diferentes ambientes.</p>
			
			<h2>Como surgiu o projeto?</h2>

			<p>A biblioteca nasceu do meu processo de aprendizagem sobre Web Components. Ao explorar essa tecnologia,
			decidi disponibilizar os resultados online para utilização em outros projetos.</p>
			
			<p>O foco do projeto é criar algo simples, flexível e intuitivo, permitindo a construção rápida de
			componentes personalizados. Este site serve como um ponto de partida para você explorar e testar os
			componentes, além de entender como essa tecnologia pode transformar a criação de interfaces web.</p>

			<p>Abaixo, confira alguns exemplos de sites que utilizam a biblioteca. Eles mostram como os Web Components
			podem ser aplicados em diferentes tipos de aplicações e como eles se comportam em ambientes de produção.</p>

			<div class='website-examples-container'>
				<a href='https://www.gommota.com/' class='website-card-container' target='_blank'>
					<img src='https://www.gommota.com/favicon.ico'>
					<div>
						<span>gommota</span>
						<span class='website-description'>portfólio pessoal</span>
					</div>
					<ion-icon name="open-outline"></ion-icon>
				</a>
			</div>

			<h2>Gostou da ideia?</h2>

			<p>O site está hospedado sem custos no GitHub Pages. Se você deseja criar sua própria biblioteca ou
			reaproveitar o código de uma determinada parte, o código está disponível em nosso
			<a href='https://github.com/gom-mota/gomponents' target='_blank'>repositório</a>.</p>
		</div>
		`
	}

	return {
		title: 'Introduction',
		description: 'Introduction page',
		render,
		after_render: () => {
			hljs.highlightAll()
		},
	}
}

export default Introduction
