import cs from 'classnames'
import styles from './styles.module.less'
import { useNavigate } from 'react-router-dom'

const IconPicker = () => {
  const navigate = useNavigate()
  return (
    <div className={cs(styles.commonBackground, styles.icon_picker)}>
      <span onClick={() => navigate('/tally')}>返回</span>
      <div>
        <div>支出</div>
        <div>收入</div>
      </div>
      <div>
        <div>选择图标</div>
      </div>
    </div>
  )
}

export default IconPicker
