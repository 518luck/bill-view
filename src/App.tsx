import { useEffect, useMemo, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import NavBar from '@/components/NavBar'

import styles from '@/styles/App.module.less'

const App = () => {
  const location = useLocation()
  const { pathname } = location

  const [show, setShow] = useState(true)

  const isShow = useMemo(
    () => [
      '/financialData',
      '/detail',
      '/tally',
      '/user',
      '/deficit',
      '/allBills',
      '/debts',
    ],
    []
  )

  useEffect(() => {
    setShow(isShow.includes(pathname))
  }, [pathname, isShow])

  return (
    <div className={styles.app}>
      <div className={styles.app_common}>
        <Outlet />
      </div>
      <NavBar show={show} />
    </div>
  )
}

export default App
