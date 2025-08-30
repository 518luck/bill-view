import { createBrowserRouter } from 'react-router-dom'
import App from '@/App'
import Home from '@/container/Home'
import Data from '@/container/Data'
import User from '@/container/User'
import Detail from '@/container/Detail'

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
      {
        path: '/detail',
        element: <Detail />,
      },
    ],
  },
])
export default router
