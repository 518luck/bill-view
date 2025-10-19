import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import cs from 'classnames'
import { MdSettings } from 'react-icons/md'

import styles from './styles.module.less'
import Keypad from './Keypad'
import BillTypeTabs from '@/components/BillTypeTabs'
import DynamicIcon from '@/components/DynamicIcon'
import { useGetIconList } from '@/api'

const Tally = () => {
  const navigate = useNavigate()
  const [currentTabsType, setCurrentTabsType] = useState<'expense' | 'income'>(
    'expense'
  )
  const { data: iconList } = useGetIconList({
    type: currentTabsType,
  })

  return (
    <div className={cs(styles.commonBackground, styles.tally)}>
      <div className={styles.header}>
        <div className={styles.tab}>
          <BillTypeTabs size='medium' onChange={setCurrentTabsType} />
        </div>
        <div className={styles.cancel}>
          <MdSettings size={24} onClick={() => navigate('/iconPicker')} />
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.content_list}>
          {iconList?.map((item) => {
            return (
              <div className={styles.content_item} key={item.id}>
                <DynamicIcon name={item.icon_name} size={18} />
                <span>{item.title}</span>
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
