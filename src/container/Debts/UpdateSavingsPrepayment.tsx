import ZPopup from '@/components/ZPopup'
import styles from './styles.module.less'
import Flex from '@/components/Flex'
import Text from '@/components/Text'
import { useForm, Controller } from 'react-hook-form'
import { Space, Switch } from 'antd-mobile'
import ZInput from '@/components/ZInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { EditPrepaymentSchema } from './schema/edit-prepayment.schema'

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
    // trigger,
    // getValues,
    // reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(EditPrepaymentSchema),
    defaultValues: {},
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
      }}
      className={styles.form}>
      <Flex justify='center'>
        <Text size='large'>编辑饼图数据</Text>
      </Flex>

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
        <Text size='large'>本月应还：</Text>
        <div>
          <Switch />
        </div>
      </Space>

      <Space align='center' className={styles.row}>
        <Text size='large'>本月应还：</Text>
        <div>
          <Switch />
        </div>
      </Space>
    </ZPopup>
  )
}
export default UpdateSavingsPrepayment
