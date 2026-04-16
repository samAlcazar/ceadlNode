import { z } from 'zod'

const createCommentSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(100),
  content: z.string().min(1),
  idPost: z.string().uuid(),
  isApproved: z.boolean().optional()
})

export const validateComment = (payload) => {
  const result = createCommentSchema.safeParse(payload)

  if (!result.success) {
    throw new Error(result.error.issues[0].message)
  }

  return result.data
}

const updateCommentSchema = z.object({
  isApproved: z.boolean()
}).strict()

export const validateCommentUpdate = (payload) => {
  const result = updateCommentSchema.safeParse(payload)

  if (!result.success) {
    throw new Error(result.error.issues[0].message)
  }

  return result.data
}
