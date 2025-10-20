import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import {
  getMonthBills,
  type monthBillsRequest,
  type monthBillsResponse,
} from '@/api'
import type { ApiError } from '@/api/types'

//获取某年某月的账单
export const useGetMonthBills = (
  request: monthBillsRequest,
  options?: UseQueryOptions<monthBillsResponse, ApiError>
) => {
  const { ...restOptions } = options || {}

  return useQuery({
    queryKey: ['monthBills', request],
    queryFn: () => getMonthBills(request),
    ...restOptions,
  })
}
