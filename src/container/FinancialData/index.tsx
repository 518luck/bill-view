import { useState } from 'react'
import { useCanvasMeteorLine } from '@/hook'
import dayjs from 'dayjs'

import styles from './styles.module.less'
import LineChart from './LinChart'
import ButtonCard from './ButtonCard'
import { useGetMonthBills, type monthBillsResponse } from '@/api'
export type chartMetadata = [string, number] | []

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

// 计算总收入、总支出、净收入
const calculateNetIncome = (data: monthBillsResponse[] = []) => {
  let totalIncome = 0
  let totalExpense = 0

  data.forEach((dayItem: monthBillsResponse) => {
    dayItem.bills.forEach((bill) => {
      const money = Number(bill.money)
      if (bill.type === 'income') {
        totalIncome += money
      } else if (bill.type === 'expense') {
        totalExpense += money
      }
    })
  })

  return {
    totalIncome,
    totalExpense,
    netIncome: totalIncome - totalExpense,
  }
}
const FinancialData = () => {
  const canvasLineRef = useCanvasMeteorLine()
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'))
  const { data } = useGetMonthBills({
    date_str: selectedDate,
  })

  return (
    <div className={styles.commonBackground}>
      <div className={styles.header}>
        <div className={styles.header_text}>碎银二三</div>
        <canvas ref={canvasLineRef} className={styles.canvasLine} />
        <div className={styles.header_money}>$ 4500,11</div>
        <div className={styles.header_income}>总收入金额</div>
      </div>

      <LineChart
        xExpendData={toCharData(data || [], 'expense')}
        xIncomeData={toCharData(data || [], 'income')}
      />

      <div className={styles.bottom}>
        <ButtonCard
          number={'03'}
          text='贷款未偿合计'
          numberColor='red'
          linkPath='/deficit'
        />
        <ButtonCard
          number={'09'}
          text='我的账本明细'
          numberColor='white'
          linkPath='/allBills'
        />
      </div>
    </div>
  )
}

export default FinancialData
