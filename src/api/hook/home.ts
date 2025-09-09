import { useQuery } from "@tanstack/react-query";

import { getChartData } from "@/api/http";

export const useChartData = () => useQuery({
  queryKey: ['chartData'],
  queryFn: () => getChartData().then(res => res.data)
});
