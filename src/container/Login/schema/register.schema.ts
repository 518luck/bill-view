import { z } from 'zod'

export const registerSchema = z.object({
  email: z.string().min(1, '邮箱不能为空').email('邮箱格式不正确'),
  verificationCode: z.string().min(6, '验证码至少6位').max(6, '验证码最多6位'),
  password: z.string().min(8, '密码至少8位').max(32, '密码最多32位'),
})
export type RegisterSchema = z.infer<typeof registerSchema>
