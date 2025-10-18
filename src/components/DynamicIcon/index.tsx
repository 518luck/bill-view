import { iconMap } from '@/container/IconPicker/iconMap'
import type { MouseEvent } from 'react'
/**
 * 动态图标组件 - 根据名称渲染对应的Material Design图标
 *
 * @example
 * ```tsx
 * // 基本用法
 * <DynamicIcon name="MdPedalBike" />
 *
 * // 自定义大小和颜色
 * <DynamicIcon name="MdRestaurant" size={30} color="#ff6b6b" />
 *
 * // 带点击事件
 * <DynamicIcon
 *   name="MdLocalHospital"
 *   onClick={(e) => console.log('图标被点击', e)}
 * />
 * ```
 */
interface DynamicIconProps {
  name: keyof typeof iconMap
  size?: number
  color?: string
  onClick?: (e: MouseEvent<SVGSVGElement>) => void
}

/**
 * 动态图标组件
 *
 * 根据传入的name属性从iconMap中查找对应的图标组件并渲染。
 * 如果找不到对应图标，则返回null。
 *
 * @param {DynamicIconProps} props - 组件属性
 * @returns {JSX.Element|null} 渲染的图标组件或null
 */
const DynamicIcon = ({ name, size = 25, color, onClick }: DynamicIconProps) => {
  const Icon = iconMap[name]
  if (!Icon) return null
  return <Icon size={size} color={color} onClick={onClick} />
}

export default DynamicIcon
