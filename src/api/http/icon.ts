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

// 创建账单
export interface createTallyRequest {
  money: number
  note: string
  type: 'expense' | 'income'
  date: string
  icon_name: IconName
}
export interface createTallyResponse {
  message: string
}
export const createTally = (
  request: createTallyRequest
): Promise<createTallyResponse> => {
  return axios.post('/bills', request)
}

// 删除自定义的图标
export interface deleteIconRequest {
  id: string
}
export interface deleteIconResponse {
  success?: boolean
  statusCode?: number
  message: string
}
export const deleteIcon = (
  request: deleteIconRequest
): Promise<deleteIconResponse> => {
  return axios.delete(`/bills/icon/${request.id}`)
}
