import { useCanvasMeteorLine } from '@/hook'

import styles from './styles.module.less'
import LineChart from './LinChart'

const Home = () => {
  const canvasLineRef = useCanvasMeteorLine()

  return (
    <div className={styles.commonBackground}>
      <div className={styles.header}>
        <div className={styles.header_text}>碎银二三</div>
        <canvas ref={canvasLineRef} className={styles.canvasLine} />
        <div className={styles.header_money}>$ 4500,11</div>
        <div className={styles.header_income}>总收入金额</div>
      </div>

      <LineChart />
    </div>
  )
}

export default Home
