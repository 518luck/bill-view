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
      <Space>
        <Text size='large'>欠款方</Text>
        <Controller
          name='creditor'
          control={control}
          render={({ field }) => <ZInput {...field} placeholder='欠款方' />}
        />
      </Space>
    </ZPopup>
  )
}
export default AddPrepayment
