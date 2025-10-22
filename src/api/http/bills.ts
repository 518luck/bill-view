import { axios } from '@/utils'
import type { IconName } from '@/container/IconPicker/iconMap'
// 获取某年某月的账单
export interface monthBillsRequest {
  date_str: string
  payday?: number
}
export interface bills {
  id: string
  money: string
  note: string
  type: 'expense' | 'income'
  icon_name: IconName
  date: string
}
export interface monthBillsResponse {
  day: string
  bills: bills[]
}
export const getMonthBills = (
  params: monthBillsRequest
): Promise<monthBillsResponse[]> => {
  return axios.get('/bills/month', { params })
}

// 删除账单
export interface deleteBillRequest {
  id: string
}
export interface deleteBillResponse {
  success?: boolean
  statusCode?: number
  message: string
}
export const deleteBill = (
  id: deleteBillRequest
): Promise<deleteBillResponse> => {
  return axios.delete(`/bills/${id}`)
}
