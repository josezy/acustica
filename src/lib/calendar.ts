import { google } from 'googleapis'

export interface CalendarEvent {
  id: string
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
  creator?: {
    email: string
  }
}

export class CalendarService {
  private calendar: any

  constructor(accessToken: string) {
    const oauth2Client = new google.auth.OAuth2()
    oauth2Client.setCredentials({ access_token: accessToken })
    this.calendar = google.calendar({ version: 'v3', auth: oauth2Client })
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

      return response.data.items || []
    } catch (error) {
      console.error('Error fetching calendar events:', error)
      throw error
    }
  }

  async createEvent(event: Omit<CalendarEvent, 'id'>): Promise<CalendarEvent> {
    try {
      const response = await this.calendar.events.insert({
        calendarId: process.env.GOOGLE_CALENDAR_ID,
        resource: event,
      })

      return response.data
    } catch (error) {
      console.error('Error creating calendar event:', error)
      throw error
    }
  }

  async updateEvent(eventId: string, event: Partial<CalendarEvent>): Promise<CalendarEvent> {
    try {
      const response = await this.calendar.events.update({
        calendarId: process.env.GOOGLE_CALENDAR_ID,
        eventId,
        resource: event,
      })

      return response.data
    } catch (error) {
      console.error('Error updating calendar event:', error)
      throw error
    }
  }

  async deleteEvent(eventId: string): Promise<void> {
    try {
      await this.calendar.events.delete({
        calendarId: process.env.GOOGLE_CALENDAR_ID,
        eventId,
      })
    } catch (error) {
      console.error('Error deleting calendar event:', error)
      throw error
    }
  }
}