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
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          boundaryGap: false,
        },
        yAxis: { type: 'value' },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true,
          },
        ],
      }
      chartRef.current.setOption(option)
    }
    // 卸载时销毁实例，防止内存泄漏
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
