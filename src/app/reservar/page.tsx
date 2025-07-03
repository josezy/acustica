'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { WORKING_HOURS, getPrice, formatPrice, isPrimeTime, type Duration, type GroupSize } from '@/lib/pricing'

interface BusySlot {
  start: string
  end: string
}

interface AvailabilityData {
  workingHours: typeof WORKING_HOURS
  busySlots: BusySlot[]
}

export default function ReservarPage() {
  const router = useRouter()
  const [availability, setAvailability] = useState<AvailabilityData | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow
  })
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [duration, setDuration] = useState<Duration>('1h')
  const [groupSize, setGroupSize] = useState<number>(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAvailability()
  }, [])

  // Reset selected time when duration changes to revalidate availability
  useEffect(() => {
    setSelectedTime('')
  }, [duration])

  const fetchAvailability = async () => {
    try {
      const response = await fetch('/api/availability')
      const data = await response.json()
      setAvailability(data)
    } catch (error) {
      console.error('Error fetching availability:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateTimeSlots = () => {
    const slots = []
    const { START, END } = WORKING_HOURS
    
    for (let hour = START; hour < END; hour++) {
      const timeString = `${hour.toString().padStart(2, '0')}:00`
      slots.push(timeString)
    }
    
    return slots
  }

  const isTimeSlotAvailable = (date: Date, time: string) => {
    if (!availability) return false
    
    const [hours, minutes] = time.split(':').map(Number)
    const slotStart = new Date(date)
    slotStart.setHours(hours, minutes, 0, 0)
    
    const slotEnd = new Date(slotStart)
    slotEnd.setHours(slotEnd.getHours() + (duration === '2h' ? 2 : 1))
    
    // Check if slot conflicts with any busy slots
    return !availability.busySlots.some(busySlot => {
      const busyStart = new Date(busySlot.start)
      const busyEnd = new Date(busySlot.end)
      
      return (slotStart < busyEnd && slotEnd > busyStart)
    })
  }

  const getGroupSizeCategory = (count: number): GroupSize => {
    if (count <= 3) return '1-3'
    if (count <= 5) return '4-5'
    return '6+'
  }

  const getCurrentPrice = () => {
    if (!selectedDate) return 0
    return getPrice(selectedDate, groupSize, duration)
  }

  const handleReservation = () => {
    if (!selectedDate || !selectedTime) {
      alert('Por favor selecciona una fecha y hora')
      return
    }
    
    const reservationData = {
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime,
      duration,
      groupSize,
      price: getCurrentPrice(),
    }
    
    // Store reservation data and redirect to checkout
    localStorage.setItem('pendingReservation', JSON.stringify(reservationData))
    router.push('/checkout')
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-CO', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const getDatesArray = () => {
    const dates = []
    const today = new Date()
    
    // Start from tomorrow (i = 1) to require at least 1 day advance booking
    for (let i = 1; i < 15; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push(date)
    }
    
    return dates
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando disponibilidad...</p>
        </div>
      </div>
    )
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
              href="/"
              className="text-gray-600 hover:text-gray-900"
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reservar Sala de Ensayo</h1>
          <p className="text-gray-600">Selecciona tu fecha, hora y duración preferida</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar and Time Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Date Selection */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Selecciona una fecha</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {getDatesArray().map((date) => (
                  <button
                    key={date.toISOString()}
                    onClick={() => setSelectedDate(date)}
                    className={`p-3 rounded-lg border-2 text-center transition-colors ${
                      selectedDate?.toDateString() === date.toDateString()
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-sm text-gray-600">
                      {date.toLocaleDateString('es-CO', { weekday: 'short' })}
                    </div>
                    <div className="font-semibold">
                      {date.getDate()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {date.toLocaleDateString('es-CO', { month: 'short' })}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            {selectedDate && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Horarios disponibles - {formatDate(selectedDate)}
                  {isPrimeTime(selectedDate) && (
                    <span className="ml-2 px-2 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">
                      Hora Prime
                    </span>
                  )}
                </h2>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {generateTimeSlots().map((time) => {
                    const available = isTimeSlotAvailable(selectedDate, time)
                    return (
                      <button
                        key={time}
                        onClick={() => available && setSelectedTime(time)}
                        disabled={!available}
                        className={`p-3 rounded-lg border-2 text-center transition-colors ${
                          selectedTime === time
                            ? 'border-orange-500 bg-orange-50'
                            : available
                            ? 'border-gray-200 hover:border-gray-300'
                            : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {time}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Pricing and Controls */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Detalles de la reserva</h2>
              
              {/* Duration Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duración
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setDuration('1h')}
                    className={`p-2 rounded border-2 ${
                      duration === '1h'
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200'
                    }`}
                  >
                    1 hora
                  </button>
                  <button
                    onClick={() => setDuration('2h')}
                    className={`p-2 rounded border-2 ${
                      duration === '2h'
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200'
                    }`}
                  >
                    2 horas
                  </button>
                </div>
              </div>

              {/* Group Size */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de músicos
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={groupSize}
                  onChange={(e) => setGroupSize(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Categoría: {getGroupSizeCategory(groupSize)} personas
                </p>
              </div>

              {/* Price Preview */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {formatPrice(getCurrentPrice())}
                  </div>
                  <div className="text-sm text-gray-600">
                    {duration} • {groupSize} músico{groupSize > 1 ? 's' : ''}
                  </div>
                  {selectedDate && (
                    <div className="text-xs text-gray-500 mt-1">
                      {isPrimeTime(selectedDate) ? 'Tarifa Prime' : 'Tarifa Regular'}
                    </div>
                  )}
                </div>
              </div>

              {/* Reserve Button */}
              <button
                onClick={handleReservation}
                disabled={!selectedDate || !selectedTime}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                  selectedDate && selectedTime
                    ? 'bg-orange-500 hover:bg-orange-600 text-white'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Continuar al pago
              </button>
            </div>

            {/* Pricing Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-3">Tarifas</h3>
              <div className="text-sm space-y-2">
                <div>
                  <div className="font-medium">Horas Regulares (Lun-Mié)</div>
                  <div className="text-gray-600 text-xs">
                    1-3 personas: $30k/h, $50k/2h<br/>
                    4-5 personas: $40k/h, $60k/2h<br/>
                    6+ personas: $50k/h, $70k/2h
                  </div>
                </div>
                <div>
                  <div className="font-medium">Horas Prime (Jue-Dom)</div>
                  <div className="text-gray-600 text-xs">
                    1-3 personas: $40k/h, $60k/2h<br/>
                    4-5 personas: $50k/h, $70k/2h<br/>
                    6+ personas: $55k/h, $80k/2h
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}