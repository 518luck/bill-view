import { z } from 'zod'
import { iconMap, type IconName } from '@/container/IconPicker/iconMap'

export const createIconSchema = z.object({
  icon_name: z.enum(Object.keys(iconMap) as [IconName, ...IconName[]]),
  title: z.string().min(1, '名称不能为空').max(4, '不超过4个汉字'),
})
