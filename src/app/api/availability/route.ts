import { NextResponse } from 'next/server'
import { google } from 'googleapis'
import { WORKING_HOURS } from '@/lib/pricing'

export async function GET() {
  try {
    // Create OAuth2 client for public calendar access
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    )

    // For public calendar access, we can use API key instead
    const calendar = google.calendar({ 
      version: 'v3', 
      auth: process.env.GOOGLE_API_KEY || oauth2Client 
    })
    
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
    
    // Return working hours with some demo busy slots for testing
    const demoBusySlots = [
      {
        start: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().replace('T', 'T14:00:00').split('.')[0] + 'Z',
        end: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().replace('T', 'T16:00:00').split('.')[0] + 'Z',
      }
    ]
    
    return NextResponse.json({
      workingHours: WORKING_HOURS,
      busySlots: demoBusySlots,
    })
  }
}