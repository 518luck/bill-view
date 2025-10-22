import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseMutationResult,
  type UseQueryOptions,
} from '@tanstack/react-query'
import {
  deleteBill,
  getMonthBills,
  type deleteBillRequest,
  type deleteBillResponse,
  type monthBillsRequest,
  type monthBillsResponse,
} from '@/api'
import type { ApiError } from '@/api/types'
import { Toast } from 'antd-mobile'

//获取某年某月的账单
export const useGetMonthBills = (
  request: monthBillsRequest,
  options?: UseQueryOptions<monthBillsResponse[], ApiError>
) => {
  const { ...restOptions } = options || {}

  return useQuery({
    queryKey: ['monthBills', request],
    queryFn: () => getMonthBills(request),
    ...restOptions,
  })
}

// 删除账单
export const useDeleteBill = (
  options?: UseMutationOptions<deleteBillResponse, ApiError, deleteBillRequest>
): UseMutationResult<deleteBillResponse, ApiError, deleteBillRequest> => {
  const queryClient = useQueryClient()

  const { onSuccess, onError, ...restOptions } = options || {}

  return useMutation({
    mutationFn: (id) => deleteBill(id),
    onSuccess: (data, variables, context, mutation) => {
      queryClient.invalidateQueries({ queryKey: ['monthBills'] })

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
