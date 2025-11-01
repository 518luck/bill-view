import ZPopup from '@/components/ZPopup'
import { useForm, Controller } from 'react-hook-form'
import { Button, Space, Switch } from 'antd-mobile'

import styles from './styles.module.less'
import Flex from '@/components/Flex'
import Text from '@/components/Text'
import ZInput from '@/components/ZInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUpdateDebtPieChartMutation, useGetDebtPieChartConfig } from '@/api'
import {
  UpdateSavingsPrepaymentSchema,
  type UpdateSavingsPrepaymentRequest,
} from '@/container/Debts/schema/update-savings-prepayment.schema'
import { useEffect } from 'react'

interface UpdateSavingsPrepaymentProps {
  visible: boolean
  setVisible: (visible: boolean) => void
}
const UpdateSavingsPrepayment = ({
  visible,
  setVisible,
}: UpdateSavingsPrepaymentProps) => {
  const {
    control,
    trigger,
    getValues,
    reset,
    formState: { errors },
  } = useForm<UpdateSavingsPrepaymentRequest>({
    resolver: zodResolver(UpdateSavingsPrepaymentSchema),
    defaultValues: {
      balance: 0,
    },
  })

  // 获取资产债务配置信息
  const { data: config } = useGetDebtPieChartConfig({
    enabled: visible,
  })

  useEffect(() => {
    if (config) {
      reset({
        balance: Number(config?.balance) || 0,
        monthly_only: config?.monthly_only ?? false,
        include_bills: config?.include_bills ?? false,
      })
    }
  }, [config, reset])

  // 更新资产债务配置
  const { mutate: updateDebtPieChart, isPending } =
    useUpdateDebtPieChartMutation({
      onSuccess: () => {
        setVisible(false)
        reset()
      },
    })

  const handleSubmit = async () => {
    const valid = await trigger()
    if (!valid) return
    const values = getValues()
    updateDebtPieChart(values)
  }

  return (
    <ZPopup
      visible={visible}
      position='bottom'
      bodyStyle={{ height: '70vh' }}
      onMaskClick={() => {
        setVisible(false)
      }}
      onClose={() => {
        setVisible(false)
      }}
      className={styles.form}>
      <Flex justify='center'>
        <Text size='large'>编辑饼图数据</Text>
      </Flex>

      <div>
        <Space align='center' className={styles.row}>
          <Text size='large'>添加余粮：</Text>
          <div>
            <Controller
              name='balance'
              control={control}
              render={({ field }) => (
                <ZInput
                  {...field}
                  value={field.value?.toString() ?? ''}
                  onChange={(val) => {
                    const cleanValue = val.replace(/[^\d.]/g, '')
                    if (cleanValue === '') {
                      field.onChange(0)
                    } else {
                      field.onChange(Number(cleanValue))
                    }
                  }}
                  placeholder='添加余粮金额'
                />
              )}
            />
            {errors.balance && (
              <Text size='small' type='danger'>
                {errors.balance?.message}
              </Text>
            )}
          </div>
        </Space>
        <Flex justify='center'>
          <Text type='secondary' size='small'>
            该余粮为固定金额，仅用于每月债务占比的计算，不影响实际收支数据。
          </Text>
        </Flex>
      </div>

      <div>
        <Space align='center' className={styles.row}>
          <Text size='large'>混入账单：</Text>
          <Controller
            name='include_bills'
            control={control}
            render={({ field }) => (
              <Switch checked={field.value} onChange={field.onChange} />
            )}
          />
        </Space>
        <Flex justify='center'>
          <Text type='secondary' size='small'>
            开启后，将把所有账单明细纳入余粮与预支计算中。
          </Text>
        </Flex>
      </div>

      <div>
        <Space align='center' className={styles.row}>
          <Text size='large'>当月债务：</Text>
          <Controller
            name='monthly_only'
            control={control}
            render={({ field }) => (
              <Switch checked={field.value} onChange={field.onChange} />
            )}
          />
        </Space>
        <Flex justify='center'>
          <Text type='secondary' size='small'>
            开启后，仅按本月需偿还的债务计算预支，不包含全部债务总额。
          </Text>
        </Flex>
      </div>

      <Flex justify='between'>
        <Button
          onClick={() => {
            setVisible(false)
            reset()
          }}>
          取消
        </Button>
        <Button onClick={handleSubmit} loading={isPending}>
          提交
        </Button>
      </Flex>
    </ZPopup>
  )
}
export default UpdateSavingsPrepayment
