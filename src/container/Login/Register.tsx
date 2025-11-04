import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Toast, Form } from 'antd-mobile'
import gsap from 'gsap'
import classNames from 'classnames'

import styles from './styles.module.less'
import logo from '@/assets/svg/logo.svg'
import { useCanvasBreathingEffect } from '@/hook'
import { useLoginMutation } from '@/api'
import { useAuthStore } from '@/store/login'

import type { FormInstance } from 'antd-mobile/es/components/form'

const Register = () => {
  const text = '小账童'
  const navigate = useNavigate()
  const {
    setToken,
    savedCredentials,
    rememberPassword,
    setCredentials,
    setRememberPassword,
  } = useAuthStore()

  const { mutate: loginMutate, isPending } = useLoginMutation({
    onSuccess: (responseData) => {
      setToken(responseData.token)
      navigate('/tally')
    },
  })

  const canvasRef = useCanvasBreathingEffect()
  const textRef = useRef<HTMLSpanElement>(null)
  const formRef = useRef<FormInstance>(null)

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

  // 自动填充账号密码
  useEffect(() => {
    if (savedCredentials && rememberPassword) {
      // 检查账号密码是否为空
      if (!savedCredentials.account || !savedCredentials.password) return

      // 只有当表单字段都为空时才自动填充
      if (
        !formRef.current?.getFieldValue('account') ||
        !formRef.current?.getFieldValue('password')
      ) {
        formRef.current?.setFieldsValue({
          account: savedCredentials.account,
          password: savedCredentials.password,
          remember: rememberPassword,
        })
      }
    }
  }, [savedCredentials, rememberPassword])

  // 监听表单值变化判断是否显示验证码

  const handleLogin = async () => {
    try {
      const values = await formRef.current?.validateFields()

      if (values.remember) {
        setCredentials(values.account, values.password)
      } else {
        setRememberPassword(false)
      }
      loginMutate({ account: values.account, password: values.password })

      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (error: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      if (error?.errorFields.length >= 2) {
        Toast.show({
          icon: 'fail',
          content: '请输入账号和密码',
        })
      } else {
        Toast.show({
          icon: 'fail',
          content: error.errorFields[0].errors[0],
        })
      }
    }
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

      <Form ref={formRef}>
        <div className={styles.message}>
          <div className={styles.message_label}>邮箱</div>
          <div className={styles.message_input}>
            <Form.Item
              name='account'
              rules={[{ required: true, message: '账号不能为空' }]}>
              <Input placeholder='请输入邮箱' />
            </Form.Item>
          </div>
        </div>

        <div className={classNames(styles.message)}>
          <div className={styles.message_passwordText}>密码</div>
          <div className={styles.message_input}>
            <Form.Item
              name='password'
              rules={[{ required: true, message: '密码不能为空' }]}>
              <Input placeholder='请输入密码' />
            </Form.Item>
          </div>
        </div>

        <div className={styles.interaction}>
          <div className={styles.interaction_loginBtn}>
            <Button onClick={handleLogin} loading={isPending}>
              注册
            </Button>
          </div>
        </div>
      </Form>
    </div>
  )
}

export default Register
