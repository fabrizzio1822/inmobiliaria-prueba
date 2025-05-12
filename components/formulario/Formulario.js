export default function Formulario() {
  return (
    <div
      id="contacto"
      className="relative bg-cover bg-center min-h-screen flex items-center justify-center"
      style={{ backgroundImage: "url('/assets/formulario7.jpg')" }}
    >
      <div className="absolute inset-0 "></div>
      <form
        id="formulario"
        action="https://formsubmit.co/inmobiliaria.lbobadilla@gmail.com"
        method="POST"
        className="relative z-10 bg-transparent px-6 py-8 rounded-lg flex flex-col items-center max-w-xl w-full"
      >
        <h2 className="text-white text-center text-lg font-bold mb-2">Envíanos tu Consulta</h2>
        <p className="text-white text-center mb-6">
          Completá con tus consultas o comentarios y te responderé a la brevedad
        </p>

        <input
          className="w-full p-3 mb-4 rounded-md text-black placeholder-gray-500"
          type="text"
          id="name"
          name="name"
          placeholder="Nombre"
          required
        />
        <input
          className="w-full p-3 mb-4 rounded-md text-black placeholder-gray-500"
          type="email"
          id="email"
          name="email"
          placeholder="E-mail"
          required
        />
        <input
          className="w-full p-3 mb-4 rounded-md text-black placeholder-gray-500"
          type="text"
          id="numero"
          name="numero"
          placeholder="Número"
        />
        <textarea
          className="w-full p-3 mb-6 rounded-md text-black placeholder-gray-500"
          id="texto"
          name="texto"
          placeholder="Comentarios"
          rows={4}
        ></textarea>

        <input className="border-rounded px-5 rounded-lg py-4 text-white bg-main-100 hover:bg-main-200 pointer"
		type="submit" 
		value="Enviar"/>


        <input type="hidden" name="_next" value="https://www.marialaurabobadilla.com.ar/" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_subject" value="Inmobiliaria Bobadilla" />
      </form>
    </div>
  );
}
