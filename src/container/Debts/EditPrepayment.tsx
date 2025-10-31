import ZPopup from '@/components/ZPopup'
import { Button, Space, Toast } from 'antd-mobile'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ZInput from '@/components/ZInput'
import Text from '@/components/Text'
import { useUpdateDebtMutation, type debtsResponse } from '@/api'

import styles from './styles.module.less'
interface AddPrepaymentProps {
  visible: boolean
  setVisible: (visible: boolean) => void
  // 当前选中的预支项
  currentDebt?: debtsResponse
  setCurrentDebt: (currentDebt?: debtsResponse) => void
}
import {
  EditPrepaymentSchema,
  type EditPrepaymentRequest,
} from '@/container/Debts/schema/edit-prepayment.schema'
import Flex from '@/components/Flex'
import { useEffect } from 'react'

const EditPrepayment = ({
  visible,
  setVisible,
  currentDebt,
  setCurrentDebt,
}: AddPrepaymentProps) => {
  const {
    control,
    trigger,
    getValues,
    reset,
    formState: { errors },
  } = useForm<EditPrepaymentRequest>({
    resolver: zodResolver(EditPrepaymentSchema),
    defaultValues: {
      creditor: currentDebt?.creditor || '',
      current_month_due: Number(currentDebt?.current_month_due) || 0,
      repaid_amount: Number(currentDebt?.repaid_amount) || 0,
      total_amount: Number(currentDebt?.total_amount) || 0,
    },
  })

  useEffect(() => {
    if (currentDebt) {
      reset({
        creditor: currentDebt.creditor || '',
        current_month_due: Number(currentDebt.current_month_due) || 0,
        repaid_amount: Number(currentDebt.repaid_amount) || 0,
        total_amount: Number(currentDebt.total_amount) || 0,
      })
    }
  }, [currentDebt, reset])

  const { mutate: updateDebt, isPending } = useUpdateDebtMutation({
    onSuccess: () => {
      setVisible(false)
      reset()
    },
  })
  const handleSubmit = async () => {
    const valid = await trigger()
    if (!valid) return
    const values = getValues()
    if (!currentDebt?.id) {
      Toast.show({
        icon: 'fail',
        content: '小账童没找到账单!',
      })
      return
    }
    updateDebt({ id: currentDebt?.id, request: values })
    setCurrentDebt(undefined)
  }

  return (
    <ZPopup
      visible={visible}
      position='bottom'
      bodyStyle={{ height: '70vh' }}
      onMaskClick={() => {
        setVisible(false)
        reset()
      }}
      onClose={() => {
        setVisible(false)
        reset()
      }}
      className={styles.form}>
      <Flex justify='center'>
        <Text size='large'>编辑{currentDebt?.creditor}</Text>
      </Flex>

      <Space align='center' className={styles.row}>
        <Text size='large'>欠款方：</Text>
        <div>
          <Controller
            name='creditor'
            control={control}
            render={({ field }) => <ZInput {...field} placeholder='欠款方' />}
          />
          {errors.creditor && (
            <Text size='small' type='danger'>
              {errors.creditor?.message}
            </Text>
          )}
        </div>
      </Space>

      <Space align='center' className={styles.row}>
        <Text size='large'>本月应还：</Text>
        <div>
          <Controller
            name='current_month_due'
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
                placeholder='本月应还金额'
              />
            )}
          />
          {errors.current_month_due && (
            <Text size='small' type='danger'>
              {errors.current_month_due?.message}
            </Text>
          )}
        </div>
      </Space>

      <Space align='center' className={styles.row}>
        <Text size='large'>已还金额：</Text>
        <div>
          <Controller
            name='repaid_amount'
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
                placeholder='已还金额'
              />
            )}
          />
          {errors.repaid_amount && (
            <Text size='small' type='danger'>
              {errors.repaid_amount?.message}
            </Text>
          )}
        </div>
      </Space>

      <Space align='center' className={styles.row}>
        <Text size='large'>总欠款金额：</Text>
        <div>
          <Controller
            name='total_amount'
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
                placeholder='总欠款金额'
              />
            )}
          />
          {errors.total_amount && (
            <Text size='small' type='danger'>
              {errors.total_amount?.message}
            </Text>
          )}
        </div>
      </Space>

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
export default EditPrepayment
