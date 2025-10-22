import { ErrorBlock, SwipeAction, type SwipeActionRef } from 'antd-mobile'
import dayjs from 'dayjs'

import styles from './index.module.less'
import { useDeleteBill, type bills, type monthBillsResponse } from '@/api'
import DynamicIcon from '@/components/DynamicIcon'
import LogoIcon from '@/components/LogoIcon'
import { useRef } from 'react'

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
  const swipeRefs = useRef<Record<string, SwipeActionRef | null>>({})
  const { mutate: deleteBill, isPending } = useDeleteBill()

  const handleDelete = (id: string) => {
    deleteBill({ id })
  }
  if (monthBills.length === 0) {
    return (
      <ErrorBlock
        image={<LogoIcon />}
        status='empty'
        description='暂无数据'
        title='暂无账单'
      />
    )
  }

  return (
    <div className={styles.content}>
      {monthBills.map((month) => {
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
                    <span>支出 : {dayMxpense(month.bills)?.toFixed(2)}</span>
                  )}
                </span>
                <span>
                  {dayIncome(month.bills) > 0 && (
                    <span>收入 : {dayIncome(month.bills)?.toFixed(2)}</span>
                  )}
                </span>
              </div>
            </div>

            <div className={styles.list_content}>
              {month?.bills.map((item) => {
                return (
                  <SwipeAction
                    key={item.id}
                    ref={(el) => (swipeRefs.current[item.id] = el)}
                    rightActions={[
                      {
                        key: 'delete',
                        text: isPending ? '删除中...' : '删除',
                        color: '#ff3142c7',
                        onClick: () => handleDelete(item.id),
                      },
                    ]}>
                    <div className={styles.list_item} key={item.id}>
                      <div className={styles.list_item_icon}>
                        <DynamicIcon name={item.icon_name} size={16} />
                        <div>{item.note}</div>
                      </div>
                      <div className={styles.list_item_money}>
                        <span>
                          {item.type === 'expense' ? '- ' : ''}
                          {item.money}
                        </span>
                      </div>
                    </div>
                  </SwipeAction>
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
