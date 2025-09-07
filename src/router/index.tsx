import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'

import App from '@/App'
const Home = lazy(() => import('@/container/Home'))
const Data = lazy(() => import('@/container/Data'))
const User = lazy(() => import('@/container/User'))
const Detail = lazy(() => import('@/container/Detail'))
const Login = lazy(() => import('@/container/Login'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        // path: '/login',
        index: true,
        element: (
          <Suspense fallback={<div>加载中...</div>}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: '/home',
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: '/data',
        element: (
          <ProtectedRoute>
            <Data />
          </ProtectedRoute>
        ),
      },
      {
        path: '/user',
        element: (
          <ProtectedRoute>
            <User />
          </ProtectedRoute>
        ),
      },
      {
        path: '/detail',
        element: (
          <ProtectedRoute>
            <Detail />
          </ProtectedRoute>
        ),
      },
    ],
  },
])
export default router
