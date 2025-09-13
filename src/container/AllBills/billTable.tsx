import styles from './styles.module.less'
import { PlayOutline } from 'antd-mobile-icons'

const BillTable = () => {
  const header = ['月份', '月收入', '月支出', '月结余', '赤字']

  return (
    <div className={styles.billTable}>
      <div className={styles.billTable_header}>
        {header.map((item) => (
          <div className={styles.billTable_header_item} key={item}>
            <span>{item}</span>
          </div>
        ))}
        <div className={styles.billTable_header_item} />
      </div>

      <div className={styles.billTable_body}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => {
          const monthText = String(item).padStart(2, '0')
          return (
            <div className={styles.billTable_body_item} key={item}>
              <span>{monthText}月</span>
              <span>2640.00</span>
              <span>2640.00</span>
              <span>2640.00</span>
              <span>2640.00</span>
              <PlayOutline />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BillTable
