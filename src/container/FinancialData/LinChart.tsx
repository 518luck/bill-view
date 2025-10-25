import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

import styles from './styles.module.less'

import type { chartMetadata } from './index'
const LineChart = ({
  xExpendData,
  xIncomeData,
}: {
  xExpendData: chartMetadata[]
  xIncomeData: chartMetadata[]
}) => {
  const domRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<echarts.ECharts | null>(null)

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
