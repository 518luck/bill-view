import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
} from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { postLogin, type LoginParams, type LoginResponse } from '@/api'
import { Toast } from 'antd-mobile'

// 定义后端错误响应结构
interface LoginErrorResponse {
  message: string
}

export const useLoginMutation = (
  options?: UseMutationOptions<
    LoginResponse,
    AxiosError<LoginErrorResponse>,
    LoginParams
  >
): UseMutationResult<
  LoginResponse,
  AxiosError<LoginErrorResponse>,
  LoginParams
> => {
  const { onSuccess, onError, ...restOptions } = options || {}
  return useMutation({
    mutationFn: (data: LoginParams) => postLogin(data),
    onSuccess: (responseData, variables, context) => {
      Toast.show({ icon: 'success', content: '登录成功' })
      onSuccess?.(responseData, variables, context)
    },
    onError: (error, variables, context) => {
      Toast.show({
        icon: 'fail',
        content: error?.response?.data?.message || '登录失败',
      })
      onError?.(error, variables, context)
    },
    ...restOptions,
  })
}
