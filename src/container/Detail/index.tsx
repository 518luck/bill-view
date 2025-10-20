import cs from 'classnames'
import { AiFillCaretDown } from 'react-icons/ai'

import logo from '@/assets/svg/logo.svg'
import styles from './index.module.less'
import BillItemCard from '@/container/Detail/BillItemCard'

const Detail = () => {
  const messageData = [
    {
      title: '收入',
      value: '25540.00',
    },
    {
      title: '支出',
      value: '15540.00',
    },
    {
      title: '预期',
      value: '10000.00',
    },
  ]
  return (
    <div className={cs(styles.commonBackground, styles.Detail)}>
      <div className={styles.header}>
        <img src={logo} alt='AI' className={styles.header_icon} />
        <div className={styles.header_title}>小账童</div>
      </div>
      <div className={styles.message}>
        <div className={styles.message_date}>
          <div className={styles.message_date_year}>2025年</div>
          <div className={styles.message_date_month}>
            <span>09</span>
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
      <BillItemCard />
    </div>
  )
}

export default Detail
