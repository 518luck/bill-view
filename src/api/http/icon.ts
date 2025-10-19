import { axios } from '@/utils'
import type { IconName } from '@/container/IconPicker/iconMap'
//创建icon(购物,工资...)
export interface createIconRequest {
  type: 'expense' | 'income'
  title: string
  icon_name: IconName
}
export interface createIconResponse {
  message: string
}
export const createIcon = (
  request: createIconRequest
): Promise<createIconResponse> => {
  return axios.post('/bills/icon', request)
}

//获取Icon列表
export interface getIconListRequest {
  type: 'expense' | 'income'
}
export interface IconItem extends createIconRequest {
  id: string
}
export type IconListResponse = IconItem[]
export const getIconList = (
  request: getIconListRequest
): Promise<IconListResponse> => {
  return axios.get('/bills/icon', { params: request })
}
