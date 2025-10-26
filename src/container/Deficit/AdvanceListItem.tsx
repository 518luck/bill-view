import { ProgressBar, Space } from 'antd-mobile'
import styles from './styles.module.less'

const AdvanceListItem = () => {
  return (
    <div className={styles.item}>
      <div className={styles.item_content}>
        <div className={styles.item_content_title}>
          <Space direction='horizontal'>
            <span>
              <strong>京东</strong>
            </span>
            <span>本月：35</span>
          </Space>
          <div>总计：9000</div>
        </div>
        <ProgressBar
          className={styles.item_content_progressBar}
          percent={35}
          style={{ '--fill-color': 'red' }}
        />
      </div>
    </div>
  )
}
export default AdvanceListItem
