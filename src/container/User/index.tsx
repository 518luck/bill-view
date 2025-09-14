import { Avatar, Button, Space } from 'antd-mobile'
import cs from 'classnames'
import { FaAngleRight } from 'react-icons/fa6'

import styles from './index.module.less'

const User = () => {
  const user =
    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'

  const messageList = [
    {
      number: 4,
      title: '连续打卡',
    },
    {
      number: 360,
      title: '记账总天数',
    },
    {
      number: 32,
      title: '记账总笔数',
    },
  ]

  const constendData = [
    {
      title: 'ID',
      value: '202301010001',
    },
    {
      title: '昵称',
      value: '多云',
    },
    {
      title: '性别',
      value: '男',
    },
    {
      title: '手机号',
      value: '13800000000',
    },
  ]

  return (
    <div className={cs(styles.commonBackground, styles.user)}>
      <div className={styles.header}>
        <div className={styles.header_icon}>
          <Avatar src={user} />
        </div>
        <div className={styles.header_name}>多云</div>
      </div>

      <div className={styles.message}>
        {messageList.map((item) => (
          <div className={styles.message_item} key={item.title}>
            <span className={styles.message_item_number}>{item.number}</span>
            <span>{item.title}</span>
          </div>
        ))}
      </div>

      <div className={styles.content}>
        {constendData.map((item) => (
          <div className={styles.content_item} key={item.title}>
            <div>{item.title}</div>
            <Space>
              <span>{item.value}</span>
              <FaAngleRight />
            </Space>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <Button>登录</Button>
      </div>
    </div>
  )
}

export default User
