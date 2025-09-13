import { useRef, useEffect } from 'react'

import * as echarts from 'echarts'
import styles from './styles.module.less'

const PieChart = () => {
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
    const option = {
      legend: {
        orient: 'vertical',
        left: 'right',
        top: '0',
        align: 'left',
        icon: 'rect',
        itemHeight: 12,
        itemWidth: 30,
        textStyle: {
          color: '#fff',
          verticalAlign: 'middle',
          fontSize: 12,
        },
      },
      series: [
        {
          type: 'pie',
          radius: '100%',
          center: ['26%', '50%'],
          data: [
            { value: 100, name: 'Expend' },
            { value: 200, name: 'Income' },
          ],
          label: {
            show: false, // 显示标签
          },
          labelLine: {
            show: false, // 不显示连接线
          },
        },
      ],
    }
    chartRef.current?.setOption(option)
  }, [])

  return <div className={styles.pie_chart} ref={domRef} />
}
export default PieChart
