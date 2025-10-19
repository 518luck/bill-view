import z from 'zod'
import { iconMap, type IconName } from '@/container/IconPicker/iconMap'
/**
 * 变量
 * 1. id:这个不需要传递
 * 2. money:消费的金额
 * 3. note:备注
 * 4. type:账单类型 消费/收入
 * 5. date:账单日期
 * 6. icon_name:图标名称
 */
export const createTallySchema = z.object({
  money: z.number().min(0, '金额不能小于0'),
  note: z.string(),
  type: z.enum(['expense', 'income']),
  date: z.string(),
  icon_name: z.enum(Object.keys(iconMap) as [IconName, ...IconName[]]),
})
