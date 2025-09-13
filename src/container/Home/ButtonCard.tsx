import styles from './styles.module.less'

interface ButtonCardProps {
  number: string | number
  text: string
  numberColor: string
}

const ButtonCard = ({ number, text, numberColor }: ButtonCardProps) => {
  return (
    <div className={styles.buttonCard}>
      <div className={styles.buttonCard_number} style={{ color: numberColor }}>
        {number}
      </div>
      <span className={styles.buttonCard_text}>{text}</span>
    </div>
  )
}

export default ButtonCard
