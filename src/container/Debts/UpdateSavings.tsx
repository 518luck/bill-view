import ZPopup from '@/components/ZPopup'

interface UpdateSavingsProps {
  visible: boolean
  setVisible: (visible: boolean) => void
}
const UpdateSavings = ({ visible, setVisible }: UpdateSavingsProps) => {
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
      <div>修改储蓄</div>
    </ZPopup>
  )
}
export default UpdateSavings
