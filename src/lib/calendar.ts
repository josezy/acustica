import { google } from 'googleapis'

export interface CalendarEvent {
  id: string
  summary: string
  description?: string
  start: {
    dateTime: string
    timeZone?: string
  }
  end: {
    dateTime: string
    timeZone?: string
  }
  creator?: {
    email: string
  }
}

export interface ReservationEvent {
  summary: string
  description?: string
  start: {
    dateTime: string
    timeZone: string
  }
  end: {
    dateTime: string
    timeZone: string
  }
}

export class CalendarService {
  private calendar: ReturnType<typeof google.calendar>

  constructor() {
    // Use service account for accessing private calendar
    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: 'service_account',
        project_id: 'acustica-464717',
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/calendar'],
    })

    this.calendar = google.calendar({ version: 'v3', auth })
  }

  async createReservation(reservationData: ReservationEvent): Promise<CalendarEvent> {
    try {
      const response = await this.calendar.events.insert({
        calendarId: process.env.GOOGLE_CALENDAR_ID,
        requestBody: reservationData,
      })

      return response.data as CalendarEvent
    } catch (error) {
      console.error('Error creating reservation:', error)
      throw error
    }
  }

  async getEvents(startDate?: Date, endDate?: Date): Promise<CalendarEvent[]> {
    try {
      const response = await this.calendar.events.list({
        calendarId: process.env.GOOGLE_CALENDAR_ID,
        timeMin: startDate?.toISOString() || new Date().toISOString(),
        timeMax: endDate?.toISOString(),
        maxResults: 100,
        singleEvents: true,
        orderBy: 'startTime',
      })

      const items = response.data.items || []
      return items.filter((item): item is CalendarEvent => 
        item.id != null && 
        item.summary != null && 
        item.start?.dateTime != null && 
        item.end?.dateTime != null
      ) as CalendarEvent[]
    } catch (error) {
      console.error('Error fetching calendar events:', error)
      throw error
    }
  }
}