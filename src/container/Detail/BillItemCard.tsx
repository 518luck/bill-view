import styles from './index.module.less'
import dayjs from 'dayjs'

import { type bills, type monthBillsResponse } from '@/api'
import DynamicIcon from '@/components/DynamicIcon'

const dayMxpense = (day: bills[]) => {
  let total = 0
  day.forEach((item) => {
    if (item.type === 'expense') {
      total += Number(item.money)
    }
  })
  return total
}
const dayIncome = (day: bills[]) => {
  let total = 0
  day.forEach((item) => {
    if (item.type === 'income') {
      total += Number(item.money)
    }
  })
  return total
}

const BillItemCard = ({ monthBills }: { monthBills: monthBillsResponse[] }) => {
  return (
    <div className={styles.content}>
      {monthBills?.map((month) => {
        return (
          <div className={styles.list} key={month.day}>
            <div className={styles.list_title}>
              <div className={styles.list_title_date}>
                <span>{dayjs(month.day).format('MM月DD日')}</span>
                <span>{dayjs(month.day).format('dddd')}</span>
              </div>
              <div className={styles.list_title_money}>
                <span>
                  {dayMxpense(month.bills) > 0 && (
                    <span>支出 : {dayMxpense(month.bills).toFixed(2)}</span>
                  )}
                </span>
                <span>
                  {dayIncome(month.bills) > 0 && (
                    <span>收入 : {dayIncome(month.bills).toFixed(2)}</span>
                  )}
                </span>
              </div>
            </div>

            <div className={styles.list_content}>
              {month.bills.map((item) => {
                return (
                  <div className={styles.list_item} key={item.id}>
                    <div className={styles.list_item_icon}>
                      <DynamicIcon name={item.icon_name} size={16} />
                      <span>{item.note}</span>
                    </div>
                    <div className={styles.list_item_money}>
                      <span>
                        {item.type === 'expense' ? '- ' : ''}
                        {item.money}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default BillItemCard
