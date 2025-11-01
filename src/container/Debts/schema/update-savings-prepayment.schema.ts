import z from 'zod'

export const UpdateSavingsPrepaymentSchema = z.object({
  //选择当月还是全部负债进行核算
  monthly_only: z.boolean(),
  //是否让账单参与核算
  include_bills: z.boolean(),
  //余额
  balance: z.number().min(0, '请输入余额'),
})

export type UpdateSavingsPrepaymentRequest = z.infer<
  typeof UpdateSavingsPrepaymentSchema
>
