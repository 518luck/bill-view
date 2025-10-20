import { axios } from '@/utils'

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
  icon_name: string
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
