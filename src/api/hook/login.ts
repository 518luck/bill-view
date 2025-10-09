import { useMutation } from '@tanstack/react-query'

import { postLogin } from '@/api'

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: postLogin,
  })
}
