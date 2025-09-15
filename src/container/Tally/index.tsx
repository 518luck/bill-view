import { useState } from 'react'
import cs from 'classnames'
import { AiOutlineRight } from 'react-icons/ai'

import styles from './index.module.less'

const Tally = () => {
  const [tab, setTab] = useState('pay')

  return (
    <div className={cs(styles.commonBackground, styles.tally)}>
      <div className={styles.header}>
        <div className={styles.tab}>
          <div
            className={cs(styles.tab_item, {
              [styles.tab_item_active]: tab === 'pay',
            })}
            onClick={() => setTab('pay')}>
            支出
          </div>
          <div
            className={cs(styles.tab_item, {
              [styles.tab_item_active]: tab === 'income',
            })}
            onClick={() => setTab('income')}>
            收入
          </div>
        </div>
        <div className={styles.cancel}>
          <span>取消</span>
          <AiOutlineRight />
        </div>
      </div>

      <div className={styles.content}></div>
    </div>
  )
}

export default Tally
