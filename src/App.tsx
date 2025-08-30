import { useEffect, useMemo, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import NavBar from '@/components/NavBar'

import styles from './styles/App.module.less'
import { Button } from 'zarm'

const App = () => {
  const location = useLocation()
  const { pathname } = location

  const [show, setShow] = useState(true)

  const isShow = useMemo(() => ['/', '/data', '/user'], [])

  useEffect(() => {
    setShow(isShow.includes(pathname))
  }, [pathname, isShow])

  return (
    <div className={styles.app}>
      <h1>App</h1>
      <Button theme='primary'>按钮</Button>
      <Outlet />
      <NavBar show={show} />
    </div>
  )
}

export default App
