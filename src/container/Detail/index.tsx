import cs from 'classnames'

import styles from './index.module.less'
import logo from '@/assets/svg/logo.svg'

const Detail = () => {
  return (
    <div className={cs(styles.commonBackground, styles.Detail)}>
      <div className={styles.header}>
        <div className={styles.headerIcon}>
          <img src={logo} alt='AI' />
        </div>
        <div>小账童</div>
      </div>
    </div>
  )
}

export default Detail
