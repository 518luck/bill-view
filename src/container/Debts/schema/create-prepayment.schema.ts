import z from 'zod'

export const RequestSchema = z.object({
  //欠款方
  creditor: z.string().min(1, '请输入欠款方'),
  //本月应还金额
  current_month_due: z.number().min(0, '请输入本月应还金额'),
  //预计还清日期
  end_date: z.string().min(1, '请选择预计还清日期'),
  //累计已还金额
  repaid_amount: z.number().min(0, '请输入累计已还金额'),
  //欠款开始日期
  start_date: z.string().min(1, '请选择欠款开始日期'),
  //欠款总额度
  total_amount: z.number().min(0, '请输入欠款总额度'),
})
export type Request = z.infer<typeof RequestSchema>
