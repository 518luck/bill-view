import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import cs from 'classnames'
import { MdSettings } from 'react-icons/md'
import type z from 'zod'

import styles from './styles.module.less'
import Keypad from './Keypad'
import BillTypeTabs from '@/components/BillTypeTabs'
import DynamicIcon from '@/components/DynamicIcon'
import { useGetIconList, type IconItem } from '@/api'
import { createTallySchema } from '@/container/Tally/schema/create-tally.schema'
import dayjs from 'dayjs'

const Tally = () => {
  const navigate = useNavigate()
  const [currentIconId, setCurrentIconId] = useState<string>('')
  const methods = useForm<z.infer<typeof createTallySchema>>({
    resolver: zodResolver(createTallySchema),
    defaultValues: {
      money: 0,
      note: '',
      type: 'expense',
      date: dayjs().format('YYYY-MM-DD'),
      icon_name: '',
    },
  })

  const type = methods.watch('type')

  const { data: iconList } = useGetIconList({
    type: type,
  })

  const handleCurrentIcon = (iconItem: IconItem) => {
    methods.setValue('icon_name', iconItem.icon_name)
    setCurrentIconId(iconItem.id)
  }

  return (
    <div className={cs(styles.commonBackground, styles.tally)}>
      <div className={styles.header}>
        <div className={styles.tab}>
          <BillTypeTabs
            size='medium'
            value={type}
            onChange={(value) => methods.setValue('type', value)}
          />
        </div>
        <div className={styles.cancel}>
          <MdSettings size={24} onClick={() => navigate('/iconPicker')} />
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.content_list}>
          {iconList?.map((item) => {
            return (
              <div
                className={styles.content_item}
                key={item.id}
                onClick={() => handleCurrentIcon(item)}>
                <DynamicIcon
                  name={item.icon_name}
                  size={18}
                  color={item.id === currentIconId ? '#7d39eb' : ''}
                />
                <span
                  style={{ color: item.id === currentIconId ? '#7d39eb' : '' }}>
                  {item.title}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <div className={styles.keypad_area}>
        <Keypad methods={methods} />
      </div>
    </div>
  )
}

export default Tally
