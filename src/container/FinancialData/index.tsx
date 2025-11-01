import { useState } from 'react'
import { useCanvasMeteorLine } from '@/hook'
import { MdArrowDropDown } from 'react-icons/md'
import dayjs from 'dayjs'

import styles from './styles.module.less'
import LineChart from './LinChart'
import ButtonCard from './ButtonCard'
import { useGetMonthBills, useGetDebts, type monthBillsResponse } from '@/api'
import { DatePicker } from 'antd-mobile'
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
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false)
  const [selectedDate, setSelectedDate] = useState(dayjs())
  // 获取选中日期的账单数据
  const { data } = useGetMonthBills({
    date_str: selectedDate.format('YYYY-MM-DD'),
  })
  const total = calculateNetIncome(data || []).netIncome.toFixed(2)

  // 获取选中日期的资产债务数据
  const { data: debts = [] } = useGetDebts()
  return (
    <div className={styles.commonBackground}>
      <div className={styles.header}>
        <div className={styles.header_text}>碎银二三</div>
        <canvas ref={canvasLineRef} className={styles.canvasLine} />
        {Number(total) !== 0 && (
          <div className={styles.header_money}>$ {total}</div>
        )}
        <div
          className={styles.header_income}
          onClick={() => setIsDatePickerVisible(true)}>
          <span>
            {selectedDate.format('YYYY-MM')}
            <MdArrowDropDown size={24} />
          </span>
          {Number(total) > 0
            ? '😀嘿嘿结余'
            : Number(total) < 0
            ? '😭这月赤字'
            : '这个月还没账单'}
        </div>
      </div>

      <LineChart
        xExpendData={toCharData(data || [], 'expense')}
        xIncomeData={toCharData(data || [], 'income')}
      />

      <div className={styles.bottom}>
        <ButtonCard
          number={debts?.length || 0}
          text='贷款未偿合计'
          numberColor='red'
          linkPath='/debts'
        />
        <ButtonCard
          number={selectedDate.format('MM')}
          text='我的账本明细'
          numberColor='white'
          linkPath='/allBills'
        />
      </div>

      <DatePicker
        visible={isDatePickerVisible}
        onClose={() => {
          setIsDatePickerVisible(false)
        }}
        onConfirm={(date) => {
          setSelectedDate(dayjs(date))
        }}
        precision='month'
        value={selectedDate.toDate()}
        className={styles.datePicker}
      />
    </div>
  )
}

export default FinancialData
