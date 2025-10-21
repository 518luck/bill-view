import LogoSvg from '@/assets/svg/logo.svg?react'
import cs from 'classnames'
import styles from './styles.module.less'

interface LogoIconProps {
  width?: number | string
  height?: number | string
  color?: string
  className?: string
}

const LogoIcon = ({
  width = 60,
  height = 60,
  color,
  className,
}: LogoIconProps) => {
  return (
    <LogoSvg
      width={width}
      height={height}
      className={cs(styles.logo, className)}
      fill={color}
    />
  )
}

export default LogoIcon
