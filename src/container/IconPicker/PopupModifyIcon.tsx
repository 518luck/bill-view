import { Button, Input, Popup, Space } from 'antd-mobile'
import styles from './styles.module.less'
import Flex from '@/components/Flex'
import { MdArrowLeft, MdCameraswitch } from 'react-icons/md'
import CardIconList from '@/container/IconPicker/CardIconList'

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
          <div className={styles.cancelBt} onClick={onClose}>
            <MdArrowLeft size={31} />
          </div>
          <strong>添加 支出 类别</strong>
          <div className={styles.confirmBt}>
            <Button fill='solid'>完成</Button>
          </div>
        </Flex>
        <Space direction='vertical' className={styles.space}>
          <Flex justify='center' align='center' direction='column' gap={18}>
            <MdCameraswitch size={31} />
            <Input clearable placeholder='请输入类别名称 (不超过4个汉字)' />
          </Flex>
        </Space>
        <div className={styles.iconContent}>
          <CardIconList />
        </div>
      </div>
    </Popup>
  )
}
export default PopupModifyIcon
