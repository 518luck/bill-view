import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Space, SwipeAction } from 'antd-mobile'
import cs from 'classnames'
import {
  MdRemoveCircle,
  MdArrowBackIosNew,
  MdMenu,
  MdAdd,
} from 'react-icons/md'

import styles from './styles.module.less'
import BillTypeTabs from '@/components/BillTypeTabs'
import PopupModifyIcon from '@/container/IconPicker/PopupModifyIcon'
import { useGetIconList } from '@/api/hook'
import DynamicIcon from '@/components/DynamicIcon'
import type {
  Action,
  SwipeActionRef,
} from 'antd-mobile/es/components/swipe-action'

const IconPicker = () => {
  const navigate = useNavigate()
  const [visiblePopup, setVisiblePopup] = useState(false)
  const [currentTabsType, setCurrentTabsType] = useState<'expense' | 'income'>(
    'expense'
  )
  const swipeRefs = useRef<Record<string, SwipeActionRef | null>>({})

  const { data } = useGetIconList({
    type: currentTabsType,
  })

  //-----
  const handleDelete = (id: string) => {
    Object.keys(swipeRefs.current).forEach((key) => {
      if (key !== id) swipeRefs.current[key]?.close()
    })
    swipeRefs.current[id]?.show('right')
  }
  const rightActions: Action[] = [
    {
      key: 'delete',
      text: '删除',
      color: '#ff3142c7',
    },
  ]
  return (
    <div className={cs(styles.commonBackground, styles.icon_picker)}>
      <div className={styles.header}>
        <div className={styles.leftSection} onClick={() => navigate('/tally')}>
          <MdArrowBackIosNew size={18} />
          <span>返回</span>
        </div>
        <div className={styles.centerSection}>类别设置</div>
      </div>
      <div className={styles.tab}>
        <BillTypeTabs
          size='small'
          onChange={(tab) => setCurrentTabsType(tab)}
        />
      </div>

      {/* // TODO:还没添加删除图标功能 */}
      <div className={styles.content}>
        {data?.map((item) => (
          <SwipeAction
            ref={(el) => (swipeRefs.current[item.id] = el)}
            key={item.id}
            rightActions={rightActions}>
            <div className={styles.item} key={item.id}>
              <Space align='center'>
                <MdRemoveCircle
                  size={20}
                  color='#ff3b2f'
                  onClick={() => handleDelete(item.id)}
                />
                <DynamicIcon name={item.icon_name} size={20} />
                <span>{item.title}</span>
              </Space>
              <MdMenu size={25} />
            </div>
          </SwipeAction>
        ))}
      </div>
      {!visiblePopup && (
        <div className={styles.footer} onClick={() => setVisiblePopup(true)}>
          <MdAdd size={25} />
          <span>添加类别</span>
        </div>
      )}

      <PopupModifyIcon
        visible={visiblePopup}
        onClose={() => setVisiblePopup(false)}
        currentTabsType={currentTabsType}
      />
    </div>
  )
}

export default IconPicker
