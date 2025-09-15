import styles from './index.module.less'

import { Input } from 'antd-mobile'

const Keypad = () => {
  return (
    <div className={styles.Keypad}>
      <div className={styles.header}>0.00</div>
      <div className={styles.describe}>
        <Input placeholder='备注 : 点击填写备注' />
      </div>
      <div className={styles.name}>
        <div>7</div>
        <div>8</div>
        <div>9</div>
        <div>今天</div>

        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>+</div>

        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>-</div>

        <div>.</div>
        <div>0</div>
        <div>X</div>
        <div>完成</div>
      </div>
    </div>
  )
}
export default Keypad
