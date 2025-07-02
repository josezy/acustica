import { NextResponse } from 'next/server'

// Test endpoint to simulate payment webhook
export async function POST() {
  try {
    const testData = {
      reservationId: 'test-' + Date.now(),
      customerName: 'Juan Pérez',
      customerEmail: 'juan@example.com',
      customerPhone: '+57 300 123 4567',
      date: '2024-12-10',
      time: '14:00',
      duration: '2h' as const,
      groupSize: 4,
      price: 70000,
      paymentStatus: 'completed' as const,
      paymentId: 'pay_test_123456',
      paymentMethod: 'credit_card'
    }

    // Call the actual webhook
    const webhookResponse = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/webhook/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    })

    const result = await webhookResponse.json()

    return NextResponse.json({
      message: 'Test webhook executed',
      testData,
      webhookResult: result,
      webhookStatus: webhookResponse.status
    })

  } catch (error) {
    console.error('Test webhook error:', error)
    return NextResponse.json({
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Test webhook endpoint ready',
    usage: 'POST to this endpoint to test the payment webhook integration'
  })
}