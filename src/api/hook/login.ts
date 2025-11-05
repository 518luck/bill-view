import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
} from '@tanstack/react-query'
import {
  postLogin,
  postRegister,
  postSendCode,
  type LoginRequest,
  type LoginResponse,
  type RegisterRequest,
  type RegisterResponse,
  type SendCodeRequest,
  type SendCodeResponse,
} from '@/api'
import { Toast } from 'antd-mobile'
import type { ApiError } from '@/api/types'

//登录
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

//发送验证码
export const useSendCodeMutation = (
  options?: UseMutationOptions<SendCodeResponse, ApiError, SendCodeRequest>
): UseMutationResult<SendCodeResponse, ApiError, SendCodeRequest> => {
  const { onSuccess, onError, ...restOptions } = options || {}
  return useMutation({
    mutationFn: (data) => postSendCode(data),
    onSuccess: (data, variables, context, mutation) => {
      Toast.show({ icon: 'success', content: data.message })
      onSuccess?.(data, variables, context, mutation)
    },
    onError: (error, variables, context, mutation) => {
      Toast.show({
        icon: 'fail',
        content: error?.message || '发送验证码失败',
      })
      onError?.(error, variables, context, mutation)
    },
    ...restOptions,
  })
}
//注册
export const useRegisterMutation = (
  options?: UseMutationOptions<RegisterResponse, ApiError, RegisterRequest>
): UseMutationResult<RegisterResponse, ApiError, RegisterRequest> => {
  const { onSuccess, onError, ...restOptions } = options || {}
  return useMutation({
    mutationFn: (data) => postRegister(data),
    onSuccess: (data, variables, context, mutation) => {
      Toast.show({ icon: 'success', content: data.message })
      onSuccess?.(data, variables, context, mutation)
    },
    onError: (error, variables, context, mutation) => {
      Toast.show({
        icon: 'fail',
        content: error?.message || '注册失败',
      })
      onError?.(error, variables, context, mutation)
    },
    ...restOptions,
  })
}
