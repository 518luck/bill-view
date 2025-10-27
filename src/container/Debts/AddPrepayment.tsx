import ZPopup from '@/components/ZPopup'
import { Space } from 'antd-mobile'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ZInput from '@/components/ZInput'
import Text from '@/components/Text'
interface AddPrepaymentProps {
  visible: boolean
  setVisible: (visible: boolean) => void
}
import {
  RequestSchema,
  type Request,
} from '@/container/Debts/schema/create-prepayment.schema'

const AddPrepayment = ({ visible, setVisible }: AddPrepaymentProps) => {
  const {
    control,
    // handleSubmit,
    // formState: { errors },
  } = useForm<Request>({
    resolver: zodResolver(RequestSchema),
  })
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
      }}>
      <Space align='center'>
        <Text size='large'>欠款方：</Text>
        <Controller
          name='creditor'
          control={control}
          render={({ field }) => <ZInput {...field} placeholder='欠款方' />}
        />
      </Space>
      <Space align='center'>
        <Text size='large'>本月应还金额：</Text>
        <Controller
          name='current_month_due'
          control={control}
          render={({ field }) => (
            <ZInput
              {...field}
              value={field.value?.toString() ?? ''}
              onChange={(val) => field.onChange(Number(val))}
              placeholder='本月应还金额'
            />
          )}
        />
      </Space>
      <Space align='center'>
        <Text size='large'>预计还清日期：</Text>
        <Controller
          name='end_date'
          control={control}
          render={({ field }) => (
            <ZInput {...field} placeholder='预计还清日期' />
          )}
        />
      </Space>
      <Space align='center'>
        <Text size='large'>已还金额：</Text>
        <Controller
          name='repaid_amount'
          control={control}
          render={({ field }) => (
            <ZInput
              {...field}
              value={field.value?.toString() ?? ''}
              onChange={(val) => field.onChange(Number(val))}
              placeholder='已还金额'
            />
          )}
        />
      </Space>
      <Space align='center'>
        <Text size='large'>欠款开始日期</Text>
        <Controller
          name='start_date'
          control={control}
          render={({ field }) => (
            <ZInput {...field} placeholder='欠款开始日期' />
          )}
        />
      </Space>
      <Space align='center'>
        <Text size='large'>欠款总额度</Text>
        <Controller
          name='total_amount'
          control={control}
          render={({ field }) => (
            <ZInput
              {...field}
              value={field.value?.toString() ?? ''}
              onChange={(val) => field.onChange(Number(val))}
              placeholder='欠款方'
            />
          )}
        />
      </Space>
    </ZPopup>
  )
}
export default AddPrepayment
