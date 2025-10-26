import { useQuery, type UseQueryOptions } from '@tanstack/react-query'

import { getDabts, type dabtsRespones } from '@/api'
import type { ApiError } from '@/api/types'

export const useGetDabts = (
  options?: UseQueryOptions<dabtsRespones[], ApiError>
) => {
  return useQuery({
    queryKey: ['dabts'],
    queryFn: getDabts,
    ...options,
  })
}
