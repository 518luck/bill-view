import { axios } from "@/utils";


interface ChartData {
  code: number;
  msg: string;
  data: {
    expend: [string, number][];
    income: [string, number][];
  };
}

export const getChartData = () => {
  return axios.get<ChartData>('/mock/chart-data')
}