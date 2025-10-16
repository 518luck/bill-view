import { z } from 'zod'

export const currentIconTitleSchema = z.object({
  iconIndex: z.string(),
  title: z.string(),
})
