import ZPopup from '@/components/ZPopup'

interface AddPrepaymentProps {
  visible: boolean
  setVisible: (visible: boolean) => void
}
const AddPrepayment = ({ visible, setVisible }: AddPrepaymentProps) => {
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
      <div>添加预支</div>
    </ZPopup>
  )
}
export default AddPrepayment
