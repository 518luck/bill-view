import cs from 'classnames'
import styles from './styles.module.less'
import { Divider } from 'antd-mobile'

const AllBills = () => {
  const item = [
    {
      title: '收入',
      value: '2640.00',
    },
    {
      title: '支出',
      value: '2640.00',
    },
    {
      title: '结余',
      value: '2640.00',
    },
    {
      title: '待还',
      value: '2640.00',
    },
  ]

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
            {item.map((item) => (
              <div
                className={styles.header_partculars_item_text}
                key={item.title}>
                <span>{item.title}</span>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllBills
