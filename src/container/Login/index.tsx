import { Button, Input, Toast, Form, Checkbox } from 'antd-mobile'
import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import classNames from 'classnames'
import Captcha from 'react-captcha-code'

import styles from './styles.module.less'
import logo from '@/assets/logo.svg'
import { useCanvasBreathingEffect } from '@/hook/useCanvasBreathingEffect'
import { useLogin } from '@/api/http'
import { useAuthStore } from '@/store/login'

const Login = () => {
  // const { clearToken } = useAuthStore()
  const {
    data,
    mutate: loginMutate,
    // isPending,
  } = useLogin(() => {
    Toast.show({
      icon: 'success',
      content: '登录成功',
    })
  })
  const textRef = useRef<HTMLSpanElement>(null)
  const canvasRef = useCanvasBreathingEffect()
  const text = '小账童'

  const [captcha, setCaptcha] = useState('') //验证码
  const [verifyCaptcha, setVerifyCaptcha] = useState('') //验证码校验
  const [showCaptcha, setShowCaptcha] = useState(false) //是否显示验证码
  const [formValues, setFormValues] = useState({ username: '', password: '' }) //表单值

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

  const handleChange = useCallback((captcha: string) => {
    setCaptcha(captcha)
  }, [])

  const handleValuesChange = (allValues: {
    username: string
    password: string
  }) => {
    setFormValues({ ...formValues, ...allValues })
    if (formValues.username && formValues.password) {
      setShowCaptcha(true)
    } else {
      setShowCaptcha(false)
    }
  }

  const handleLogin = () => {
    setVerifyCaptcha(captcha)
    if (captcha !== verifyCaptcha) {
      Toast.show({
        icon: 'fail',
        content: '验证码错误',
      })
      return
    }

    if (data) {
      console.log('🚀 ~ handleLogin ~ formValues:', formValues)
      // useAuthStore.getState().setToken(data?.token as string)
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
      <Form onValuesChange={handleValuesChange}>
        <div className={styles.message}>
          <div className={styles.message_label}>账号</div>
          <div className={styles.message_input}>
            <Form.Item name='username'>
              <Input placeholder='请输入账号' />
            </Form.Item>
          </div>
        </div>

        <div className={classNames(styles.message)}>
          <div className={styles.message_passwordText}>密码</div>
          <div className={styles.message_input}>
            <Form.Item name='password'>
              <Input placeholder='请输入密码' />
            </Form.Item>
          </div>
        </div>

        {showCaptcha && (
          <div className={styles.captcha_box}>
            <div>
              <Form.Item name='captcha'>
                <Input placeholder='请输入验证码' value={captcha} />
              </Form.Item>
            </div>
            <div className={styles.captcha}>
              <Captcha bgColor='#202338' charNum={4} onChange={handleChange} />
              <span>看不清,点击切换</span>
            </div>
          </div>
        )}

        <div className={styles.interaction}>
          <div className={styles.interaction_btn}>
            <Button onClick={handleLogin}>登录</Button>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.footer_checkbox}>
            <Form.Item name='remember'>
              <Checkbox defaultChecked>记住我</Checkbox>
            </Form.Item>
          </div>
          <div>忘记密码</div>
        </div>
      </Form>
    </div>
  )
}

export default Login
