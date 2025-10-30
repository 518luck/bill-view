import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseMutationResult,
  type UseQueryOptions,
} from '@tanstack/react-query'

import {
  createDebt,
  deleteDebt,
  getDebts,
  type createDebtRequest,
  type createDebtResponse,
  type debtsResponse,
  type deleteDebtResponse,
} from '@/api'
import type { ApiError } from '@/api/types'
import { Toast } from 'antd-mobile'

// 获取用户所有债务
export const useGetDebts = (
  options?: UseQueryOptions<debtsResponse[], ApiError>
) => {
  return useQuery({
    queryKey: ['debts'],
    queryFn: () => getDebts(),
    ...options,
  })
}

// 创建债务
export const useCreateDebtMutation = (
  options?: UseMutationOptions<createDebtResponse, ApiError, createDebtRequest>
): UseMutationResult<createDebtResponse, ApiError, createDebtRequest> => {
  const queryClient = useQueryClient()

  const { onSuccess, onError, ...restOptions } = options || {}

  return useMutation({
    mutationFn: (request) => createDebt(request),
    onSuccess: (data, variables, context, mutation) => {
      queryClient.invalidateQueries({ queryKey: ['debts'] })

      Toast.show({ icon: 'success', content: data.message || '创建成功' })
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

// 删除债务
export const useDeleteDebtMutation = (
  options?: UseMutationOptions<deleteDebtResponse, ApiError, string>
): UseMutationResult<deleteDebtResponse, ApiError, string> => {
  const queryClient = useQueryClient()

  const { onSuccess, onError, ...restOptions } = options || {}

  return useMutation({
    mutationFn: (id) => deleteDebt(id),
    onSuccess: (data, variables, context, mutation) => {
      queryClient.invalidateQueries({ queryKey: ['debts'] })

      Toast.show({ icon: 'success', content: data.message || '删除成功' })
      onSuccess?.(data, variables, context, mutation)
    },
    onError: (error, variables, context, mutation) => {
      Toast.show({
        icon: 'fail',
        content: error?.message || '删除失败',
      })
      onError?.(error, variables, context, mutation)
    },
    ...restOptions,
  })
}
