import Link from 'next/link'

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Acústica Sala Estudio
            </Link>
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900"
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Política de Privacidad</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-CO', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Información General</h2>
              <p className="text-gray-700 mb-4">
                Acústica Sala Estudio, ubicada en CARRERA 47 49 26, se compromete a proteger la privacidad 
                y los datos personales de nuestros usuarios. Esta política de privacidad explica cómo 
                recopilamos, usamos y protegemos su información personal cuando utiliza nuestros servicios 
                de reserva de sala de ensayo.
              </p>
              <p className="text-gray-700">
                Para cualquier consulta relacionada con esta política, puede contactarnos en: 
                <a href="mailto:contacto@acusticasalaestudio.co" className="text-orange-600 hover:text-orange-700"> 
                  contacto@acusticasalaestudio.co
                </a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Información que Recopilamos</h2>
              <p className="text-gray-700 mb-4">Recopilamos únicamente la información necesaria para procesar su reserva:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Información de reserva:</strong> Fecha, hora, duración y número de músicos</li>
                <li><strong>Información de pago:</strong> Datos necesarios para procesar el pago de su reserva</li>
                <li><strong>Información técnica:</strong> Dirección IP y datos de navegación para el funcionamiento del sitio web</li>
              </ul>
              <p className="text-gray-700 mt-4">
                <strong>No recopilamos:</strong> nombres, números de teléfono, direcciones de email personales, 
                ni ningún otro dato personal identificable más allá de lo estrictamente necesario para la reserva.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Uso de la Información</h2>
              <p className="text-gray-700 mb-4">Utilizamos su información únicamente para:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Procesar y confirmar sus reservas de sala de ensayo</li>
                <li>Gestionar los horarios de disponibilidad</li>
                <li>Procesar pagos y emitir confirmaciones</li>
                <li>Mantener el funcionamiento técnico del sitio web</li>
              </ul>
              <p className="text-gray-700 mt-4">
                <strong>No utilizamos su información para:</strong> marketing, publicidad, envío de correos 
                promocionales, o cualquier otra actividad comercial no relacionada directamente con su reserva.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Servicios de Terceros</h2>
              <p className="text-gray-700 mb-4">
                Utilizamos servicios de terceros para el funcionamiento de nuestra plataforma:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Google Calendar:</strong> Para gestionar la disponibilidad y programación de reservas</li>
                <li><strong>Procesadores de pago:</strong> Para procesar pagos de forma segura</li>
                <li><strong>Vercel:</strong> Para el alojamiento del sitio web</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Estos servicios tienen sus propias políticas de privacidad y están sujetos a sus términos de uso.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Cookies y Tecnologías de Seguimiento</h2>
              <p className="text-gray-700 mb-4">
                Nuestro sitio web utiliza únicamente las cookies técnicas necesarias para su funcionamiento. 
                No utilizamos cookies de seguimiento, analíticas o publicitarias.
              </p>
              <p className="text-gray-700">
                Las cookies técnicas nos permiten mantener su sesión de reserva y garantizar el correcto 
                funcionamiento del sistema de pagos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Seguridad de los Datos</h2>
              <p className="text-gray-700 mb-4">
                Implementamos medidas de seguridad técnicas y organizacionales apropiadas para proteger 
                su información personal contra acceso no autorizado, alteración, divulgación o destrucción.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Conexiones seguras (HTTPS) en todo el sitio web</li>
                <li>Encriptación de datos sensibles</li>
                <li>Acceso restringido a la información personal</li>
                <li>Auditorías regulares de seguridad</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Sus Derechos</h2>
              <p className="text-gray-700 mb-4">
                De acuerdo con la Ley 1581 de 2012 y sus decretos reglamentarios, usted tiene derecho a:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Conocer, actualizar y rectificar sus datos personales</li>
                <li>Solicitar prueba de la autorización otorgada</li>
                <li>Ser informado sobre el uso que se ha dado a sus datos personales</li>
                <li>Presentar quejas ante la Superintendencia de Industria y Comercio</li>
                <li>Revocar la autorización y/o solicitar la supresión de los datos</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Para ejercer estos derechos, contáctenos en: 
                <a href="mailto:contacto@acusticasalaestudio.co" className="text-orange-600 hover:text-orange-700">
                  contacto@acusticasalaestudio.co
                </a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Retención de Datos</h2>
              <p className="text-gray-700">
                Conservamos su información de reserva únicamente durante el tiempo necesario para cumplir 
                con los fines para los cuales fue recopilada y de acuerdo con las obligaciones legales 
                aplicables. Los datos de pago se eliminan inmediatamente después de procesada la transacción.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Menores de Edad</h2>
              <p className="text-gray-700">
                Nuestros servicios están dirigidos a personas mayores de edad. No recopilamos 
                conscientemente información personal de menores de 18 años sin el consentimiento 
                de sus padres o representantes legales.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Modificaciones a esta Política</h2>
              <p className="text-gray-700">
                Nos reservamos el derecho de actualizar esta política de privacidad ocasionalmente. 
                Cualquier cambio será publicado en esta página con la fecha de actualización correspondiente. 
                Le recomendamos revisar esta política periódicamente.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contacto</h2>
              <p className="text-gray-700">
                Si tiene preguntas sobre esta política de privacidad o sobre el tratamiento de sus datos personales, 
                puede contactarnos:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <p className="text-gray-700"><strong>Acústica Sala Estudio</strong></p>
                <p className="text-gray-700">CARRERA 47 49 26</p>
                <p className="text-gray-700">
                  Email: <a href="mailto:contacto@acusticasalaestudio.co" className="text-orange-600 hover:text-orange-700">
                    contacto@acusticasalaestudio.co
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}