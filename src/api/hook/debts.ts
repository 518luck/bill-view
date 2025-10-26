import { useQuery, type UseQueryOptions } from '@tanstack/react-query'

import { getDebts, type debtsRespones } from '@/api'
import type { ApiError } from '@/api/types'

export const useGetDebts = (
  options?: UseQueryOptions<debtsRespones[], ApiError>
) => {
  return useQuery({
    queryKey: ['debts'],
    queryFn: getDebts,
    ...options,
  })
}
