import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import cs from 'classnames'
import { FaUtensils } from 'react-icons/fa'
import { MdSettings } from 'react-icons/md'

import styles from './styles.module.less'
import Keypad from './Keypad'

const Tally = () => {
  const navigate = useNavigate()
  const [tab, setTab] = useState('expense')

  return (
    <div className={cs(styles.commonBackground, styles.tally)}>
      <div className={styles.header}>
        <div className={styles.tab}>
          <div
            className={cs(styles.tab_item, {
              [styles.tab_item_active]: tab === 'expense',
            })}
            onClick={() => setTab('expense')}>
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
          <MdSettings size={24} onClick={() => navigate('/iconPicker')} />
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.content_list}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((item) => {
            return (
              <div className={styles.content_item} key={item}>
                <FaUtensils size={18} />
                <span>餐饮</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className={styles.keypad_area}>
        <Keypad />
      </div>
    </div>
  )
}

export default Tally
