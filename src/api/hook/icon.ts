import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
} from '@tanstack/react-query'
import {
  createIcon,
  type createIconRequest,
  type createIconResponse,
} from '@/api'
import { Toast } from 'antd-mobile'
import type { ApiError } from '@/api/type'

export const useCreateIconMutation = (
  options?: UseMutationOptions<createIconResponse, ApiError, createIconRequest>
): UseMutationResult<createIconResponse, ApiError, createIconRequest> => {
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
        content: error?.message || '创建失败',
      })
      onError?.(error, variables, context, mutation)
    },
    ...restOptions,
  })
}
