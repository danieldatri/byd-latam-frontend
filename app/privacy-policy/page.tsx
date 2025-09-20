import React from "react";

export const metadata = {
  title: "Política de Privacidad - BYD Latam News",
  description: "Lee nuestra política de privacidad para conocer cómo protegemos tus datos en BYD Latam News.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Política de Privacidad</h1>
      <p className="text-base mb-6">
        En <strong>BYD Latam News</strong>, valoramos tu privacidad y nos comprometemos a proteger tus datos personales. Esta política explica cómo recopilamos, usamos y protegemos tu información cuando visitas nuestro sitio web.
      </p>
      <h2 className="text-xl font-semibold mt-8 mb-2">1. Información que recopilamos</h2>
      <ul className="list-disc list-inside mb-6">
        <li>Datos de navegación: como dirección IP, tipo de navegador y páginas visitadas.</li>
        <li>Información proporcionada voluntariamente: como tu correo electrónico si te suscribes a nuestro boletín.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2">2. Uso de la información</h2>
      <ul className="list-disc list-inside mb-6">
        <li>Mejorar la experiencia del usuario y el contenido del sitio.</li>
        <li>Enviar comunicaciones relacionadas con noticias y actualizaciones, si lo autorizas.</li>
        <li>Analizar el tráfico y uso del sitio mediante herramientas como Google Analytics.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2">3. Compartir información</h2>
      <p className="text-base mb-6">
        No compartimos tus datos personales con terceros, salvo en los casos necesarios para el funcionamiento del sitio (por ejemplo, servicios de análisis) o cuando lo exija la ley.
      </p>
      <h2 className="text-xl font-semibold mt-8 mb-2">4. Cookies</h2>
      <p className="text-base mb-6">
        Utilizamos cookies para mejorar tu experiencia y analizar el uso del sitio. Puedes configurar tu navegador para rechazar las cookies, aunque esto puede afectar el funcionamiento del sitio.
      </p>
      <h2 className="text-xl font-semibold mt-8 mb-2">5. Seguridad</h2>
      <p className="text-base mb-6">
        Implementamos medidas de seguridad para proteger tu información, aunque ningún sistema es completamente seguro.
      </p>
      <h2 className="text-xl font-semibold mt-8 mb-2">6. Derechos del usuario</h2>
      <p className="text-base mb-6">
        Puedes solicitar acceso, rectificación o eliminación de tus datos personales escribiéndonos a nuestro correo de contacto.
      </p>
      <h2 className="text-xl font-semibold mt-8 mb-2">7. Cambios en la política</h2>
      <p className="text-base mb-6">
        Esta política puede actualizarse ocasionalmente. Te recomendamos revisarla periódicamente.
      </p>
      <h2 className="text-xl font-semibold mt-8 mb-2">Contacto</h2>
      <p className="text-base mb-6">
        Si tienes preguntas sobre nuestra política de privacidad, contáctanos a: bydnewsletter@gmail.com
      </p>
    </main>
  );
}
