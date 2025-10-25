import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
} from '@tanstack/react-query'
import { postLogin, type LoginRequest, type LoginResponse } from '@/api'
import { Toast } from 'antd-mobile'
import type { ApiError } from '@/api/types'

export const useLoginMutation = (
  options?: UseMutationOptions<LoginResponse, ApiError, LoginRequest>
): UseMutationResult<LoginResponse, ApiError, LoginRequest> => {
  const { onSuccess, onError, ...restOptions } = options || {}
  return useMutation({
    mutationFn: (data) => postLogin(data),
    onSuccess: (data, variables, context, mutation) => {
      Toast.show({ icon: 'success', content: '登录成功' })
      onSuccess?.(data, variables, context, mutation)
    },
    onError: (error, variables, context, mutation) => {
      Toast.show({
        icon: 'fail',
        content: error?.message || '登录失败',
      })
      onError?.(error, variables, context, mutation)
    },
    ...restOptions,
  })
}
