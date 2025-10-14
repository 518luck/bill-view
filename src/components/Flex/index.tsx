import React from 'react'
import cs from 'classnames'
import styles from './styles.module.less'

interface FlexProps {
  children: React.ReactNode
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'
  align?: 'start' | 'end' | 'center' | 'stretch' | 'baseline'
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  gap?: number | string
  className?: string
  onClick?: () => void
}

const Flex: React.FC<FlexProps> = ({
  children,
  direction = 'row',
  justify = 'start',
  align = 'start',
  wrap = 'nowrap',
  gap = 8,
  className,
  onClick,
}) => {
  const style = {
    gap: typeof gap === 'number' ? `${gap}px` : gap,
  }

  return (
    <div
      className={cs(
        styles.flex,
        styles[`direction-${direction}`],
        styles[`justify-${justify}`],
        styles[`align-${align}`],
        styles[`wrap-${wrap}`],
        className
      )}
      style={style}
      onClick={onClick}>
      {children}
    </div>
  )
}

export default Flex
