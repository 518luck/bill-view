import {
  queryOptions,
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
  getDebtPieChart,
  getDebtPieChartConfig,
  getDebts,
  repayPrepayment,
  updateDebt,
  updateDebtPieChart,
  type createDebtRequest,
  type createDebtResponse,
  type debtPieChartResponse,
  type debtsResponse,
  type deleteDebtResponse,
  type repayPrepaymentRequest,
  type repayPrepaymentResponse,
  type updateDebtPieChartRequest,
  type updateDebtPieChartResponse,
  type updateDebtRequest,
  type updateDebtResponse,
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
      queryClient.invalidateQueries({ queryKey: ['debtPieChart'] })

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
      queryClient.invalidateQueries({ queryKey: ['debtPieChart'] })

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

// 偿还债务
export const useRepayPrepayment = (
  options?: UseMutationOptions<
    repayPrepaymentResponse,
    ApiError,
    repayPrepaymentRequest
  >
): UseMutationResult<
  repayPrepaymentResponse,
  ApiError,
  repayPrepaymentRequest
> => {
  const queryClient = useQueryClient()

  const { onSuccess, onError, ...restOptions } = options || {}

  return useMutation({
    mutationFn: (request) => repayPrepayment(request),
    onSuccess: (data, variables, context, mutation) => {
      queryClient.invalidateQueries({ queryKey: ['debts'] })
      queryClient.invalidateQueries({ queryKey: ['debtPieChart'] })

      Toast.show({ icon: 'success', content: data.message || '偿还成功' })
      onSuccess?.(data, variables, context, mutation)
    },
    onError: (error, variables, context, mutation) => {
      Toast.show({
        icon: 'fail',
        content: error?.message || '偿还失败',
      })
      onError?.(error, variables, context, mutation)
    },
    ...restOptions,
  })
}

// 更新债务
export const useUpdateDebtMutation = (
  options?: UseMutationOptions<
    updateDebtResponse,
    ApiError,
    { id: string; request: updateDebtRequest }
  >
): UseMutationResult<
  updateDebtResponse,
  ApiError,
  { id: string; request: updateDebtRequest }
> => {
  const queryClient = useQueryClient()

  const { onSuccess, onError, ...restOptions } = options || {}

  return useMutation({
    mutationFn: ({ id, request }) => updateDebt(id, request),
    onSuccess: (data, variables, context, mutation) => {
      queryClient.invalidateQueries({ queryKey: ['debts'] })
      queryClient.invalidateQueries({ queryKey: ['debtPieChart'] })

      Toast.show({ icon: 'success', content: data.message || '更新成功' })
      onSuccess?.(data, variables, context, mutation)
    },
    onError: (error, variables, context, mutation) => {
      Toast.show({
        icon: 'fail',
        content: error?.message || '更新失败',
      })
      onError?.(error, variables, context, mutation)
    },
    ...restOptions,
  })
}

// 获取资产债务饼图数据
export const useGetDebtPieChart = (
  options?: UseQueryOptions<debtPieChartResponse, ApiError>
) => {
  return useQuery({
    queryKey: ['debtPieChart'],
    queryFn: () => getDebtPieChart(),
    ...options,
  })
}

// 修改资产债务饼图数据
export const useUpdateDebtPieChartMutation = (
  options?: UseMutationOptions<
    updateDebtPieChartResponse,
    ApiError,
    updateDebtPieChartRequest
  >
): UseMutationResult<
  updateDebtPieChartResponse,
  ApiError,
  updateDebtPieChartRequest
> => {
  const queryClient = useQueryClient()

  const { onSuccess, onError, ...restOptions } = options || {}

  return useMutation({
    mutationFn: (request) => updateDebtPieChart(request),
    onSuccess: (data, variables, context, mutation) => {
      queryClient.invalidateQueries({ queryKey: ['debtPieChart'] })

      Toast.show({ icon: 'success', content: data.message || '更新成功' })
      onSuccess?.(data, variables, context, mutation)
    },
    onError: (error, variables, context, mutation) => {
      Toast.show({
        icon: 'fail',
        content: error?.message || '更新失败',
      })
      onError?.(error, variables, context, mutation)
    },
    ...restOptions,
  })
}

// 获取资产债务配置信息
const debtPieChartConfigQuery = () =>
  queryOptions({
    queryKey: ['debtPieChartConfig'],
    queryFn: getDebtPieChartConfig,
  })

export const useGetDebtPieChartConfig = (options?: { enabled?: boolean }) => {
  return useQuery({
    ...debtPieChartConfigQuery(),
    ...options,
  })
}
