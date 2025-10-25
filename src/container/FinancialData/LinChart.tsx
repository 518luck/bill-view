import { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'
import { useGetMonthBills, type monthBillsResponse } from '@/api'
import dayjs from 'dayjs'

import styles from './styles.module.less'

// 将 monthBillsResponse 转换为图表数据[[day, money],[],[]]
const toCharData = (
  data: monthBillsResponse[] = [],
  type: 'expense' | 'income'
): chartMetadata[] => {
  let cumulative = 0
  // 假设 data 已经按日期升序或者降序排列，如果是降序可以先 reverse()
  return data
    .slice()
    .reverse()
    .map((item) => {
      const todayTotal = item.bills.reduce(
        (sum, bill) => sum + (bill.type === type ? Number(bill.money) : 0),
        0
      )
      cumulative += todayTotal
      return [item.day, cumulative] as chartMetadata
    })
}
export type chartMetadata = [string, number] | []
const LineChart = () => {
  const domRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<echarts.ECharts | null>(null)
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'))

  const { data } = useGetMonthBills({
    date_str: selectedDate,
  })

  useEffect(() => {
    if (!domRef.current) return
    chartRef.current = echarts.init(domRef.current)

    const onResize = () => chartRef.current?.resize()
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      chartRef.current?.dispose()
    }
  }, [])

  useEffect(() => {
    const xExpendData: chartMetadata[] = toCharData(data || [], 'expense')
    const xIncomeData: chartMetadata[] = toCharData(data || [], 'income')
    if (!chartRef.current) return

    const option = {
      xAxis: {
        type: 'time',
        boundaryGap: false,
        axisLabel: {
          color: '#fff',
          fontSize: 12,
          formatter: (value: number) => {
            const date = new Date(value)
            return String(date.getDate())
          },
        },
        axisTick: { show: false },
        axisLine: {
          lineStyle: { color: '#fff' },
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#fff',
          fontSize: 12,
          formatter: (value: number) => {
            if (value >= 1000) {
              return value / 1000 + 'k'
            }
            return value
          },
        },
        splitLine: { show: false },
      },
      series: [
        {
          name: '收入',
          type: 'line',
          smooth: true,
          symbol: 'none',
          data: xIncomeData,
          lineStyle: { color: '#B999F2' },
          itemStyle: { color: '#B999F2' },
        },
        {
          name: '支出',
          type: 'line',
          smooth: true,
          symbol: 'none',
          data: xExpendData,
          lineStyle: { color: '#79D6F7' },
          itemStyle: { color: '#79D6F7' },
        },
      ],
      legend: {
        top: 10,
        right: 10,
        icon: 'rect',
        itemWidth: 30,
        itemHeight: 5,
        formatter: (name: string) => {
          if (name === '收入') return '{income|收入}'
          if (name === '支出') return '{expense|支出}'
          return name
        },
        textStyle: {
          rich: {
            income: { color: '#B999F2' },
            expense: { color: '#79D6F7' },
          },
        },
      },
    }

    chartRef.current.setOption(option)
  }, [])

  return <div className={styles.chart} ref={domRef} />
}
export default LineChart
