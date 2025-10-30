import z from 'zod'

export const RepayPrepaymentSchema = z.object({
  //还款金额
  amount: z.number().min(0, '请输入还款金额'),
  //还款日期
  date: z.string().min(1, '请选择预计还清日期'),
})
export type RepayPrepaymentRequest = z.infer<typeof RepayPrepaymentSchema>
