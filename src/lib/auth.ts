/* eslint-disable @typescript-eslint/no-explicit-any */
import GoogleProvider from 'next-auth/providers/google'

const ALLOWED_EMAILS = ['jose.zdy@gmail.com', 'jorgecaro00@gmail.com']

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'openid email profile https://www.googleapis.com/auth/calendar'
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }: any) {
      if (account?.provider === 'google') {
        return ALLOWED_EMAILS.includes(user.email || '')
      }
      return false
    },
    async jwt({ token, account }: any) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken as string
      return session
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error'
  }
}