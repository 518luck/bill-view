import { Popup, type PopupProps } from 'antd-mobile'
import type { ReactNode } from 'react'
import cs from 'classnames'

import styles from './index.module.less'

const ZPopup = ({
  children,
  className,
  ...popupProps
}: {
  children: ReactNode
  className?: React.CSSProperties
} & PopupProps) => {
  return (
    <Popup {...popupProps}>
      <div className={cs(styles.content, className)}>{children}</div>
    </Popup>
  )
}

export default ZPopup
