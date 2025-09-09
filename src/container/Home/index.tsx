import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

import { useCanvasMeteorLine } from '@/hook'

import styles from './styles.module.less'

const Home = () => {
  const domRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<echarts.ECharts | null>(null)

  const canvasLineRef = useCanvasMeteorLine()

  useEffect(() => {
    if (domRef.current) {
      chartRef.current = echarts.init(domRef.current)

      const option = {
        xAxis: {
          type: 'time',
          data: [
            ['2025-01-01', 820],
            ['2025-01-02', 932],
            ['2025-01-03', 901],
            ['2025-01-04', 401],
            ['2025-01-05', 101],
            ['2025-01-06', 601],
            ['2025-01-07', 701],
            ['2025-01-08', 301],
            ['2025-01-09', 201],
            ['2025-01-10', 401],
            ['2025-01-11', 301],
            ['2025-01-12', 601],
            ['2025-01-13', 801],
            ['2025-01-14', 501],
            ['2025-01-15', 601],
            ['2025-01-16', 941],
            ['2025-01-17', 911],
            ['2025-01-18', 341],
            ['2025-01-19', 651],
            ['2025-01-20', 671],
            ['2025-01-21', 901],
            ['2025-01-22', 901],
            ['2025-01-23', 901],
            ['2025-01-24', 901],
            ['2025-01-25', 901],
            ['2025-01-26', 901],
            ['2025-01-27', 901],
            ['2025-01-28', 901],
            ['2025-01-29', 901],
            ['2025-01-30', 901],
            ['2025-01-31', 901],
          ],
          boundaryGap: false,
        },
        yAxis: { type: 'value' },
        series: [
          {
            data: [
              ['2025-01-01', 820],
              ['2025-01-02', 932],
              ['2025-01-03', 901],
              ['2025-01-04', 401],
              ['2025-01-05', 101],
              ['2025-01-06', 601],
              ['2025-01-07', 701],
              ['2025-01-08', 301],
              ['2025-01-09', 201],
              ['2025-01-10', 401],
              ['2025-01-11', 301],
              ['2025-01-12', 601],
              ['2025-01-13', 801],
              ['2025-01-14', 501],
              ['2025-01-15', 601],
              ['2025-01-16', 941],
              ['2025-01-17', 911],
              ['2025-01-18', 341],
              ['2025-01-19', 651],
              ['2025-01-20', 671],
              ['2025-01-21', 901],
              ['2025-01-22', 901],
              ['2025-01-23', 901],
              ['2025-01-24', 901],
              ['2025-01-25', 901],
              ['2025-01-26', 901],
              ['2025-01-27', 901],
              ['2025-01-28', 901],
              ['2025-01-29', 901],
              ['2025-01-30', 901],
              ['2025-01-31', 901],
            ],
            type: 'line',
            smooth: true,
          },
        ],
      }
      chartRef.current.setOption(option)
    }

    return () => {
      chartRef.current?.dispose()
    }
  }, [])

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
