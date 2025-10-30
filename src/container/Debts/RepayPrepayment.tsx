import ZPopup from '@/components/ZPopup'
import { Button, Space, DatePicker } from 'antd-mobile'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ZInput from '@/components/ZInput'
import Text from '@/components/Text'
import { useRepayPrepayment, type debtsResponse } from '@/api'

import styles from './styles.module.less'
interface RepayPrepaymentProps {
  visible: boolean
  setVisible: (visible: boolean) => void
  currentDebt?: debtsResponse
  setCurrentDebt: (currentDebt?: debtsResponse) => void
}
import {
  RepayPrepaymentSchema,
  type RepayPrepaymentRequest,
} from '@/container/Debts/schema/repay-prepayment.schema'
import Flex from '@/components/Flex'
import { useState } from 'react'
import dayjs from 'dayjs'

const RepayPrepayment = ({
  visible,
  setVisible,
  currentDebt,
  setCurrentDebt,
}: RepayPrepaymentProps) => {
  const {
    control,
    trigger,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<RepayPrepaymentRequest>({
    resolver: zodResolver(RepayPrepaymentSchema),
    defaultValues: {
      amount: 0,
      date: '',
    },
  })
  const [datePickerVisible, setDatePickerVisible] = useState(false)

  // 处理日期选择确认
  const handleDateConfirm = (date: Date) => {
    const dateString = dayjs(date).format('YYYY-MM-DD')
    setValue('date', dateString)
    setDatePickerVisible(false)
  }

  const { mutate: repayPrepayment, isPending } = useRepayPrepayment({
    onSuccess: () => {
      setVisible(false)
      reset()
    },
  })

  const handleSubmit = async () => {
    const valid = await trigger()
    if (!valid) return
    const values = getValues()
    if (!currentDebt?.id) return
    const data = {
      ...values,
      debt_id: currentDebt?.id,
    }
    repayPrepayment(data)
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
      <Flex justify='between'>
        <Text size='large'>还款名称</Text>
        <Text size='large'>{currentDebt?.creditor}</Text>
      </Flex>

      <Flex justify='between'>
        <Text size='large'>本月待还</Text>
        <Text size='large'>{currentDebt?.current_month_due}</Text>
      </Flex>

      <Flex justify='between'>
        <Text size='large'>已还债务</Text>
        <Text size='large'>
          {Number(currentDebt?.repaid_amount).toFixed(2)}
        </Text>
      </Flex>

      <Flex justify='between'>
        <Text size='large'>总共欠款</Text>
        <Text size='large'>{currentDebt?.total_amount}</Text>
      </Flex>

      <Flex justify='between'>
        <Text size='large'>剩余欠款</Text>
        <Text size='large'>
          {(
            Number(currentDebt?.total_amount) -
            Number(currentDebt?.repaid_amount)
          ).toFixed(2)}
        </Text>
      </Flex>
      <Space align='center' className={styles.row}>
        <Text size='large'>还款金额：</Text>
        <div>
          <Controller
            name='amount'
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
          {errors.amount && (
            <Text size='small' type='danger'>
              {errors.amount?.message}
            </Text>
          )}
        </div>
      </Space>

      <Space align='center' className={styles.row}>
        <Text size='large'>还清日期：</Text>
        <div>
          <Controller
            name='date'
            control={control}
            render={({ field }) => (
              <div
                onClick={() => {
                  setDatePickerVisible(true)
                }}
                style={{ cursor: 'pointer' }}>
                <ZInput
                  {...field}
                  readOnly
                  placeholder='预计还清日期'
                  style={{ pointerEvents: 'none' }}
                />
              </div>
            )}
          />
          {errors.date && (
            <Text size='small' type='danger'>
              {errors.date?.message}
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

      <DatePicker
        className={styles.datePicker}
        title='选择日期'
        visible={datePickerVisible}
        onClose={() => {
          setDatePickerVisible(false)
        }}
        onConfirm={handleDateConfirm}
        max={dayjs().add(30, 'year').toDate()}
      />
    </ZPopup>
  )
}
export default RepayPrepayment
