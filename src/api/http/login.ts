import { useApiMutation } from '@/utils/useMutation'


interface LoginResponse {
  code: number;
  msg: string;
  data: {
    token: string;
  };
}

export const useLogin = (onSuccess: (data: LoginResponse) => void) => {
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
