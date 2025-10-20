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
