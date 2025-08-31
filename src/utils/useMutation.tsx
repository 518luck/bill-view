// src/api/hooks/useMutation.tsx
import { useQueryClient, useMutation } from 'react-query'
import axios from '@/utils/axios'

interface UseMutationOptions {
  url: string
  method?: 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  invalidateKeys?: string[]
  onSuccess?: (data: any) => void //eslint-disable-line
  onError?: (error: any) => void //eslint-disable-line
}

export const useApiMutation = ({
  url,
  method = 'POST',
  invalidateKeys = [],
  onSuccess,
  onError,
}: UseMutationOptions) => {
  const queryClient = useQueryClient()

  return useMutation({
    //eslint-disable-next-line
    mutationFn: (data: any) => {
      switch (method) {
        case 'POST':
          return axios.post(url, data)
        case 'PUT':
          return axios.put(url, data)
        case 'DELETE':
          return axios.delete(url)
        case 'PATCH':
          return axios.patch(url, data)
        default:
          return axios.post(url, data)
      }
    },
    onSuccess: (data) => {
      // 刷新指定的查询缓存
      invalidateKeys.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: [key] })
      })
      onSuccess?.(data)
    },
    onError: (error) => {
      onError?.(error)
    },
  })
}
