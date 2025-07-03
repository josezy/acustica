import Link from 'next/link'

export default function CondicionesPage() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Términos y Condiciones de Servicio</h1>
          
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
                Bienvenido a Acústica Sala Estudio. Estos términos y condiciones rigen el uso de nuestros 
                servicios de alquiler de sala de ensayo musical ubicada en CARRERA 47 49 26. Al realizar 
                una reserva, usted acepta estos términos en su totalidad.
              </p>
              <p className="text-gray-700">
                Para cualquier consulta, puede contactarnos en: 
                <a href="mailto:contacto@acusticasalaestudio.co" className="text-orange-600 hover:text-orange-700">
                  contacto@acusticasalaestudio.co
                </a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Servicios Ofrecidos</h2>
              <p className="text-gray-700 mb-4">Acústica Sala Estudio ofrece:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Alquiler de sala de ensayo musical por horas</li>
                <li>Equipamiento profesional incluido (amplificadores, batería, micrófonos)</li>
                <li>Horarios de operación: 10:00 AM a 10:00 PM, todos los días</li>
                <li>Sesiones de 1 o 2 horas de duración</li>
                <li>Capacidad para grupos de 1 a 10+ músicos</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Reservas y Disponibilidad</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">3.1 Proceso de Reserva</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Las reservas deben realizarse con <strong>mínimo 1 día de anticipación</strong></li>
                    <li>No se aceptan reservas para el mismo día</li>
                    <li>La reserva se confirma únicamente tras el pago completo</li>
                    <li>Recibirá una confirmación con los detalles de su reserva</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">3.2 Disponibilidad</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Los horarios se muestran en tiempo real en nuestro sistema</li>
                    <li>Los espacios ocupados aparecen bloqueados</li>
                    <li>Nos reservamos el derecho de modificar horarios por mantenimiento con aviso previo</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Tarifas y Métodos de Pago</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">4.1 Estructura de Precios</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold text-gray-900 mb-2">Horas Regulares (Lunes a Miércoles)</p>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• 1-3 músicos: $30,000/hora, $50,000/2 horas</li>
                      <li>• 4-5 músicos: $40,000/hora, $60,000/2 horas</li>
                      <li>• 6+ músicos: $50,000/hora, $70,000/2 horas</li>
                    </ul>
                    
                    <p className="font-semibold text-gray-900 mb-2 mt-4">Horas Prime (Jueves a Domingo)</p>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• 1-3 músicos: $40,000/hora, $60,000/2 horas</li>
                      <li>• 4-5 músicos: $50,000/hora, $70,000/2 horas</li>
                      <li>• 6+ músicos: $55,000/hora, $80,000/2 horas</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">4.2 Métodos de Pago</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Efectivo (pago en el lugar)</li>
                    <li>Transferencia bancaria</li>
                    <li>El pago debe realizarse en su totalidad para confirmar la reserva</li>
                    <li>No se aceptan pagos parciales</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">4.3 Tarifas Adicionales</h3>
                  <p className="text-gray-700">
                    No aplicamos tarifas de limpieza, depósitos o cargos adicionales. 
                    El precio mostrado en su reserva es el precio final.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Políticas de Cancelación y Reprogramación</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">5.1 Cancelaciones</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Las cancelaciones deben realizarse con <strong>mínimo 2 horas de anticipación</strong></li>
                    <li><strong>No se otorgan reembolsos</strong> por cancelaciones</li>
                    <li>En caso de cancelación con aviso de 2+ horas, puede <strong>reprogramar su reserva</strong> sin costo adicional</li>
                    <li>Cancelaciones con menos de 2 horas de anticipación resultan en pérdida total del pago</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">5.2 Reprogramación</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Puede reprogramar su reserva sin costo si cancela con 2+ horas de anticipación</li>
                    <li>La nueva fecha debe estar disponible en nuestro calendario</li>
                    <li>Si el nuevo horario tiene tarifa diferente, deberá pagar la diferencia</li>
                    <li>El crédito de reprogramación tiene validez de 30 días</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">5.3 Reembolsos</h3>
                  <p className="text-gray-700">
                    <strong>No otorgamos reembolsos</strong> excepto en circunstancias excepcionales 
                    que sean acordadas mutuamente entre el cliente y Acústica Sala Estudio.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Uso de las Instalaciones y Equipos</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">6.1 Normas de Uso</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Llegue puntualmente a su hora reservada</li>
                    <li>Respete los horarios de otros usuarios</li>
                    <li>Use el equipamiento de manera responsable y apropiada</li>
                    <li>Mantenga un volumen razonable respetando a los vecinos</li>
                    <li>No está permitido fumar dentro de las instalaciones</li>
                    <li>No está permitido el consumo de alcohol o sustancias psicoactivas</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">6.2 Equipamiento Incluido</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Batería completa</li>
                    <li>Amplificadores para guitarra y bajo</li>
                    <li>Micrófonos y sistema de sonido</li>
                    <li>Cables y accesorios básicos</li>
                  </ul>
                  <p className="text-gray-700 mt-2">
                    <strong>Nota:</strong> Traiga sus propios instrumentos (guitarra, bajo, baquetas, etc.)
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">6.3 Daños al Equipamiento</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>El usuario es responsable de cualquier daño causado al equipamiento durante su sesión</li>
                    <li>Los daños deben ser <strong>pagados en su totalidad</strong> por el usuario responsable</li>
                    <li>El costo de reparación o reemplazo será valorado por un técnico especializado</li>
                    <li>Reporte inmediatamente cualquier mal funcionamiento del equipo</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Responsabilidades y Limitaciones</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">7.1 Responsabilidad del Usuario</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Usar las instalaciones y equipos de manera responsable</li>
                    <li>Reportar cualquier problema o daño inmediatamente</li>
                    <li>Cumplir con todas las normas establecidas</li>
                    <li>Respetar a otros usuarios y al personal del estudio</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">7.2 Limitación de Responsabilidad</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Acústica Sala Estudio no se hace responsable por instrumentos o pertenencias personales</li>
                    <li>No nos hacemos responsables por lesiones causadas por mal uso del equipamiento</li>
                    <li>Nuestra responsabilidad se limita al monto pagado por la reserva</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">7.3 Fuerza Mayor</h3>
                  <p className="text-gray-700">
                    No seremos responsables por incumplimientos debidos a circunstancias fuera de nuestro 
                    control (desastres naturales, cortes de energía, etc.). En estos casos, reprogramaremos 
                    su sesión sin costo adicional.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Política de Edad y Supervisión</h2>
              <p className="text-gray-700">
                No tenemos restricciones de edad específicas. Sin embargo, menores de 18 años deben 
                estar acompañados por un adulto responsable quien acepta estos términos y se hace 
                responsable por cualquier daño.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Modificaciones de Servicio</h2>
              <p className="text-gray-700 mb-4">
                Nos reservamos el derecho de:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Modificar horarios por mantenimiento con aviso previo de 24 horas</li>
                <li>Actualizar precios con aviso de 15 días</li>
                <li>Mejorar o cambiar equipamiento</li>
                <li>Modificar estos términos y condiciones</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Terminación del Servicio</h2>
              <p className="text-gray-700 mb-4">
                Nos reservamos el derecho de terminar el servicio y solicitar que abandone las 
                instalaciones en los siguientes casos:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Violación de estas normas</li>
                <li>Comportamiento inapropiado o agresivo</li>
                <li>Daño intencional al equipamiento</li>
                <li>Perturbación a otros usuarios</li>
              </ul>
              <p className="text-gray-700 mt-4">
                En estos casos, no se otorgará reembolso alguno.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Resolución de Disputas</h2>
              <p className="text-gray-700 mb-4">
                Cualquier disputa será resuelta mediante diálogo directo. Si esto no es posible, 
                se someterá a la jurisdicción de los tribunales competentes de Colombia, 
                aplicando la legislación colombiana vigente.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Aceptación de Términos</h2>
              <p className="text-gray-700">
                Al realizar una reserva, usted confirma que ha leído, comprendido y acepta 
                estos términos y condiciones en su totalidad. Si no está de acuerdo con 
                algún término, por favor no utilice nuestros servicios.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contacto</h2>
              <p className="text-gray-700">
                Para preguntas sobre estos términos y condiciones:
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