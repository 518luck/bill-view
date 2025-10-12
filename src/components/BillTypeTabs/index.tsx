import { useEffect, useState } from 'react'
import styles from './styles.module.less'
import cs from 'classnames'

interface BillTypeTabsProps {
  size?: 'small' | 'medium' | 'large' | { width: number; height: number }
  value?: 'expense' | 'income'
  onChange?: (value: 'expense' | 'income') => void
}

const BillTypeTabs = ({
  size = 'medium',
  value,
  onChange,
}: BillTypeTabsProps) => {
  const [transform, setTransform] = useState('translateX(0) scale(1)')
  const [internalTab, setInternalTab] = useState<'expense' | 'income'>(
    'expense'
  )
  const tab = value !== undefined ? value : internalTab

  const handleTabChange = (newTab: 'expense' | 'income') => {
    if (value === undefined) {
      setInternalTab(newTab) // 非受控模式更新内部状态
    }
    onChange?.(newTab) // 调用父组件回调
  }

  // 每次 tab 变化的时候 背景方块,先放大再还原
  useEffect(() => {
    setTransform(`translateX(${tab === 'income' ? '100%' : '0'}) scale(1.1)`)
    const timer = setTimeout(() => {
      setTransform(`translateX(${tab === 'income' ? '100%' : '0'}) scale(1)`)
    }, 150)
    return () => clearTimeout(timer)
  }, [tab])

  const getDimensions = () => {
    if (typeof size === 'object') {
      return { width: size.width, height: size.height }
    }
    switch (size) {
      case 'small':
        return { width: 150, height: 30 }
      case 'large':
        return { width: 220, height: 45 }
      default:
        return { width: 182, height: 35 }
    }
  }
  const { width, height } = getDimensions()

  return (
    <div className={styles.tab} style={{ width, height }}>
      <div className={styles.tab_active_bg} style={{ transform }} />
      <div
        className={cs(styles.tab_item, {
          [styles.tab_item_active]: tab === 'expense',
        })}
        onClick={() => handleTabChange('expense')}>
        支出
      </div>
      <div
        className={cs(styles.tab_item, {
          [styles.tab_item_active]: tab === 'income',
        })}
        onClick={() => handleTabChange('income')}>
        收入
      </div>
    </div>
  )
}

export default BillTypeTabs
