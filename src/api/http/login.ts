import { axios } from '@/utils'

export interface LoginResponse {
  id: number
  username: string
  role: string
  token: string
}
export interface LoginRequest {
  account: string
  password: string
}

export const postLogin = (request: LoginRequest): Promise<LoginResponse> => {
  return axios.post('/auth/login', request)
}
