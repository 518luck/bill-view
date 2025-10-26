import { axios } from '@/utils'

export type DebtStatus = 'owed' | 'paid'

export interface dabtsRespones {
  id: string // 主键id
  creditor: string // 欠款方（例如：京东白条）
  total_amount: string // 总欠款金额
  repaid_amount: string // 已还金额
  current_month_due: string // 本月应还金额
  start_date: string // 开始日期
  end_date: string // 结束日期
  status: DebtStatus // 状态：欠款中或已还清
}

export const getDabts = (): Promise<dabtsRespones[]> => {
  return axios.get('/debts')
}
