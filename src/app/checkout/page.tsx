'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { formatPrice } from '@/lib/pricing'

interface ReservationData {
  date: string
  time: string
  duration: string
  groupSize: number
  price: number
}

export default function CheckoutPage() {
  const [reservation, setReservation] = useState<ReservationData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const data = localStorage.getItem('pendingReservation')
    if (data) {
      setReservation(JSON.parse(data))
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  if (!reservation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No hay reserva pendiente</h1>
          <Link
            href="/reservar"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg"
          >
            Hacer una reserva
          </Link>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

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
              href="/reservar"
              className="text-gray-600 hover:text-gray-900"
            >
              ← Volver a reservar
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Finalizar Reserva</h1>
          <p className="text-gray-600">Revisa los detalles y procede con el pago</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Reservation Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Resumen de la reserva</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b">
                  <span className="text-gray-600">Fecha</span>
                  <span className="font-medium">{formatDate(reservation.date)}</span>
                </div>
                
                <div className="flex justify-between py-3 border-b">
                  <span className="text-gray-600">Hora</span>
                  <span className="font-medium">{reservation.time}</span>
                </div>
                
                <div className="flex justify-between py-3 border-b">
                  <span className="text-gray-600">Duración</span>
                  <span className="font-medium">
                    {reservation.duration === '1h' ? '1 hora' : '2 horas'}
                  </span>
                </div>
                
                <div className="flex justify-between py-3 border-b">
                  <span className="text-gray-600">Músicos</span>
                  <span className="font-medium">
                    {reservation.groupSize} persona{reservation.groupSize > 1 ? 's' : ''}
                  </span>
                </div>
                
                <div className="flex justify-between py-3 text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-orange-600">{formatPrice(reservation.price)}</span>
                </div>
              </div>
            </div>

            {/* Payment Section - Placeholder */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Información de pago</h2>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-center">
                <div className="text-orange-600 mb-4">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Integración de pagos en desarrollo
                </h3>
                <p className="text-gray-600 mb-4">
                  El sistema de pagos se integrará próximamente. 
                  Por ahora, contacta directamente para confirmar tu reserva.
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>WhatsApp:</strong> +57 300 123 4567</p>
                  <p><strong>Email:</strong> reservas@acusticasalaestudio.co</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Información de contacto</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-medium">Teléfono</div>
                  <div className="text-gray-600">+57 300 123 4567</div>
                </div>
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-gray-600">info@acusticasalaestudio.co</div>
                </div>
                <div>
                  <div className="font-medium">Dirección</div>
                  <div className="text-gray-600">
                    Calle 123 #45-67<br />
                    Bogotá, Colombia
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Políticas</h3>
              <div className="text-sm text-gray-600 space-y-2">
                <p>• Cancelaciones hasta 2 horas antes</p>
                <p>• Llegada puntual requerida</p>
                <p>• Equipo incluido en el precio</p>
                <p>• Prohibido fumar en las instalaciones</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}