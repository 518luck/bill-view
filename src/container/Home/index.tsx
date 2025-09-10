import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

import { useCanvasMeteorLine } from '@/hook'
import { useChartDataQuery } from '@/api'

import styles from './styles.module.less'

const Home = () => {
  const canvasLineRef = useCanvasMeteorLine()
  const domRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<echarts.ECharts | null>(null)

  const { data } = useChartDataQuery()
  const xExpendData = data?.data?.expend
  const xIncomeData = data?.data?.income

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
  }, [xExpendData, xIncomeData])

  return (
    <div className={styles.commonBackground}>
      <div className={styles.header}>
        <div className={styles.header_text}>碎银二三</div>
        <canvas ref={canvasLineRef} className={styles.canvasLine} />
        <div className={styles.header_money}>$ 4500,11</div>
        <div className={styles.header_income}>总收入金额</div>
      </div>

      <div className={styles.chart} ref={domRef}>
        图表
      </div>
    </div>
  )
}

export default Home
