import { axios } from '@/utils'

export interface LoginResponse {
  id: number
  username: string
  token: string
}
export interface LoginParams {
  account: string
  password: string
}

export const postLogin = (params: LoginParams): Promise<LoginResponse> => {
  return axios.post('/auth/login', params)
}
