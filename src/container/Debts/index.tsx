import { useEffect, useState } from 'react'
import { ProgressBar } from 'antd-mobile'
import cs from 'classnames'

import styles from './styles.module.less'
import PieChart from '@/container/Debts/PieChart'
import AdvanceListItem from '@/container/Debts/AdvanceListItem'
import Flex from '@/components/Flex'
import { useGetDebts } from '@/api/hook'

const Debts = () => {
  const [percent, setPercent] = useState<number>(0)
  const [progressColor, setProgressColor] =
    useState<string>('hsl(0, 100%, 50%)')

  const { data: debts = [] } = useGetDebts()
  // 计算本月共需要偿还的金额
  const monthRepay = debts.reduce(
    (acc, cur) => acc + Number(cur.current_month_due),
    0
  )
  //计算总共欠款金额
  const totalDebt = debts.reduce(
    (acc, cur) => acc + Number(cur.total_amount),
    0
  )

  // 预支占比 后期用api代替
  const advance = 20

  useEffect(() => {
    setPercent(advance)
    // 根据advance调整颜色，advance越高，红色越少，渐变为橙色或绿色
    const hue = Math.min(120, (advance / 100) * 120) // 控制色相，0度为红色，120度为绿色
    setProgressColor(`hsl(${hue}, 100%, 50%)`)
  }, [advance])

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
        <Flex justify='between'>
          <div className={styles.content_btn}>修改存款</div>
          <div className={styles.content_btn}>添加预支</div>
          <div className={styles.content_btn}>修改储蓄</div>
        </Flex>

        <div className={styles.content_hr} />

        <span className={styles.content_title}>
          <span>本月偿还：{monthRepay.toFixed(2)}</span>
          <span>剩余欠款：{totalDebt.toFixed(2)}</span>
        </span>

        <div className={styles.content_list}>
          {debts.map((item) => (
            <AdvanceListItem key={item.id} debtsItem={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
export default Debts
