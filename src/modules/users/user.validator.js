import { z } from 'zod'

const createUserSchema = z.object({
  nickName: z.string().min(3).max(20),
  name: z.string().min(3).max(100),
  password: z.string().min(6).max(100)
})

export const validateUser = (payload) => {
  const result = createUserSchema.safeParse(payload)

  if (!result.success) {
    throw new Error(result.error.issues[0].message)
  }

  return result.data
}

const updateUserSchema = z.object({
  nickName: z.string().min(3).max(20).optional(),
  name: z.string().min(3).max(100).optional(),
  password: z.string().min(6).max(100).optional()
})

export const validateUserUpdate = (payload) => {
  const result = updateUserSchema.safeParse(payload)
  if (!result.success) {
    throw new Error(result.error.issues[0].message)
  }
  return result.data
}

const loginUserSchema = z.object({
  nickName: z.string().min(3).max(20).trim().toLowerCase(),
  password: z.string().min(6).max(100)
})

export const validateLogin = (payload) => {
  const result = loginUserSchema.safeParse(payload)
  if (!result.success) {
    throw new Error(result.error.issues[0].message)
  }
  return result.data
}
