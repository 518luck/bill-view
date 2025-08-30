import { Outlet } from 'react-router-dom'
import NavBar from '@/components/NavBar'

import styles from './styles/App.module.less'
import { Button } from 'zarm'

const App = () => {
  return (
    <div className={styles.app}>
      <h1>App</h1>
      <Button theme='primary'>按钮</Button>
      <Outlet />
      <NavBar />
    </div>
  )
}

export default App
