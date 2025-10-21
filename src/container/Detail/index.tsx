import { useState } from 'react'
import cs from 'classnames'
import { AiFillCaretDown } from 'react-icons/ai'
import { DatePicker } from 'antd-mobile'
import dayjs from 'dayjs'

import logo from '@/assets/svg/logo.svg'
import styles from './index.module.less'
import BillItemCard from '@/container/Detail/BillItemCard'
import { useGetMonthBills, type monthBillsResponse } from '@/api'

const totalMoney = (
  monthBills: monthBillsResponse[],
  type: 'expense' | 'income'
) => {
  let total = 0
  monthBills.forEach((month) => {
    month.bills.forEach((item) => {
      if (item.type === type) {
        total += Number(item.money)
      }
    })
  })
  return total
}
const Detail = () => {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false)
  const [selectedDate, setSelectedDate] = useState(dayjs())

  const { data } = useGetMonthBills({
    date_str: selectedDate.format('YYYY-MM-DD'),
  })
  const monthBills = data || []

  const remainMoney = (
    totalMoney(monthBills, 'income') - totalMoney(monthBills, 'expense')
  ).toFixed(2)
  const messageData = [
    {
      title: '收入',
      value: totalMoney(monthBills, 'income').toFixed(2),
    },
    {
      title: '支出',
      value: totalMoney(monthBills, 'expense').toFixed(2),
    },
    {
      title: Number(remainMoney) > 0 ? '结余' : '赤字',
      value: remainMoney,
    },
  ]

  return (
    <div className={cs(styles.commonBackground, styles.Detail)}>
      <div className={styles.header}>
        <img src={logo} alt='AI' className={styles.header_icon} />
        <div className={styles.header_title}>小账童</div>
      </div>
      {/* 总信息栏 */}
      <div className={styles.message}>
        <div
          className={styles.message_date}
          onClick={() => {
            setIsDatePickerVisible(true)
          }}>
          <div className={styles.message_date_year}>
            {selectedDate.format('YYYY')}年
          </div>
          <div className={styles.message_date_month}>
            <span>{selectedDate.format('MM')}</span>
            <span>月</span>
            <AiFillCaretDown />
          </div>
        </div>
        <div className={styles.message_divider} />

        <div className={styles.message_content}>
          {messageData.map((item) => {
            return (
              <div className={styles.message_content_item} key={item.title}>
                <div className={styles.message_content_item_title}>
                  {item.title}
                </div>
                <div className={styles.message_content_item_value}>
                  {item.value}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      {/* bill-item-card */}
      <BillItemCard monthBills={monthBills} />

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

export default Detail
