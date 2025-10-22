import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { DotLoading, Space, SwipeAction } from 'antd-mobile'
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
import { useGetIconList, useDeleteIcon } from '@/api/hook'
import DynamicIcon from '@/components/DynamicIcon'
import type { SwipeActionRef } from 'antd-mobile/es/components/swipe-action'
import Flex from '@/components/Flex'
import LogoIcon from '@/components/LogoIcon'

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

  const { mutate: deleteIcon, isPending } = useDeleteIcon()

  const handlSildeDeleteBtn = (id: string) => {
    Object.keys(swipeRefs.current).forEach((key) => {
      if (key !== id) swipeRefs.current[key]?.close()
    })
    swipeRefs.current[id]?.show('right')
  }

  const handleDelete = (id: string) => {
    deleteIcon({
      id,
    })
  }

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

      <div className={styles.content}>
        {isPending && (
          <Flex direction='row' justify='center' align='baseline' gap={10}>
            <span>
              <LogoIcon width={40} height={50} />
            </span>
            <span>
              <DotLoading color='#7b3aeb' />
            </span>
          </Flex>
        )}

        {!isPending &&
          data?.map((item) => (
            <SwipeAction
              ref={(el) => (swipeRefs.current[item.id] = el)}
              key={item.id}
              rightActions={[
                {
                  key: 'delete',
                  text: '删除',
                  color: '#ff3142c7',
                  onClick: () => handleDelete(item.id),
                },
              ]}>
              <div className={styles.item} key={item.id}>
                <Space align='center'>
                  <MdRemoveCircle
                    size={20}
                    color='#ff3b2f'
                    onClick={() => handlSildeDeleteBtn(item.id)}
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
