import cs from 'classnames'

import styles from './index.module.less'
import logo from '@/assets/svg/logo.svg'

const Detail = () => {
  return (
    <div className={cs(styles.commonBackground, styles.Detail)}>
      <div className={styles.header}>
        <img src={logo} alt='AI' className={styles.header_icon} />
        <div className={styles.header_title}>小账童</div>
      </div>
    </div>
  )
}

export default Detail
