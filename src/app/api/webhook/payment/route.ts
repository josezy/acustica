import { NextRequest, NextResponse } from 'next/server'
import { CalendarService, type ReservationEvent } from '@/lib/calendar'
import { formatPrice } from '@/lib/pricing'

interface PaymentWebhookData {
  reservationId: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  date: string
  time: string
  duration: '1h' | '2h'
  groupSize: number
  price: number
  paymentStatus: 'completed' | 'failed'
  paymentId?: string
  paymentMethod?: string
}

export async function POST(request: NextRequest) {
  try {
    const data: PaymentWebhookData = await request.json()
    
    // Verify payment was successful
    if (data.paymentStatus !== 'completed') {
      return NextResponse.json({ 
        error: 'Payment not completed' 
      }, { status: 400 })
    }

    // Create calendar event
    const calendarService = new CalendarService()
    
    // Parse the reservation details
    const reservationDate = new Date(`${data.date}T${data.time}:00`)
    const endDate = new Date(reservationDate)
    endDate.setHours(endDate.getHours() + (data.duration === '2h' ? 2 : 1))
    
    const reservationEvent: ReservationEvent = {
      summary: `Reserva - ${data.customerName}`,
      description: `
Reserva confirmada para sala de ensayo

Cliente: ${data.customerName}
Email: ${data.customerEmail}
${data.customerPhone ? `Teléfono: ${data.customerPhone}\n` : ''}
Músicos: ${data.groupSize} persona${data.groupSize > 1 ? 's' : ''}
Duración: ${data.duration === '1h' ? '1 hora' : '2 horas'}
Precio: ${formatPrice(data.price)}

ID de pago: ${data.paymentId || 'N/A'}
Método: ${data.paymentMethod || 'N/A'}
      `.trim(),
      start: {
        dateTime: reservationDate.toISOString(),
        timeZone: 'America/Bogota'
      },
      end: {
        dateTime: endDate.toISOString(),
        timeZone: 'America/Bogota'
      }
    }

    const createdEvent = await calendarService.createReservation(reservationEvent)
    
    console.log('Reservation created:', {
      eventId: createdEvent.id,
      customer: data.customerName,
      date: data.date,
      time: data.time,
      paymentId: data.paymentId
    })

    return NextResponse.json({
      success: true,
      eventId: createdEvent.id,
      message: 'Reservation created successfully'
    })

  } catch (error) {
    console.error('Error processing payment webhook:', error)
    
    return NextResponse.json({
      error: 'Failed to process webhook',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({ 
    status: 'healthy',
    endpoint: 'payment-webhook',
    timestamp: new Date().toISOString()
  })
}