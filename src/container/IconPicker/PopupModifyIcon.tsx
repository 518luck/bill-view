import { Popup } from 'antd-mobile'
import styles from './styles.module.less'

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
        <h3>修改图标</h3>
      </div>
    </Popup>
  )
}
export default PopupModifyIcon
