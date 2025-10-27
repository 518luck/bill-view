import { Input, type InputProps } from 'antd-mobile'
import cs from 'classnames'

import styles from './index.module.less'
interface ZInputProps extends InputProps {
  className?: string
}
const ZInput = ({ className, ...props }: ZInputProps) => {
  return <Input className={cs(styles.input, className)} {...props} />
}
export default ZInput
