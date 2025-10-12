import cs from 'classnames'
import styles from './styles.module.less'
import { useNavigate } from 'react-router-dom'
import BillTypeTabs from '@/components/BillTypeTabs'
import { MdArrowBackIosNew } from 'react-icons/md'
import { Space } from 'antd-mobile'

const IconPicker = () => {
  const navigate = useNavigate()
  return (
    <div className={cs(styles.commonBackground, styles.icon_picker)}>
      <div className={styles.header}>
        <Space
          onClick={() => navigate('/tally')}
          justify='start'
          align='center'>
          <MdArrowBackIosNew size={15} />
          返回
        </Space>
      </div>
      <span onClick={() => navigate('/tally')}>返回</span>
      <div>
        tab栏
        <BillTypeTabs size='small' />
      </div>
      <div>
        <div>选择图标</div>
      </div>
    </div>
  )
}

export default IconPicker
