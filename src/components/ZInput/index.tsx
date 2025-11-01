import { Input, type InputProps, type InputRef } from 'antd-mobile'
import cs from 'classnames'

import styles from './index.module.less'
import { forwardRef } from 'react'
interface ZInputProps extends InputProps {
  className?: string
}
const ZInput = forwardRef<InputRef, ZInputProps>(
  ({ className, ...props }: ZInputProps, ref) => {
    return (
      <Input ref={ref} className={cs(styles.input, className)} {...props} />
    )
  }
)
export default ZInput
