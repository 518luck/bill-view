import { createBrowserRouter } from 'react-router-dom'
import { Index } from '@/container/Index'
import { About } from '@/container/About'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/about',
    element: <About />,
  },
])
export default router
