import { ProgressBar } from 'antd-mobile'
import styles from './styles.module.less'
import { type debtsResponse } from '@/api'

const AdvanceListItem = ({ debtsItem }: { debtsItem: debtsResponse }) => {
  // 计算进度百分比，避免除以0错误
  const progressPercent =
    (Number(debtsItem?.repaid_amount) / Number(debtsItem?.total_amount)) *
      100 || 0
  return (
    <div className={styles.item}>
      <div className={styles.item_content}>
        <div className={styles.item_content_title}>
          <div className={styles.item_content_title_item}>
            <span>{debtsItem.creditor}</span>
            <span>月还：{debtsItem.current_month_due}</span>
          </div>
          <div>
            欠款：
            {(
              Number(debtsItem.total_amount) - Number(debtsItem?.repaid_amount)
            ).toFixed(2)}
          </div>
        </div>
        <ProgressBar
          className={styles.item_content_progressBar}
          percent={progressPercent}
          style={{ '--fill-color': 'red' }}
        />
      </div>
    </div>
  )
}
export default AdvanceListItem
