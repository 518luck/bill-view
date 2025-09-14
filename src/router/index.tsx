import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'

import App from '@/App'
const Detail = lazy(() => import('@/container/Detail'))
const FinancialData = lazy(() => import('@/container/FinancialData'))
const User = lazy(() => import('@/container/User'))
const AllBills = lazy(() => import('@/container/AllBills'))
const Login = lazy(() => import('@/container/Login'))
const Deficit = lazy(() => import('@/container/Deficit'))

// 创建受保护路由的辅助函数
const createProtectedRoute = (Component: React.ComponentType) => (
  <ProtectedRoute>
    <Component />
  </ProtectedRoute>
)

// 受保护的路由配置
const protectedRoutes = [
  { path: '/financialData', component: FinancialData },
  { path: '/deficit', component: Deficit },
  { path: '/detail', component: Detail },
  { path: '/user', component: User },
  { path: '/allBills', component: AllBills },
]

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>加载中...</div>}>
            <Login />
          </Suspense>
        ),
      },
      ...protectedRoutes.map(({ path, component }) => ({
        path,
        element: createProtectedRoute(component),
      })),
    ],
  },
])
export default router
