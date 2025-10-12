import { useEffect, useState } from 'react'
import styles from './styles.module.less'
import cs from 'classnames'

const BillTypeTabs = () => {
  const [tab, setTab] = useState('expense')
  const [transform, setTransform] = useState('translateX(0) scale(1)')

  // 每次 tab 变化的时候 背景方块,先放大再还原
  useEffect(() => {
    setTransform(`translateX(${tab === 'income' ? '100%' : '0'}) scale(1.1)`)
    const timer = setTimeout(() => {
      setTransform(`translateX(${tab === 'income' ? '100%' : '0'}) scale(1)`)
    }, 150)
    return () => clearTimeout(timer)
  }, [tab])

  return (
    <div className={styles.tab}>
      <div className={styles.tab_active_bg} style={{ transform }} />
      <div
        className={cs(styles.tab_item, {
          [styles.tab_item_active]: tab === 'expense',
        })}
        onClick={() => setTab('expense')}>
        支出
      </div>
      <div
        className={cs(styles.tab_item, {
          [styles.tab_item_active]: tab === 'income',
        })}
        onClick={() => setTab('income')}>
        收入
      </div>
    </div>
  )
}

export default BillTypeTabs
