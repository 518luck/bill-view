import { useEffect, useMemo, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import NavBar from '@/components/NavBar'

import styles from './styles/App.module.less'

const App = () => {
  const location = useLocation()
  const { pathname } = location

  const [show, setShow] = useState(true)

  const isShow = useMemo(
    () => ['/financialData', '/data', '/user', '/deficit', '/allBills'],
    []
  )

  useEffect(() => {
    setShow(isShow.includes(pathname))
  }, [pathname, isShow])

  return (
    <div className={styles.app}>
      <Outlet />
      <NavBar show={show} />
    </div>
  )
}

export default App
