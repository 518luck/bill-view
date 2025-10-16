import { useState } from 'react'
import { Button, Input, Popup, Space } from 'antd-mobile'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createIconSchema } from '@/container/IconPicker/schema/create-icon.schema'
import { MdArrowLeft, MdPedalBike } from 'react-icons/md'

import styles from './styles.module.less'
import CardIconList from '@/container/IconPicker/CardIconList'
import Flex from '@/components/Flex'
import type { BillTypeTabsProps } from '@/components/BillTypeTabs'
import Text from '@/components/Text'
interface PopupModifyIconProps {
  visible: boolean
  onClose: () => void
  currentTabsType: BillTypeTabsProps['value']
}
// 标题映射
const getCurrentTabsTypeTitle = (tabsType: BillTypeTabsProps['value']) => {
  switch (tabsType) {
    case 'expense':
      return '支出'
    case 'income':
      return '收入'
    default:
      return ''
  }
}
const PopupModifyIcon = ({
  visible,
  onClose,
  currentTabsType,
}: PopupModifyIconProps) => {
  const {
    control,
    setValue,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createIconSchema),
    defaultValues: createIconSchema.parse({}),
  })
  const [selectedIcon, setSelectedIcon] = useState<React.ReactNode>(
    <MdPedalBike size={31} />
  )
  const handleSubmit = () => {
    const valid = trigger()
    if (!valid) return
    const values = getValues()
    const data = {
      ...values,
      tabsType: currentTabsType,
    }
  }

  return (
    <Popup
      className={styles.popup}
      position='bottom'
      visible={visible}
      onClose={onClose}
      onMaskClick={onClose}>
      <div className={styles.content}>
        {/* header */}
        <Flex justify='between' align='center'>
          <div className={styles.cancelBt} onClick={onClose}>
            <MdArrowLeft size={31} />
          </div>
          <strong>添加 {getCurrentTabsTypeTitle(currentTabsType)} 类别</strong>
          <div className={styles.confirmBt}>
            <Button fill='solid' onClick={handleSubmit}>
              完成
            </Button>
          </div>
        </Flex>

        {/* message */}
        <Space direction='vertical' className={styles.space}>
          <Flex justify='center' align='center' direction='column' gap={18}>
            {selectedIcon}
            <Flex justify='center' align='center' direction='column' gap={0}>
              <Controller
                name='title'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Input
                    clearable
                    placeholder='请输入类别名称 (不超过4个汉字)'
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              {errors.title?.message && (
                <Text type='danger' size='small'>
                  {errors.title.message}
                </Text>
              )}
            </Flex>
          </Flex>
        </Space>

        {/* icon content */}
        <div className={styles.iconContent}>
          <CardIconList
            onIconSelect={(icon) => {
              const componentType = icon.type
              const componentName =
                typeof componentType === 'string'
                  ? componentType
                  : componentType.name
              setSelectedIcon(icon)
              setValue('iconName', componentName)
            }}
          />
        </div>
      </div>
    </Popup>
  )
}
export default PopupModifyIcon
