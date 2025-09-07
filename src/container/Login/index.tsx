import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Toast, Form, Checkbox } from 'antd-mobile'
import gsap from 'gsap'
import classNames from 'classnames'
import Captcha from 'react-captcha-code'

import styles from './styles.module.less'
import logo from '@/assets/svg/logo.svg'
import arrows from '@/assets/svg/arrows.svg'

import { useCanvasBreathingEffect } from '@/hook/useCanvasBreathingEffect'
import { useLogin } from '@/api/http'
import { useAuthStore } from '@/store/login'
import { showDevelopingToast } from '@/utils'

import type { FormInstance } from 'antd-mobile/es/components/form'

const Login = () => {
  const { mutate: loginMutate, isPending } = useLogin(() => {
    Toast.show({
      icon: 'success',
      content: '登录成功',
    })
  })

  const navigate = useNavigate()
  const { clearToken } = useAuthStore()

  const textRef = useRef<HTMLSpanElement>(null)
  const captchaRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<FormInstance>(null)
  const canvasRef = useCanvasBreathingEffect()
  const text = '小账童'

  const [captcha, setCaptcha] = useState('') //验证码
  const [verifyCaptcha, setVerifyCaptcha] = useState('') //验证码校验
  const [showCaptcha, setShowCaptcha] = useState(false) //是否显示验证码
  const [newFormValues, setFormValues] = useState({
    username: '',
    password: '',
  }) //表单值

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

  useEffect(() => {
    if (showCaptcha && captchaRef.current) {
      gsap.set(captchaRef.current, {
        opacity: 0,
        x: -100, // 从左侧开始
        scaleX: 0.3, // 水平压缩
        scaleY: 1.2, // 垂直拉伸（果冻效果）
        transformOrigin: 'left center', // 从左侧开始变形
      })

      // 果冻弹出动画
      gsap.to(captchaRef.current, {
        opacity: 1,
        x: 0, // 滑到原位置
        scaleX: 1, // 恢复水平尺寸
        scaleY: 1, // 恢复垂直尺寸
        duration: 0.8,
        ease: 'elastic.out(1, 5)', // 弹性缓动
      })
    }
  }, [showCaptcha])

  useEffect(() => {
    if (newFormValues.username && newFormValues.password) {
      setShowCaptcha(true)
    } else {
      setShowCaptcha(false)
    }
  }, [newFormValues])

  const handleChange = useCallback((captcha: string) => {
    setCaptcha(captcha)
    setVerifyCaptcha(captcha)
  }, [])

  const handleValuesChange = (allValues: {
    username: string
    password: string
  }) => {
    setFormValues({ ...newFormValues, ...allValues })
  }

  const handleLogin = async () => {
    if (captcha !== verifyCaptcha) {
      Toast.show({
        icon: 'fail',
        content: '验证码错误',
      })
      return
    }

    try {
      await formRef.current?.validateFields()
      clearToken() //还没有获取后面需要获取
      loginMutate(newFormValues)
      navigate('/home')
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
      <Form onValuesChange={handleValuesChange} ref={formRef}>
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
              <Input
                placeholder='请输入验证码'
                value={verifyCaptcha}
                onChange={(e) => setVerifyCaptcha(e)}
              />
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
                defaultChecked
                onClick={() => {
                  showDevelopingToast()
                }}>
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
