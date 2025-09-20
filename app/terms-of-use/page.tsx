import React from "react";

export default function TermsOfUse() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Términos de Uso</h1>
      <section className="mb-6">
        <p>
          Bienvenido a BYD Latam News. Al acceder y utilizar este sitio web, aceptas cumplir con los siguientes términos y condiciones:
        </p>
        <ul className="list-disc pl-6 mt-4">
          <li>El contenido publicado es únicamente informativo y no constituye asesoramiento oficial de BYD.</li>
          <li>Nos reservamos el derecho de modificar estos términos en cualquier momento sin previo aviso.</li>
          <li>El uso de la información es bajo tu propio riesgo.</li>
          <li>Está prohibido el uso indebido del sitio, incluyendo actividades fraudulentas o ilegales.</li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Propiedad Intelectual</h2>
        <p>
          Todo el contenido, incluyendo textos, imágenes y logotipos, es propiedad de sus respectivos dueños y se utiliza únicamente con fines informativos.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Privacidad</h2>
        <p>
          Consulta nuestra <a href="/privacy-policy" className="text-blue-600 underline">Política de Privacidad</a> para conocer cómo protegemos tus datos.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Descargo de Responsabilidad</h2>
        <p className="font-bold text-red-700">
          BYD Latam News no tiene ninguna relación con BYD y no es un canal, grupo ni sitio oficial de la marca. Toda la información publicada es independiente y no representa a BYD ni a sus filiales.
        </p>
      </section>
      <section>
        <p>
          Si tienes preguntas sobre estos términos, contáctanos a través de nuestro formulario de contacto.
        </p>
      </section>
    </main>
  );
}

