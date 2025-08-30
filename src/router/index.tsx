import { createBrowserRouter } from 'react-router-dom'
import App from '@/App'
import Home from '@/container/Home'
import Data from '@/container/Data'
import User from '@/container/User'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/data',
        element: <Data />,
      },
      {
        path: '/user',
        element: <User />,
      },
    ],
  },
])
export default router
