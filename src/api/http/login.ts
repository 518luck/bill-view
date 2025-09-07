import { useApiMutation } from '@/utils/useMutation'

export const useLogin = (onSuccess: () => void) => {
  return useApiMutation({
    url: '/api/user/login',
    method: 'POST',
    invalidateKeys: ['user'],
    onSuccess,
    onError: (error) => {
      console.error('🚀 ~ useLogin ~ error:', error)
    },
  })
}
