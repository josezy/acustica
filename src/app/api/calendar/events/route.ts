import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { CalendarService } from '@/lib/calendar'
import { authOptions } from '@/lib/auth'

export async function GET() {
  const session = await getServerSession(authOptions)
  
  if (!session?.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const calendarService = new CalendarService(session.accessToken)
    const events = await calendarService.getEvents()
    
    return NextResponse.json(events)
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session?.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const calendarService = new CalendarService(session.accessToken)
    const event = await calendarService.createEvent(body)
    
    return NextResponse.json(event)
  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 })
  }
}