import { Button, Input, Popup, Space } from 'antd-mobile'
import styles from './styles.module.less'
import Flex from '@/components/Flex'
import { MdArrowLeft, MdPedalBike } from 'react-icons/md'
import CardIconList from '@/container/IconPicker/CardIconList'
import { useState } from 'react'
import type { BillTypeTabsProps } from '@/components/BillTypeTabs'

interface PopupModifyIconProps {
  visible: boolean
  onClose: () => void
  currentTabsType: BillTypeTabsProps['value']
}
// 标题映射
const getCurrentTabsTypeTitle = (tabsType: BillTypeTabsProps['value']) => {
  switch (tabsType) {
    case 'expense':
      return '支出'
    case 'income':
      return '收入'
    default:
      return ''
  }
}
const PopupModifyIcon = ({
  visible,
  onClose,
  currentTabsType,
}: PopupModifyIconProps) => {
  const [selectedIcon, setSelectedIcon] = useState<React.ReactNode>(
    <MdPedalBike size={31} />
  )

  return (
    <Popup
      className={styles.popup}
      position='bottom'
      visible={visible}
      onClose={onClose}
      onMaskClick={onClose}>
      <div className={styles.content}>
        <Flex justify='between' align='center'>
          <div className={styles.cancelBt} onClick={onClose}>
            <MdArrowLeft size={31} />
          </div>
          <strong>添加 {getCurrentTabsTypeTitle(currentTabsType)} 类别</strong>
          <div className={styles.confirmBt}>
            <Button fill='solid'>完成</Button>
          </div>
        </Flex>
        <Space direction='vertical' className={styles.space}>
          <Flex justify='center' align='center' direction='column' gap={18}>
            {selectedIcon}
            <Input clearable placeholder='请输入类别名称 (不超过4个汉字)' />
          </Flex>
        </Space>
        <div className={styles.iconContent}>
          <CardIconList
            onIconSelect={(icon) => {
              setSelectedIcon(icon)
            }}
          />
        </div>
      </div>
    </Popup>
  )
}
export default PopupModifyIcon
