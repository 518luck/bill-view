import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TabBar } from 'antd-mobile'
import { ContentOutline, ReceivePaymentOutline } from 'antd-mobile-icons'
import styles from './styles.module.less'

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
            key='/home'
            title='首页'
            icon={<ReceivePaymentOutline />}
          />
          <TabBar.Item key='/data' title='统计' icon={<ContentOutline />} />
          <TabBar.Item key='/user' title='我的' icon={<ContentOutline />} />
        </TabBar>
      )}
    </>
  )
}
export default NavBar
