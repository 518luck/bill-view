const originalError = console.error
console.error = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('defaultProps')) {
    return
  }
  originalError(...args)
}
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider } from 'zarm'
import zhCN from 'zarm/lib/config-provider/locale/zh_CN'
import router from '@/router'
import 'zarm/dist/zarm.css'

createRoot(document.getElementById('root')!).render(
  <ConfigProvider primaryColor='#146cbd' theme='dark' locale={zhCN}>
    <RouterProvider router={router} />
  </ConfigProvider>
)
