import axios from 'axios'
import { Toast } from 'antd-mobile'

const server = axios.create({
  baseURL: '',
  timeout: 5000,
  withCredentials: true
})

server.interceptors.request.use((config) => {
  config.headers['Authorization'] = `Bearer ${localStorage.getItem('token') || null
    } `
  config.headers['X-Requested-With'] = 'XMLHttpRequest'
  config.headers.post['Content-Type'] = 'application/json'
  return config

}, (error) => {
  return Promise.reject(error)
})

server.interceptors.response.use((res) => {
  if (typeof res.data !== 'object') {
    Toast.show('服务端异常！')
    return Promise.reject(res)
  }
  if (res.data.code != 200) {
    if (res.data.msg) Toast.show(res.data.msg)
    if (res.data.code == 401) {
      window.location.href = '/login'
    }
    return Promise.reject(res.data)
  }

  return res.data
})

export default server
