import { useEffect, useState } from 'react'
import { Input } from 'antd-mobile'
import { evaluate } from 'mathjs'

import styles from './styles.module.less'

const Keypad = () => {
  const [expr, setExpr] = useState('0') // 用于存储操作表达式
  const [result, setResult] = useState('完成') // 用于存储计算结果

  // 监听 expr 变化，判断是否完成计算
  useEffect(() => {
    const isComplete =
      /(\d\s*[+\-*/]\s*\d)|(\d\s*[+\-*/]\s*\()|(\)\s*[+\-*/]\s*\d)|(\)\s*[+\-*/]\s*\()/.test(
        expr
      )
        ? '='
        : '完成'
    setResult(isComplete)
  }, [expr])

  const handlePress = (value: string) => {
    if (value === '⌫') {
      if (expr === '0') return
      setExpr(expr.slice(0, -1))
    } else if (value === '=') {
      try {
        const safeExpr = expr.replace(/\b0+(\d+)/g, '$1')
        const result = evaluate(safeExpr)
        setExpr(result.toString())
      } catch (error) {
        setExpr(`错误 - ${error}`)
      }
    } else if (value === '完成') {
      setExpr('0')
    } else {
      // 拼接数字或操作符
      setExpr(expr + value)
    }
  }
  return (
    <div className={styles.Keypad}>
      <div className={styles.header}>{expr}</div>
      <div className={styles.describe}>
        <Input placeholder='备注 : 点击填写备注' />
      </div>
      <div className={styles.name}>
        <div onClick={() => handlePress('7')}>7</div>
        <div onClick={() => handlePress('8')}>8</div>
        <div onClick={() => handlePress('9')}>9</div>
        <div onClick={() => handlePress('今天')}>今天</div>

        <div onClick={() => handlePress('4')}>4</div>
        <div onClick={() => handlePress('5')}>5</div>
        <div onClick={() => handlePress('6')}>6</div>
        <div onClick={() => handlePress('+')}>+</div>

        <div onClick={() => handlePress('1')}>1</div>
        <div onClick={() => handlePress('2')}>2</div>
        <div onClick={() => handlePress('3')}>3</div>
        <div onClick={() => handlePress('-')}>-</div>

        <div onClick={() => handlePress('.')}>.</div>
        <div onClick={() => handlePress('0')}>0</div>
        <div onClick={() => handlePress('⌫')}>⌫</div>
        <div onClick={() => handlePress(result)}>{result}</div>
      </div>
    </div>
  )
}
export default Keypad
