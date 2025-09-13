import styles from './styles.module.less'
import { Divider } from 'antd-mobile'

const AllBills = () => {
  return (
    <div className={styles.commonBackground}>
      <div className={styles.header}>
        <span className={styles.header_title}>账单</span>
        <div className={styles.header_partculars}>
          <div className={styles.header_partculars_date}>
            <span>09</span>
            <span>月</span>
          </div>

          <Divider />

          <div className={styles.header_partculars_item}>
            <div>
              <span>收入</span>
              <span>2640.00</span>
            </div>

            <div>
              <span>支出</span>
              <span>2640.00</span>
            </div>

            <div>
              <span>结余</span>
              <span>2640.00</span>
            </div>

            <div>
              <span>待还</span>
              <span>2640.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllBills
