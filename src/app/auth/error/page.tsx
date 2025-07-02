'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-red-600">Access Denied</h2>
          <p className="mt-2 text-gray-600">
            You are not authorized to access this application.
          </p>
          {error && (
            <p className="mt-2 text-sm text-gray-500">Error: {error}</p>
          )}
        </div>
        <Link
          href="/auth/signin"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Try Again
        </Link>
      </div>
    </div>
  )
}