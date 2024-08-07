'use server'

import bcryptjs from 'bcryptjs'
import { registerSchema } from '@/schemas'
import * as z from 'zod'
import db from '@/lib/db'
import { getUserByEmail } from '@/data/user'

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(values)

  if (!validatedFields.success) return { error: 'Invalid fields!' }

  const { email, name, password } = validatedFields.data

  const hashedPassword = await bcryptjs.hash(password, 10)

  const existingUser = await getUserByEmail(email)

  if (existingUser) return { error: 'Email already in use!' }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  return { success: 'User created!' }
}
