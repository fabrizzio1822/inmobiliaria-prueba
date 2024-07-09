export default function Formulario(){
    return (
        <div className="formulario" id="contacto">
				<form id='formulario' action="https://formsubmit.co/inmobiliaria.lbobadilla@gmail.com" method="post" onSubmit="return validateForm()">
					<h2 className="p-2 font-bold">Envíanos tu Consulta</h2>
					<p className="p-2">Completá con tus consultas o comentarios y te responderé a la brevedad</p>
					<input className="formulario-datos p-2 color-negro" type="text" id="name" name="name" placeholder="Nombre"/><br/>
					<input className="formulario-datos p-2 color-negro" type="email" id="email" name="email" placeholder="E-mail"/><br/>
					<input className="formulario-datos p-2 color-negro " type="numero" id="numero" name="numero" placeholder="Numero"/><br/>
					<textarea className="formulario-datos p-2 color-negro" id="texto" name="texto" placeholder="Comentarios"/><br/>
					<input className="border-rounded px-5 rounded-lg py-4 text-white bg-bordo hover:bg-black pointer" type="submit" value="Enviar"/>
				
					<input type="hidden" name="_next" value="https://www.marialaurabobadilla.com.ar/"/>
					<input type="hidden" name="_captcha" value="false"/>
					<input type="hidden" name="_subject" value="Inmobiliaria Bobadilla"/>
				</form>
				<img src="/assets/formulario7.jpg" alt="formulario"/>
			</div>
    )
}