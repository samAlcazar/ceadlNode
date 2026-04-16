import { z } from 'zod'

const createSubscriberSchema = z.object({
  email: z.string().email().max(255),
  name: z.string().max(100).optional()
})

export const validateSubscriber = (payload) => {
  const result = createSubscriberSchema.safeParse(payload)

  if (!result.success) {
    throw new Error(result.error.issues[0].message)
  }

  return result.data
}
