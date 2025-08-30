import { Button } from 'zarm'

import s from './style.module.less'

export const Index = () => {
  return (
    <div className={s.index}>
      <span>样式</span>
      <Button theme='primary'>按钮</Button>
    </div>
  )
}
