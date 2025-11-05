import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input } from 'antd-mobile'
import gsap from 'gsap'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, type RegisterSchema } from './schema/register.schema'

import styles from './styles.module.less'
import logo from '@/assets/svg/logo.svg'
import { useCanvasBreathingEffect } from '@/hook'
import { useRegisterMutation, useSendCodeMutation } from '@/api'
import Text from '@/components/Text'
import Flex from '@/components/Flex'

const Register = () => {
  const {
    control,
    reset,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', verificationCode: '', password: '' },
  })
  const text = '小账童'
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(0)

  // 注册API
  const { mutate: registerMutate, isPending: registerPending } =
    useRegisterMutation({
      onSuccess: () => {
        navigate('/tally')
        reset()
      },
    })
  // 发送验证码API
  const { mutate: sendCodeMutate, isPending: sendCodePending } =
    useSendCodeMutation()

  const canvasRef = useCanvasBreathingEffect()
  const textRef = useRef<HTMLSpanElement>(null)

  // 文字动画
  useEffect(() => {
    const char = textRef.current?.querySelectorAll('span')
    if (!char) return
    gsap.from(char, {
      opacity: 0,
      duration: 1,
      ease: 'bounce.out',
      stagger: 0.2,
    })
  }, [])

  // 注册
  const handleRegister = async () => {
    const isValid = await trigger(['email', 'verificationCode', 'password'])
    if (!isValid) return
    const values = getValues()
    registerMutate(values)
  }

  // 发送验证码
  const handleSendCode = async () => {
    const isValid = await trigger(['email'])
    if (!isValid) return
    const values = getValues(['email'])
    sendCodeMutate({ email: values?.[0] })
    setCountdown(60)
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  return (
    <div className={styles.login}>
      <canvas ref={canvasRef} className={styles.canvas_bg}></canvas>
      <div className={styles.login_header}>
        <div className={styles.login_logo}>
          <img src={logo} alt='login' />
        </div>
        <div className={styles.login_title}>
          <span ref={textRef} className={styles.login_title_text}>
            {text.split('').map((char, i) => (
              <span key={i}>{char}</span>
            ))}
          </span>
          <div className={styles.placeholder} />
        </div>
      </div>
      <div className={styles.describe}>数字之间，藏着人生的喜怒哀乐。</div>

      <Flex direction='column' justify='center' align='center' gap={12}>
        <div className={styles.message}>
          <div className={styles.message_label}>邮箱</div>
          <div className={styles.message_input}>
            <Controller
              name='email'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder='可用于登录和找回密码'
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            {errors.email?.message && (
              <Text type='danger' size='small'>
                {errors.email.message}
              </Text>
            )}
          </div>
        </div>

        <div className={styles.message}>
          <div className={styles.message_passwordText}>密码</div>
          <div className={styles.message_input}>
            <Controller
              name='password'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder='请设置登录密码'
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            {errors.password?.message && (
              <Text type='danger' size='small'>
                {errors.password.message}
              </Text>
            )}
          </div>
        </div>

        <div className={styles.message}>
          <div className={styles.message_verifyCode}></div>
          <div className={styles.message_verifyContext}>
            <div className={styles.message_verifyContext_verifyInput}>
              <Controller
                name='verificationCode'
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder='请输入验证码'
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              {errors.verificationCode?.message && (
                <Text type='danger' size='small'>
                  {errors.verificationCode.message}
                </Text>
              )}
            </div>
            <Button
              onClick={handleSendCode}
              loading={sendCodePending}
              disabled={countdown > 0}>
              {countdown > 0 ? `${countdown}秒后重新发送` : '发送验证码'}
            </Button>
          </div>
        </div>
      </Flex>

      <div className={styles.interaction}>
        <div className={styles.interaction_register_btn}>
          <Button onClick={handleRegister} loading={registerPending}>
            注册
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Register
