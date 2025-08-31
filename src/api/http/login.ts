import { useApiMutation } from '@/utils/useMutation'

export const useLogin = (onSuccess: () => void) => {
  return useApiMutation({
    url: '/login',
    method: 'POST',
    invalidateKeys: ['user'],
    onSuccess,
  })
}
