import { z } from 'zod'

const createPostSchema = z.object({
  title: z.string().min(1).max(250),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  tags: z.array(z.string().min(1)).optional(),
  image: z.string().max(500).optional(),
  idUser: z.string().uuid()
})

export const validatePost = (payload) => {
  const result = createPostSchema.safeParse(payload)

  if (!result.success) {
    throw new Error(result.error.issues[0].message)
  }

  return result.data
}

const updatePostSchema = z.object({
  title: z.string().min(1).max(250).optional(),
  excerpt: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  tags: z.array(z.string().min(1)).optional(),
  image: z.string().max(500).optional(),
  idUser: z.string().uuid().optional()
})

export const validatePostUpdate = (payload) => {
  const result = updatePostSchema.safeParse(payload)

  if (!result.success) {
    throw new Error(result.error.issues[0].message)
  }

  return result.data
}
