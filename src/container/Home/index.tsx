import { useCanvasMeteorLine } from '@/hook'

import styles from './styles.module.less'

const Home = () => {
  const canvasLineRef = useCanvasMeteorLine()
  return (
    <div className={styles.commonBackground}>
      <div className={styles.header}>
        <div className={styles.header_text}>碎银二三</div>
        <canvas ref={canvasLineRef} className={styles.canvasLine} />
        <div className={styles.header_line}>分割线</div>
        <div className={styles.header_money}>$4500</div>
        <div className={styles.header_income}>总收入金额</div>
      </div>
    </div>
  )
}

export default Home
