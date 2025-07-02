import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware() {
    // Additional middleware logic can be added here
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: [
    '/((?!api/auth|api/availability|auth|reservar|checkout|_next/static|_next/image|favicon.ico).*)',
  ],
}