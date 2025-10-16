import { z } from 'zod'

export const currentIconTitleSchema = z.object({
  iconIndex: z.number(),
  title: z.string(),
})
