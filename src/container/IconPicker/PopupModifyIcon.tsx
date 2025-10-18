import { Button, Input, Popup, Space } from 'antd-mobile'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createIconSchema } from '@/container/IconPicker/schema/create-icon.schema'
import { MdArrowLeft } from 'react-icons/md'
import { iconMap } from '@/container/IconPicker/iconMap'
import type { z } from 'zod'

import DynamicIcon from '@/components/DynamicIcon'
import styles from './styles.module.less'
import CardIconList from '@/container/IconPicker/CardIconList'
import Flex from '@/components/Flex'
import Text from '@/components/Text'
import { useCreateIconMutation } from '@/api/hook'

interface PopupModifyIconProps {
  visible: boolean
  onClose: () => void
  currentTabsType: 'expense' | 'income'
}
// 标题映射
const getCurrentTabsTypeTitle = (tabsType: 'expense' | 'income') => {
  switch (tabsType) {
    case 'expense':
      return '支出'
    case 'income':
      return '收入'
    default:
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
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm<z.infer<typeof createIconSchema>>({
    resolver: zodResolver(createIconSchema),
    defaultValues: {
      icon_name: 'MdPedalBike',
      title: '',
    },
  })

  const handleIconClick = (iconName: keyof typeof iconMap) => {
    setValue('icon_name', iconName)
  }
  const iconName = watch('icon_name')

  const { mutate: createIcon } = useCreateIconMutation({
    onSuccess: () => {
      reset()
      onClose()
    },
  })

  // 创建图标
  const handleSubmit = async () => {
    const valid = await trigger()
    if (!valid) return
    const values = getValues()
    const data = {
      ...values,
      type: currentTabsType,
    }
    createIcon(data)
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
            <DynamicIcon name={iconName as keyof typeof iconMap} size={31} />
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
          <CardIconList onClick={handleIconClick} />
        </div>
      </div>
    </Popup>
  )
}
export default PopupModifyIcon
