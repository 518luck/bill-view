import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { TabBar } from 'antd-mobile'
import { CiViewList } from 'react-icons/ci'
import { MdInsertChartOutlined } from 'react-icons/md'
import { IoMdAdd } from 'react-icons/io'
import { BsFiletypeAi } from 'react-icons/bs'
import { GiMummyHead } from 'react-icons/gi'

import styles from './styles.module.less'

const NavBar = ({ show }: { show: boolean }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const [activeKey, setActiveKey] = useState('/home')

  useEffect(() => {
    setActiveKey(location.pathname)
  }, [location.pathname])

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
          <TabBar.Item key='/detail' title='明细' icon={<CiViewList />} />

          <TabBar.Item
            key='/financialData'
            title='数据'
            icon={<MdInsertChartOutlined />}
          />

          <TabBar.Item key='/tally' title='记账' icon={<IoMdAdd />} />
          <TabBar.Item key='/user1' title='账童' icon={<BsFiletypeAi />} />
          <TabBar.Item key='/user' title='我的' icon={<GiMummyHead />} />
        </TabBar>
      )}
    </>
  )
}
export default NavBar
