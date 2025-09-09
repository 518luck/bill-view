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
          boundaryGap: false,
        },
        yAxis: { type: 'value' },
        series: [
          {
            name: '8月花费',
            type: 'line',
            smooth: true,
            symbol: 'none',
            data: [],
          },
          {
            name: '8月花费',
            type: 'line',
            smooth: true,
            symbol: 'none',
            data: [],
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
