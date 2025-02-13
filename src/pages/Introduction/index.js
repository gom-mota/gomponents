const Introduction = async () => {
	const render = () => {
		return /*html*/ `
		<div class='introduction-container'>
			<h1>Gomlib</h1>

			<p>Gomlib é uma biblioteca focada no uso de Web Components, uma tecnologia versátil no desenvolvimento web
			moderno. Nosso objetivo é oferecer elementos HTML personalizados que funcionem de forma consistente em
			diferentes ambientes e plataformas.</p>
			
			<h2>Por que a Gomlib foi criada?</h2>

			<p>A biblioteca nasceu do meu processo de aprendizado sobre Web Components. Ao explorar essa tecnologia,
			decidi disponibilizar os resultados online para que outras pessoas possam se inspirar.</p>
			
			<p>O foco do projeto é criar algo simples, flexível e intuitivo, permitindo a construção rápida de
			componentes personalizados. Este site serve como um ponto de partida para você explorar e testar os
			componentes, além de entender como essa tecnologia pode transformar a criação de interfaces web.</p>

			<p>Confira exemplos reais de sites criados com a biblioteca. Eles mostram como os Web Components podem ser
			aplicados em diferentes tipos de aplicações e como eles se comportam em ambientes de produção.</p>

			<h2>Gostou da ideia?</h2>

			<p>O site está hospedado sem custos no GitHub Pages. Se você deseja criar sua própria biblioteca ou
			reutilizar os componentes, o código está disponível em nosso repositório.</p>
		</div>
		`
	}

	return {
		title: 'Introduction',
		description: 'Introduction page',
		render,
		after_render: () => null,
	}
}

export default Introduction
