import z from 'zod'

export const EditPrepaymentSchema = z.object({
  //欠款方
  creditor: z.string().min(1, '请输入欠款方'),
  //本月应还金额
  current_month_due: z.number().min(0, '请输入本月应还金额'),
  //累计已还金额
  repaid_amount: z.number().min(0, '请输入累计已还金额'),
  //欠款总额度
  total_amount: z.number().min(0, '请输入欠款总额度'),
})
export type EditPrepaymentRequest = z.infer<typeof EditPrepaymentSchema>
