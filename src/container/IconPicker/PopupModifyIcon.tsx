import { Button, Input, Popup } from 'antd-mobile'
import styles from './styles.module.less'
import Flex from '@/components/Flex'

interface PopupModifyIconProps {
  visible: boolean
  onClose: () => void
}
const PopupModifyIcon = ({ visible, onClose }: PopupModifyIconProps) => {
  return (
    <Popup
      className={styles.popup}
      position='bottom'
      visible={visible}
      onClose={onClose}
      onMaskClick={onClose}>
      <div className={styles.content}>
        <Flex justify='between' align='center'>
          <Button fill='outline'>取消</Button>
          <span>添加支出类别</span>
          <Button fill='solid'>完成</Button>
        </Flex>
        <div className={styles.icon}></div>
        <Input></Input>
      </div>
    </Popup>
  )
}
export default PopupModifyIcon
