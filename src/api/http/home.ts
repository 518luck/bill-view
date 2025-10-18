import { axios } from '@/utils'

type ApiResp<T> = { code: number; msg: string; data: T }
type Chart = { expend: [string, number][]; income: [string, number][] }

export const getChartData = (): Promise<ApiResp<Chart>> => {
  return axios.get('/mock/chart-data', { baseURL: '' })
}
