import cs from 'classnames'

import styles from './styles.module.less'
import PieChart from './PieChart'

const Deficit = () => {
  return (
    <div className={cs(styles.commonBackground, styles.deficit)}>
      <div className={styles.header}>
        <PieChart />
      </div>
    </div>
  )
}
export default Deficit
