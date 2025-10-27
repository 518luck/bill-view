import z from 'zod'

export const RequestSchema = z.object({
  //欠款方
  creditor: z.string(),
  //本月应还金额
  current_month_due: z.number(),
  //预计还清日期
  end_date: z.string(),
  //累计已还金额
  repaid_amount: z.number(),
  //欠款开始日期
  start_date: z.string(),
  //欠款总额度
  total_amount: z.number(),
})
export type Request = z.infer<typeof RequestSchema>
