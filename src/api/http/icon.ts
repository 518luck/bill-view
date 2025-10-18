import { axios } from '@/utils'

export interface IconRequest {
  type: 'expense' | 'income'
  title: string
  icon_name: string
}

export interface IconResponse {
  message: string
}

//创建分类(购物,工资...)
export const createIcon = (request: IconRequest): Promise<IconResponse> => {
  return axios.post('/bills/icon', request)
}
