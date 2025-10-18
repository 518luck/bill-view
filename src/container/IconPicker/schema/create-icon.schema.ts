import { z } from 'zod'

export const createIconSchema = z.object({
  icon_name: z.string(),
  title: z.string().min(1, '名称不能为空').max(4, '不超过4个汉字'),
})
