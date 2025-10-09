import axios from 'axios'
import { ENV } from '@/config/global.config'

const token = localStorage.getItem('token')
const API_URL = ENV.API_URL

const server = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
})

server.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = `Bearer ${token || null} `
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

server.interceptors.response.use((res) => {
  const successCodes = [200, 201]
  if (!successCodes.includes(res.status)) {
    if (res.status == 401) {
      window.location.href = '/login'
    }
    return Promise.reject(res.data)
  }

  return res.data
})

export default server
