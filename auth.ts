import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import authConfig from './auth.config'
import db from './lib/db'
import { getUserById } from './data/user'
import { UserRole } from '@prisma/client'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  callbacks: {
    async signIn({ user }) {
      const existingUser = await getUserById(user.id!)

      if (!existingUser || !existingUser.emailVerified) {
        return false
      }

      return true
    },

    async session({ token, session }) {
      console.log({ sessionToken: token })

      if (token.sub && session.user) {
        session.user.role = token.role as UserRole
      }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token

      token.role = existingUser.role

      return token
    },
  },
  session: { strategy: 'jwt' },
  ...authConfig,
})
