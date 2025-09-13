import { useNavigate } from 'react-router-dom'
import styles from './styles.module.less'

interface ButtonCardProps {
  number: string | number
  text: string
  numberColor: string
  linkPath: string
}

const ButtonCard = ({
  number,
  text,
  numberColor,
  linkPath,
}: ButtonCardProps) => {
  const navigate = useNavigate()

  return (
    <div
      className={styles.buttonCard}
      onClick={() => {
        navigate(linkPath)
      }}>
      <div className={styles.buttonCard_number} style={{ color: numberColor }}>
        {number}
      </div>
      <span className={styles.buttonCard_text}>{text}</span>
    </div>
  )
}

export default ButtonCard
