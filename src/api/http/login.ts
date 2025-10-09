import { axios } from '@/utils'

interface LoginResponse {
  code: number
  msg: string
  data: {
    token: string
  }
}
interface LoginParams {
  username: string
  password: string
}

export const postLogin = (params: LoginParams): Promise<LoginResponse> => {
  return axios.post('/auth/login', params)
}
