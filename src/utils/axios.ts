import axios from 'axios'
import { ENV } from '@/config/global.config'
import { useAuthStore } from '@/store/login'

export const getAuthToken = () => {
  return useAuthStore.getState().token
}

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
  (successCallback) => {
    const token = getAuthToken()
    successCallback.headers['Authorization'] = `Bearer ${token || null} `
    return successCallback
  },
  (errorCallback) => {
    return Promise.reject(errorCallback)
  }
)

server.interceptors.response.use(
  (successCallback) => {
    const successCodes = [200, 201]
    if (!successCodes.includes(successCallback.status)) {
      if (successCallback.status == 401) {
        window.location.href = '/'
      }
      return Promise.reject(successCallback.data)
    }

    return successCallback.data
  },
  (errorCallback) => {
    if (errorCallback.status == 401) {
      // window.location.href = '/'
      return Promise.reject(errorCallback.response.data)
    }
    return Promise.reject(errorCallback.response.data)
  }
)

export default server
