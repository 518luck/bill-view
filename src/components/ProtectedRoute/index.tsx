import { Suspense } from 'react'
import { Navigate } from 'react-router-dom'

import { useAuthStore } from '@/store'

interface ProtectedRouteProps {
  children: React.ReactNode
}

/**
 * 路由守卫组件 - 保护需要登录才能访问的页面
 *
 * @description 该组件会检查用户的登录状态（token），如果用户未登录则重定向到登录页面，
 * 如果已登录则渲染子组件并提供懒加载的Suspense包装
 *
 * @param {ProtectedRouteProps} props - 组件属性
 * @param {React.ReactNode} props.children - 需要保护的子组件
 *
 * @returns {JSX.Element} 返回Navigate重定向组件或包装在Suspense中的子组件
 *
 * @example
 * ```tsx
 * // 在路由配置中使用
 * {
 *   path: '/dashboard',
 *   element: (
 *     <ProtectedRoute>
 *       <Dashboard />
 *     </ProtectedRoute>
 *   )
 * }
 * ```
 *
 * @since 1.0.0
 * @author 多云
 */

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { token } = useAuthStore()

  if (!token) {
    return <Navigate to='/' replace />
  }

  return <Suspense fallback={<div>加载中...</div>}>{children}</Suspense>
}

export default ProtectedRoute
