import { useEffect, useState } from 'react'
import { Input, DatePicker } from 'antd-mobile'
import { evaluate } from 'mathjs'
import { type UseFormReturn, Controller } from 'react-hook-form'
import dayjs from 'dayjs'

import styles from './styles.module.less'
import type z from 'zod'
import type { createTallySchema } from './schema/create-tally.schema'
import type { createTallyRequest } from '@/api'
interface KeypadProps {
  methods: UseFormReturn<z.infer<typeof createTallySchema>>
  createTally: (data: createTallyRequest) => void
}

const Keypad = ({ methods, createTally }: KeypadProps) => {
  const [expr, setExpr] = useState('0') // 用于存储操作表达式
  const [result, setResult] = useState('完成') // 用于存储计算结果
  const [datePickerVisible, setDatePickerVisible] = useState(false)

  const today = methods.watch('date')
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
      methods.setValue('money', Number(expr))
      const values = methods.getValues()
      createTally(values)
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
        <Controller
          name='note'
          control={methods.control}
          render={({ field }) => (
            <Input {...field} placeholder='备注 : 点击填写备注' />
          )}
        />
      </div>
      <div className={styles.name}>
        <div onClick={() => handlePress('7')}>7</div>
        <div onClick={() => handlePress('8')}>8</div>
        <div onClick={() => handlePress('9')}>9</div>
        <div
          onClick={() => setDatePickerVisible(true)}
          style={{ fontSize: 12 }}>
          {today ? dayjs(today).format('YYYY/MM/DD') : '今天'}
        </div>

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
      <DatePicker
        visible={datePickerVisible}
        onCancel={() => setDatePickerVisible(false)}
        onConfirm={(date) => {
          setDatePickerVisible(false)
          methods.setValue('date', dayjs(date).format('YYYY-MM-DD'))
        }}
        className={styles.datePicker}
      />
    </div>
  )
}
export default Keypad
