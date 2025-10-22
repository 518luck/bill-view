import { useState } from 'react'

import styles from './styles.module.less'
import { iconClassifyMap } from '@/container/IconPicker/iconMap'
import DynamicIcon from '@/components/DynamicIcon'
import type { IconName } from '@/container/IconPicker/iconMap'

interface CardIconListProps {
  onClick: (iconName: IconName) => void
}
const CardIconList = ({ onClick }: CardIconListProps) => {
  const [currentCategory, setCurrentCategory] = useState({
    iconIndex: 0,
    title: '娱乐',
  })

  const handleIconClick = (iconName: IconName) => {
    if (onClick) {
      onClick(iconName)
    }
  }

  return (
    <>
      {iconClassifyMap.map((category, index) => {
        return (
          <div key={index} className={styles.CardIconList}>
            <div className={styles.title}>{category.title}</div>
            <div className={styles.icons}>
              {category.icons.map((Icon, iconIndex) => {
                return (
                  <DynamicIcon
                    name={Icon}
                    size={25}
                    color={
                      currentCategory.iconIndex === iconIndex &&
                      currentCategory.title === category.title
                        ? '#7d39eb'
                        : ''
                    }
                    onClick={() => {
                      setCurrentCategory({
                        iconIndex,
                        title: category.title,
                      })
                      handleIconClick(Icon)
                    }}
                  />
                )
              })}
            </div>
          </div>
        )
      })}
    </>
  )
}

export default CardIconList
