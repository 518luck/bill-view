import cs from 'classnames'
import styles from './styles.module.less'
import { Divider } from 'antd-mobile'

const AllBills = () => {
  return (
    <div className={cs(styles.commonBackground, styles.AllBills)}>
      <div className={styles.header}>
        <span className={styles.header_title}>账单</span>
        <div className={styles.header_partculars}>
          <div className={styles.header_partculars_date}>
            <span>09</span>
            <span>月</span>
          </div>

          <Divider
            direction='vertical'
            style={{
              height: 30,
            }}
          />

          <div className={styles.header_partculars_item}>
            <div className={styles.header_partculars_item_text}>
              <span>收入</span>
              <span>2640.00</span>
            </div>

            <div className={styles.header_partculars_item_text}>
              <span>支出</span>
              <span>2640.00</span>
            </div>

            <div className={styles.header_partculars_item_text}>
              <span>结余</span>
              <span>2640.00</span>
            </div>

            <div className={styles.header_partculars_item_text}>
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
