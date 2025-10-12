import cs from 'classnames'
import styles from './styles.module.less'
import { useNavigate } from 'react-router-dom'
import BillTypeTabs from '@/components/BillTypeTabs'

const IconPicker = () => {
  const navigate = useNavigate()
  return (
    <div className={cs(styles.commonBackground, styles.icon_picker)}>
      <span onClick={() => navigate('/tally')}>返回</span>
      <div>
        tab栏
        <BillTypeTabs />
      </div>
      <div>
        <div>选择图标</div>
      </div>
    </div>
  )
}

export default IconPicker
