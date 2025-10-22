import {
  useQueryClient,
  useMutation,
  useQuery,
  type UseMutationOptions,
  type UseMutationResult,
  type UseQueryOptions,
} from '@tanstack/react-query'
import {
  createIcon,
  createTally,
  deleteIcon,
  getIconList,
  type createIconRequest,
  type createIconResponse,
  type createTallyRequest,
  type createTallyResponse,
  type deleteIconRequest,
  type deleteIconResponse,
  type getIconListRequest,
  type IconListResponse,
} from '@/api'
import { Toast } from 'antd-mobile'
import type { ApiError } from '@/api/types'

//创建icon(购物,工资...)
export const useCreateIconMutation = (
  options?: UseMutationOptions<createIconResponse, ApiError, createIconRequest>
): UseMutationResult<createIconResponse, ApiError, createIconRequest> => {
  const queryClient = useQueryClient()

  const { onSuccess, onError, ...restOptions } = options || {}

  return useMutation({
    mutationFn: (data) => createIcon(data),
    onSuccess: (data, variables, context, mutation) => {
      queryClient.invalidateQueries({ queryKey: ['iconList'] })

      Toast.show({ icon: 'success', content: '创建成功' })
      onSuccess?.(data, variables, context, mutation)
    },
    onError: (error, variables, context, mutation) => {
      Toast.show({
        icon: 'fail',
        content: error?.message || '创建失败',
      })
      onError?.(error, variables, context, mutation)
    },
    ...restOptions,
  })
}

//获取Icon列表
export const useGetIconList = (
  type: getIconListRequest,
  options?: UseQueryOptions<IconListResponse, ApiError>
) => {
  const { ...restOptions } = options || {}

  return useQuery({
    queryKey: ['iconList', type],
    queryFn: () => getIconList(type),
    ...restOptions,
  })
}

// 创建账单
export const useCreateTallyMutation = (
  options?: UseMutationOptions<
    createTallyResponse,
    ApiError,
    createTallyRequest
  >
): UseMutationResult<createTallyResponse, ApiError, createTallyRequest> => {
  const queryClient = useQueryClient()

  const { onSuccess, onError, ...restOptions } = options || {}

  return useMutation({
    mutationFn: (data) => createTally(data),
    onSuccess: (data, variables, context, mutation) => {
      queryClient.invalidateQueries({ queryKey: ['tallyList'] })

      Toast.show({ icon: 'success', content: '创建成功' })
      onSuccess?.(data, variables, context, mutation)
    },
    onError: (error, variables, context, mutation) => {
      Toast.show({
        icon: 'fail',
        content: error?.message || '创建失败',
      })
      onError?.(error, variables, context, mutation)
    },
    ...restOptions,
  })
}

// 删除自定义的图标
export const useDeleteIcon = (
  options?: UseMutationOptions<deleteIconResponse, ApiError, deleteIconRequest>
): UseMutationResult<deleteIconResponse, ApiError, deleteIconRequest> => {
  const queryClient = useQueryClient()

  const { onSuccess, onError, ...restOptions } = options || {}

  return useMutation({
    mutationFn: (data) => deleteIcon(data),
    onSuccess: (data, variables, context, mutation) => {
      queryClient.invalidateQueries({ queryKey: ['iconList'] })

      Toast.show({ icon: 'success', content: '删除成功' })
      onSuccess?.(data, variables, context, mutation)
    },
    onError: (error, variables, context, mutation) => {
      Toast.show({
        icon: 'fail',
        content: error?.message || '删除失败',
      })
      onError?.(error, variables, context, mutation)
    },
    ...restOptions,
  })
}
