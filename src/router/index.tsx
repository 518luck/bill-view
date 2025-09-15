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
const NotFound = lazy(() => import('@/container/NotFound'))
const Tally = lazy(() => import('@/container/Tally'))

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
  { path: '/allBills', component: AllBills },
  { path: '/tally', component: Tally },
  { path: '/user', component: User },
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
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])
export default router
