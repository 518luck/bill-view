import type { CSSProperties } from 'react'
import styles from './index.module.less'

export interface TextProps {
  children: React.ReactNode
  className?: string
  style?: CSSProperties
  type?: 'secondary' | 'success' | 'warning' | 'danger' | 'tertiary'
  ellipsis?: boolean
  size?: 'small' | 'medium' | 'large' | number // 支持预设和自定义像素值
}

const Text: React.FC<TextProps> = ({
  children,
  className,
  style,
  type,
  ellipsis = false,
  size = 'medium',
}) => {
  const classNames = [
    styles.text,
    type && styles[type],
    ellipsis ? styles.ellipsis : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const fontSizeStyle: CSSProperties =
    typeof size === 'number'
      ? { fontSize: size }
      : size === 'small'
      ? { fontSize: '12px' }
      : size === 'large'
      ? { fontSize: '18px' }
      : { fontSize: '14px' } // medium 默认

  return (
    <span className={classNames} style={{ ...fontSizeStyle, ...style }}>
      {children}
    </span>
  )
}

export default Text
