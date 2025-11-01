import { axios } from '@/utils'

// 获取用户所有债务
export type DebtStatus = 'owed' | 'paid'
export interface debtsResponse {
  id: string // 主键id
  creditor: string // 欠款方（例如：京东白条）
  total_amount: string // 总欠款金额
  repaid_amount: string // 已还金额
  current_month_due: string // 本月应还金额
  start_date: string // 开始日期
  end_date: string // 结束日期
  status: DebtStatus // 状态：欠款中或已还清
}

export const getDebts = (): Promise<debtsResponse[]> => {
  return axios.get('/debts')
}

// 创建债务
export interface createDebtRequest {
  creditor: string // 欠款方（例如：京东白条）
  current_month_due: number // 本月应还金额
  end_date: string // 结束日期
  total_amount: number // 总欠款金额
  start_date: string // 开始日期
  repaid_amount: number // 已还金额
}
export interface createDebtResponse {
  success?: boolean
  statusCode?: number
  message: string
}
export const createDebt = (
  request: createDebtRequest
): Promise<createDebtResponse> => {
  return axios.post('/debts', request)
}

// 删除债务
export interface deleteDebtResponse {
  success?: boolean
  statusCode?: number
  message: string
}
export const deleteDebt = (id: string): Promise<deleteDebtResponse> => {
  return axios.delete(`/debts/${id}`)
}

// 偿还债务
export interface repayPrepaymentRequest {
  debt_id: string
  amount: number // 还款金额
  date: string // 还款日期
}
export interface repayPrepaymentResponse {
  success?: boolean
  statusCode?: number
  message: string
}
export const repayPrepayment = (
  request: repayPrepaymentRequest
): Promise<repayPrepaymentResponse> => {
  return axios.post(`/debts/repay`, request)
}

// 更新债务
export interface updateDebtRequest {
  creditor: string // 欠款方（例如：京东白条）
  current_month_due: number // 本月应还金额
  total_amount: number // 总欠款金额
  repaid_amount: number // 已还金额
}
export interface updateDebtResponse {
  success?: boolean
  statusCode?: number
  message: string
}
export const updateDebt = (
  id: string,
  request: updateDebtRequest
): Promise<updateDebtResponse> => {
  return axios.patch(`/debts/${id}`, request)
}

//获取资产债务饼图数据
export interface debtPieChartResponse {
  balance: number // 资产金额
  debt: number // 债务金额
  statusCode?: number
  message?: string
}
export const getDebtPieChart = (): Promise<debtPieChartResponse> => {
  return axios.get('/debts/asset-debt-pie')
}

//修改债务饼图数据
export interface updateDebtPieChartRequest {
  monthly_only: boolean // 选择当月还是全部负债进行核算
  include_bills: boolean // 是否让账单参与核算
  balance: number //是否有多的余额资产
}
export interface updateDebtPieChartResponse {
  success?: boolean
  statusCode?: number
  message?: string
}
export const updateDebtPieChart = (
  request: updateDebtPieChartRequest
): Promise<updateDebtPieChartResponse> => {
  return axios.post(`/debts/asset-debt-pie`, request)
}
