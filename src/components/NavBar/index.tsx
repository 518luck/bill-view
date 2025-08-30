import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TabBar } from 'zarm'

import styles from './styles.module.less'
import CustomIcon from '../CustomIcon'

const NavBar = ({ show }: { show: boolean }) => {
  const navigate = useNavigate()

  const [activeKey, setActiveKey] = useState('/')

  const changeTab = (value: string | number) => {
    if (typeof value === 'string') {
      setActiveKey(value)
      navigate(value)
    } else {
      console.error('导航类型不为String')
    }
  }
  return (
    <>
      {show && (
        <TabBar
          className={styles.tab}
          activeKey={activeKey}
          onChange={changeTab}>
          <TabBar.Item
            itemKey='/home'
            title='账单'
            icon={<CustomIcon type='zhangdan' />}
          />
          <TabBar.Item
            itemKey='/data'
            title='统计'
            icon={<CustomIcon type='tongji' />}
          />
          <TabBar.Item
            itemKey='/user'
            title='我的'
            icon={<CustomIcon type='wode' />}
          />
        </TabBar>
      )}
    </>
  )
}
export default NavBar
