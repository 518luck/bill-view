import { useQuery } from '@tanstack/react-query'

import { getChartData } from '@/api/http'

export const useChartDataQuery = () =>
  useQuery({
    queryKey: ['chartData'],
    queryFn: () => getChartData(),
  })
