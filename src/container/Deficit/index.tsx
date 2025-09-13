import { useEffect, useState } from 'react'
import { ProgressBar } from 'antd-mobile'
import cs from 'classnames'

import styles from './styles.module.less'
import PieChart from './PieChart'
import AdvanceListItem from './AdvanceListItem'

const Deficit = () => {
  const [percent, setPercent] = useState<number>(0)
  const [progressColor, setProgressColor] =
    useState<string>('hsl(0, 100%, 50%)')

  // 预支占比 后期用api代替
  const advance = 20

  useEffect(() => {
    setPercent(advance)
    // 根据advance调整颜色，advance越高，红色越少，渐变为橙色或绿色
    const hue = Math.min(120, (advance / 100) * 120) // 控制色相，0度为红色，120度为绿色
    setProgressColor(`hsl(${hue}, 100%, 50%)`)
  }, [advance])

  // 以上全是假数据

  return (
    <div className={cs(styles.commonBackground, styles.deficit)}>
      <div className={styles.header}>
        <PieChart />
        <div className={styles.PreAllocationRatio}>
          <span>预支占比 : {advance}%</span>
          <ProgressBar
            style={{ '--fill-color': progressColor, '--track-width': '11px' }}
            percent={percent}
            className={styles.PreAllocationRatio_progress}
          />
        </div>
      </div>

      <div className={styles.message}>
        <span>⚠️ 警告：赤字已经超过收入的20%，这属于高风险行为</span>
      </div>

      <div className={styles.content}>
        <span className={styles.content_title}>预支排行榜</span>

        <div className={styles.content_list}>
          <AdvanceListItem />
        </div>
      </div>
    </div>
  )
}
export default Deficit
