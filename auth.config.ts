import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { loginSchema } from './schemas'
import { getUserByEmail } from './data/user'
import bcrypt from 'bcryptjs'
import github from 'next-auth/providers/github'
import google from 'next-auth/providers/google'

export default {
  providers: [
    github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        // Validate the credentials using the login schema
        const validatedFields = loginSchema.safeParse(credentials)
        if (validatedFields.success) {
          const { email, password } = validatedFields.data

          // Fetch the user by email
          const user = await getUserByEmail(email)

          // Check if user exists and has a password
          if (!user || !user.password) return null

          // Compare provided password with stored password
          const passwordMatch = await bcrypt.compare(password, user.password)
          if (passwordMatch) return user

          return null
        } else {
          // Handle the case where the credentials are invalid
          return null
        }
      },
    }),
  ],
} satisfies NextAuthConfig
