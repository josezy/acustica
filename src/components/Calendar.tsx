'use client'

import { useState, useEffect } from 'react'
import { CalendarEvent } from '@/lib/calendar'

interface CalendarProps {
  onEventSelect?: (event: CalendarEvent) => void
}

export default function Calendar({ onEventSelect }: CalendarProps) {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/calendar/events')
      if (response.ok) {
        const data = await response.json()
        setEvents(data)
      }
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  if (loading) {
    return <div className="p-4">Loading calendar...</div>
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Room Reservations</h2>
      
      <div className="space-y-2">
        {events.length === 0 ? (
          <p className="text-gray-500">No reservations found</p>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => onEventSelect?.(event)}
            >
              <h3 className="font-semibold">{event.summary}</h3>
              {event.description && (
                <p className="text-gray-600 text-sm mt-1">{event.description}</p>
              )}
              <div className="text-sm text-gray-500 mt-2">
                <p>Start: {formatDate(event.start.dateTime)}</p>
                <p>End: {formatDate(event.end.dateTime)}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}