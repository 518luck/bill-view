import cs from 'classnames'
import { AiFillCaretDown } from 'react-icons/ai'
import { FaUtensils } from 'react-icons/fa6'

import styles from './index.module.less'
import logo from '@/assets/svg/logo.svg'

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

      <div className={styles.content}>
        <div className={styles.list}>
          <div className={styles.list_title}>
            <div className={styles.list_title_date}>
              <span>09月14日</span>
              <span>星期日</span>
            </div>
            <div className={styles.list_title_money}>支出 : 73.00</div>
          </div>

          <div className={styles.list_content}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => {
              return (
                <div className={styles.list_item} key={item}>
                  <div className={styles.list_item_icon}>
                    <FaUtensils />
                    <span>餐饮</span>
                  </div>
                  <div className={styles.list_item_money}>
                    <span>-73.00</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className={styles.list}>
          <div className={styles.list_title}>
            <div className={styles.list_title_date}>
              <span>09月14日</span>
              <span>星期日</span>
            </div>
            <div className={styles.list_title_money}>支出 : 73.00</div>
          </div>

          <div className={styles.list_content}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => {
              return (
                <div className={styles.list_item} key={item}>
                  <div className={styles.list_item_icon}>
                    <FaUtensils />
                    <span>餐饮</span>
                  </div>
                  <div className={styles.list_item_money}>
                    <span>-73.00</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail
