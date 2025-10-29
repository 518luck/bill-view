import ZPopup from '@/components/ZPopup'
import { Button, Space, DatePicker } from 'antd-mobile'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ZInput from '@/components/ZInput'
import Text from '@/components/Text'
import { useCreateDebtMutation } from '@/api'

import styles from './styles.module.less'
interface AddPrepaymentProps {
  visible: boolean
  setVisible: (visible: boolean) => void
}
import {
  RequestSchema,
  type Request,
} from '@/container/Debts/schema/create-prepayment.schema'
import Flex from '@/components/Flex'
import { useState } from 'react'
import dayjs from 'dayjs'

const AddPrepayment = ({ visible, setVisible }: AddPrepaymentProps) => {
  const {
    control,
    trigger,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<Request>({
    resolver: zodResolver(RequestSchema),
    defaultValues: {
      creditor: '',
      current_month_due: 0,
      end_date: '',
      repaid_amount: 0,
      start_date: '',
      total_amount: 0,
    },
  })
  const [datePickerVisible, setDatePickerVisible] = useState(false)
  const [currentDateField, setCurrentDateField] = useState<
    'end_date' | 'start_date' | null
  >(null)

  // 处理日期选择确认
  const handleDateConfirm = (date: Date) => {
    if (currentDateField) {
      const dateString = dayjs(date).format('YYYY-MM-DD')
      setValue(currentDateField, dateString)
    }
    setDatePickerVisible(false)
    setCurrentDateField(null)
  }

  const { mutate: createDebt, isPending } = useCreateDebtMutation({
    onSuccess: () => {
      setVisible(false)
      reset()
    },
  })
  const handleSubmit = async () => {
    const valid = await trigger()
    if (!valid) return
    const values = getValues()
    createDebt(values)
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
        <Text size='large'>还清日期：</Text>
        <div>
          <Controller
            name='end_date'
            control={control}
            render={({ field }) => (
              <div
                onClick={() => {
                  setCurrentDateField('end_date')
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
          {errors.end_date && (
            <Text size='small' type='danger'>
              {errors.end_date?.message}
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
        <Text size='large'>欠款开始日期：</Text>
        <div>
          <Controller
            name='start_date'
            control={control}
            render={({ field }) => (
              <div
                onClick={() => {
                  setCurrentDateField('start_date')
                  setDatePickerVisible(true)
                }}
                style={{ cursor: 'pointer' }}>
                <ZInput {...field} placeholder='欠款开始日期' />
              </div>
            )}
          />
          {errors.start_date && (
            <Text size='small' type='danger'>
              {errors.start_date?.message}
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

      <DatePicker
        className={styles.datePicker}
        title='选择日期'
        visible={datePickerVisible}
        onClose={() => {
          setDatePickerVisible(false)
          setCurrentDateField(null)
        }}
        onConfirm={handleDateConfirm}
        max={dayjs().add(30, 'year').toDate()}
      />
    </ZPopup>
  )
}
export default AddPrepayment
