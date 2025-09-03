const originalError = console.error
console.error = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('defaultProps')) {
    return
  }
  originalError(...args)
}
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider } from 'antd-mobile'
import zhCN from 'antd-mobile/es/locales/zh-CN'
import router from '@/router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <ConfigProvider locale={zhCN}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </QueryClientProvider>
)
