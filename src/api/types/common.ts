import type { AxiosError } from 'axios'

// 通用API错误响应结构
export interface ApiErrorResponse {
  message: string
}

// 通用API错误类型
export type ApiError = AxiosError<ApiErrorResponse>
