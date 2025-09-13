import styles from './styles.module.less'
import PieChart from './PieChart'

const Deficit = () => {
  return (
    <div className={styles.commonBackground}>
      <div className={styles.header}>
        <PieChart />
      </div>
    </div>
  )
}
export default Deficit
