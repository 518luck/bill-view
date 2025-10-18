import { iconMap } from '@/container/IconPicker/iconMap'
import type { MouseEvent } from 'react'

interface DynamicIconProps {
  name: keyof typeof iconMap
  size?: number
  color?: string
  onClick?: (e: MouseEvent<SVGSVGElement>) => void
}

const DynamicIcon = ({ name, size = 25, color, onClick }: DynamicIconProps) => {
  const Icon = iconMap[name]
  if (!Icon) return null
  return <Icon size={size} color={color} onClick={onClick} />
}

export default DynamicIcon
