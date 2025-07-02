# Room Reservations App

A Next.js application for managing room reservations with Google Calendar integration and restricted access.

## Features

- Google OAuth authentication with email restrictions
- Google Calendar integration for viewing and managing events
- Add, edit, and delete calendar events
- Protected routes with authentication middleware
- Responsive design with Tailwind CSS

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-generate-a-random-string
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALENDAR_ID=your-calendar-id
```

### 2. Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Calendar API and Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Configure the OAuth consent screen
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - `https://yourdomain.com/api/auth/callback/google` (for production)

### 3. Google Calendar Setup

1. Create a Google Calendar or use an existing one
2. Share the calendar with both authorized email addresses (`email1@example.com` and `email2@example.com`)
3. Copy the Calendar ID from the calendar settings
4. Add the Calendar ID to your `.env.local` file

### 4. Required Information for Calendar Integration

To complete the setup, you'll need:

- **Google Client ID**: From Google Cloud Console OAuth credentials
- **Google Client Secret**: From Google Cloud Console OAuth credentials  
- **Google Calendar ID**: From your Google Calendar settings (usually looks like: `abc123@group.calendar.google.com`)
- **NextAuth Secret**: Generate a random string for session encryption

### 5. Email Access Configuration

The app is configured to only allow access to:
- `email1@example.com`
- `email2@example.com`

To change these, edit the `ALLOWED_EMAILS` array in `src/app/api/auth/[...nextauth]/route.ts`.

## Installation

```bash
cd room-reservations
npm install
npm run dev
```

The application will be available at `http://localhost:3000`.

## Usage

1. Navigate to the application URL
2. Sign in with one of the authorized Google accounts
3. View existing reservations in the calendar
4. Click "New Reservation" to create a new event
5. Click on any existing reservation to edit or delete it

## File Structure

- `/src/app/api/auth/` - NextAuth configuration and routes
- `/src/app/api/calendar/` - Google Calendar API routes
- `/src/components/` - React components (Calendar, EventModal, Providers)
- `/src/lib/calendar.ts` - Google Calendar service class
- `/src/middleware.ts` - Authentication middleware
- `/src/types/next-auth.d.ts` - TypeScript declarations for NextAuth

## Security Notes

- Only specified email addresses can access the application
- All routes except authentication are protected by middleware
- Access tokens are securely managed through NextAuth
- Calendar operations require valid authentication