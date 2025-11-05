import { axios } from '@/utils'

//登录
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

//发送验证码
export interface SendCodeRequest {
  email: string
}
export interface SendCodeResponse {
  success: boolean
  message: string
}

export const postSendCode = (
  request: SendCodeRequest
): Promise<SendCodeResponse> => {
  return axios.post('/auth/send-verification-code', request)
}
//注册
export interface RegisterRequest {
  email: string
  verificationCode: string
  password: string
}
export interface RegisterResponse {
  success: boolean
  message: string
}
export const postRegister = (
  request: RegisterRequest
): Promise<RegisterResponse> => {
  return axios.post('/auth/register-email', request)
}
