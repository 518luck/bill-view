import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'

import App from '@/App'
const Home = lazy(() => import('@/container/Home'))
const Data = lazy(() => import('@/container/Data'))
const User = lazy(() => import('@/container/User'))
const Detail = lazy(() => import('@/container/Detail'))
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
  { path: '/home', component: Home },
  { path: '/deficit', component: Deficit },
  { path: '/data', component: Data },
  { path: '/user', component: User },
  { path: '/detail', component: Detail },
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
