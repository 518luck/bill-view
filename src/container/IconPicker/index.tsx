import { useNavigate } from 'react-router-dom'
import { Space } from 'antd-mobile'
import cs from 'classnames'
import {
  MdRemoveCircle,
  MdRestaurant,
  MdArrowBackIosNew,
  MdMenu,
  MdAdd,
} from 'react-icons/md'

import styles from './styles.module.less'
import BillTypeTabs from '@/components/BillTypeTabs'
import PopupModifyIcon from '@/container/IconPicker/PopupModifyIcon'
import { useState } from 'react'

const IconPicker = () => {
  const navigate = useNavigate()
  const [visiblePopup, setVisiblePopup] = useState(false)

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
        <BillTypeTabs size='small' />
      </div>

      <div className={styles.content}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(
          (item) => (
            <div className={styles.item} key={item}>
              <Space align='center'>
                <MdRemoveCircle size={20} color='#ff3b2f' />
                <MdRestaurant size={20} />
                <span>餐饮</span>
              </Space>
              <MdMenu size={25} />
            </div>
          )
        )}
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
      />
    </div>
  )
}

export default IconPicker
