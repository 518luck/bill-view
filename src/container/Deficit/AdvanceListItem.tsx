import { ProgressBar, Avatar, Space } from 'antd-mobile'
import styles from './styles.module.less'

const AdvanceListItem = () => {
  const demoAvatarImages = [
    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9',
  ]
  return (
    <div className={styles.item}>
      <div className={styles.item_icon}>
        <Avatar
          src={demoAvatarImages[0]}
          fit='cover'
          fallback={<div>暂无</div>}
          className={styles.item_icon_avatar}
        />
      </div>

      <div className={styles.item_content}>
        <div className={styles.item_content_title}>
          <Space direction='horizontal'>
            <span>京东</span>
            <span>35%</span>
          </Space>
          <div>9000</div>
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
