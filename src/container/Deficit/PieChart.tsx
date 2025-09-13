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
        data: [
          {
            name: '余粮 : 288 元',
            itemStyle: { color: 'rgba(123, 58, 235, 1)' },
          },
          { name: '预支 : 72 元', itemStyle: { color: '#E74C3C' } },
        ],
      },
      series: [
        {
          type: 'pie',
          radius: '100%',
          center: ['26%', '50%'],
          startAngle: 45,
          data: [
            {
              value: 72,
              name: '预支 : 72 元',
              itemStyle: {
                borderWidth: 0,
                color: {
                  type: 'radial',
                  x: 70, // 渐变的起始位置X
                  y: 90, // 渐变的起始位置Y
                  r: 95, // 渐变的半径，50% 为渐变半径
                  colorStops: [
                    {
                      offset: 0, // 渐变的起始位置
                      color: 'rgba(231, 76, 60, 1)', // 渐变起始颜色，红色
                    },
                    {
                      offset: 1, // 渐变的结束位置
                      color: 'rgba(231, 76, 60, 0)', // 渐变结束颜色，完全透明
                    },
                  ],
                  global: true, // 全局
                },
              },
            },
            {
              value: 288,
              name: '余粮 : 288 元',
              itemStyle: {
                color: {
                  type: 'radial',
                  x: 70,
                  y: 90,
                  r: 95,
                  colorStops: [
                    {
                      offset: 0,
                      color: 'rgba(40, 26, 66, 0.47)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(123, 86, 192, 0.78)',
                    },
                  ],
                  global: true, // 全局
                },
                borderWidth: 0,
              },
            },
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
