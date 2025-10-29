import { useQuery, type UseQueryOptions } from '@tanstack/react-query'

import { getDebts, type debtsResponse } from '@/api'
import type { ApiError } from '@/api/types'

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
