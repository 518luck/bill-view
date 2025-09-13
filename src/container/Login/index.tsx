import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Toast, Form, Checkbox } from 'antd-mobile'
import gsap from 'gsap'
import classNames from 'classnames'
import Captcha from 'react-captcha-code'

import styles from './styles.module.less'
import logo from '@/assets/svg/logo.svg'
import arrows from '@/assets/svg/arrows.svg'

import { useCanvasBreathingEffect, useJellyAnimation } from '@/hook'
import { useLoginMutation } from '@/api'
import { useAuthStore } from '@/store/login'
import { showDevelopingToast } from '@/utils'

import type { FormInstance } from 'antd-mobile/es/components/form'

const Login = () => {
  const text = '小账童'
  const navigate = useNavigate()
  const {
    setToken,
    savedCredentials,
    rememberPassword,
    setCredentials,
    setRememberPassword,
  } = useAuthStore()

  const { mutate: loginMutate, isPending } = useLoginMutation()

  const [captcha, setCaptcha] = useState('') //验证码
  const [showCaptcha, setShowCaptcha] = useState(false) //是否显示验证码
  const canvasRef = useCanvasBreathingEffect()
  const captchaRef = useJellyAnimation(showCaptcha)
  const textRef = useRef<HTMLSpanElement>(null)
  const formRef = useRef<FormInstance>(null)

  useEffect(() => {
    if (savedCredentials && rememberPassword) {
      formRef.current?.setFieldsValue({
        username: savedCredentials.username,
        password: savedCredentials.password,
        remember: rememberPassword,
      })
      // 当自动填充账号密码时显示验证码
      if (savedCredentials.username && savedCredentials.password) {
        setShowCaptcha(true)
      }
    }
  }, [savedCredentials, rememberPassword])

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

  const handleFormWatchValuesChange = (
    _: Record<string, string>,
    allValues: Record<string, string>
  ) => {
    if (allValues.username && allValues.password) {
      setShowCaptcha(true)
    } else {
      setShowCaptcha(false)
    }
  }

  const handleChange = useCallback((captcha: string) => {
    setCaptcha(captcha)
    formRef.current?.setFieldValue('verifyCaptcha', captcha)
  }, [])

  const handleLogin = async () => {
    try {
      const values = await formRef.current?.validateFields()
      if (captcha !== values.verifyCaptcha) {
        Toast.show({
          icon: 'fail',
          content: '验证码错误',
        })
        return
      }

      if (values.remember) {
        setCredentials(values.username, values.password)
        loginMutate(
          { username: values.username, password: values.password },
          {
            onSuccess: (token) => {
              Toast.show({ icon: 'success', content: '登录成功' })
              setToken(token.data.token)
              navigate('/financialData')
            },
          }
        )
      } else {
        setRememberPassword(false)
      }

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

      <Form onValuesChange={handleFormWatchValuesChange} ref={formRef}>
        <div className={styles.message}>
          <div className={styles.message_label}>账号</div>
          <div className={styles.message_input}>
            <Form.Item
              name='username'
              rules={[{ required: true, message: '账号不能为空' }]}>
              <Input placeholder='请输入账号' />
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

        {showCaptcha && (
          <div ref={captchaRef} className={styles.captcha_box}>
            <div>
              <Form.Item name='verifyCaptcha'>
                <Input placeholder='请输入验证码' />
              </Form.Item>
            </div>
            <div className={styles.captcha}>
              <Captcha
                bgColor='#202338'
                charNum={4}
                onChange={handleChange}
                className={styles.captcha_style}
              />
              <span>看不清,点击切换</span>
            </div>
          </div>
        )}

        <div className={styles.interaction}>
          <div className={styles.interaction_loginBtn}>
            <Button onClick={handleLogin} loading={isPending}>
              登录
            </Button>
          </div>

          <div className={styles.interaction_arrows}>
            <img src={arrows} alt='arrows' />
          </div>

          <div className={styles.interaction_registerBtn}>
            <Button
              onClick={() => {
                showDevelopingToast()
              }}
              className={styles.interaction_registerBtn_text}>
              注册
            </Button>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.footer_checkbox}>
            <Form.Item name='remember'>
              <Checkbox
                checked={rememberPassword}
                onChange={(checked) => setRememberPassword(checked)}>
                记住我
              </Checkbox>
            </Form.Item>
          </div>
          <div
            onClick={() => {
              showDevelopingToast()
            }}>
            忘记密码
          </div>
        </div>
      </Form>
    </div>
  )
}

export default Login
