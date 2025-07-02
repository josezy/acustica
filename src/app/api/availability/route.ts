import { NextResponse } from 'next/server'
import { google } from 'googleapis'
import { WORKING_HOURS } from '@/lib/pricing'

export async function GET() {
  try {
    // Use service account for accessing private calendar
    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: 'service_account',
        project_id: 'acustica-464717',
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
    })

    const calendar = google.calendar({ version: 'v3', auth })
    
    // Get events from today onwards
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    // Get events for the next 30 days
    const endDate = new Date(today)
    endDate.setDate(endDate.getDate() + 30)
    
    const response = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      timeMin: today.toISOString(),
      timeMax: endDate.toISOString(),
      maxResults: 100,
      singleEvents: true,
      orderBy: 'startTime',
    })
    
    const events = response.data.items || []
    
    // Return only the busy time slots (no sensitive data)
    const busySlots = events
      .filter(event => event.start?.dateTime && event.end?.dateTime)
      .map(event => ({
        start: event.start!.dateTime!,
        end: event.end!.dateTime!,
      }))
    
    return NextResponse.json({
      workingHours: WORKING_HOURS,
      busySlots,
    })
  } catch (error) {
    console.error('Error fetching availability:', error)
    
    // Log more details for debugging
    if (error && typeof error === 'object' && 'status' in error) {
      console.error('Calendar API Error Details:', {
        status: (error as unknown as { status: number }).status,
        message: (error as unknown as { message: string }).message,
        calendarId: process.env.GOOGLE_CALENDAR_ID,
        serviceAccountSet: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
      })
    }
    
    // Return working hours with demo busy slots for testing
    const now = new Date()
    const demoBusySlots = [
      // Tomorrow 2-4pm
      {
        start: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString().replace(/:\d{2}\.\d{3}Z$/, ':00:00Z').replace(/T\d{2}/, 'T14'),
        end: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString().replace(/:\d{2}\.\d{3}Z$/, ':00:00Z').replace(/T\d{2}/, 'T16'),
      },
      // Day after tomorrow 10-11am
      {
        start: new Date(now.getTime() + 48 * 60 * 60 * 1000).toISOString().replace(/:\d{2}\.\d{3}Z$/, ':00:00Z').replace(/T\d{2}/, 'T10'),
        end: new Date(now.getTime() + 48 * 60 * 60 * 1000).toISOString().replace(/:\d{2}\.\d{3}Z$/, ':00:00Z').replace(/T\d{2}/, 'T11'),
      }
    ]
    
    return NextResponse.json({
      workingHours: WORKING_HOURS,
      busySlots: demoBusySlots,
      error: 'Failed to fetch real calendar data, showing demo slots',
      calendarError: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}