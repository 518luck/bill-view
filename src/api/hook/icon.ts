import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
} from '@tanstack/react-query'
import { createIcon, type IconRequest, type IconResponse } from '@/api'
import { Toast } from 'antd-mobile'
import type { ApiError } from '@/api/type'

export const useCreateIconMutation = (
  options?: UseMutationOptions<IconResponse, ApiError, IconRequest>
): UseMutationResult<IconResponse, ApiError, IconRequest> => {
  const { onSuccess, onError, ...restOptions } = options || {}
  return useMutation({
    mutationFn: (data) => createIcon(data),
    onSuccess: (data, variables, context, mutation) => {
      Toast.show({ icon: 'success', content: '创建成功' })
      onSuccess?.(data, variables, context, mutation)
    },
    onError: (error, variables, context, mutation) => {
      Toast.show({
        icon: 'fail',
        content: error?.response?.data?.message || '创建失败',
      })
      onError?.(error, variables, context, mutation)
    },
    ...restOptions,
  })
}
