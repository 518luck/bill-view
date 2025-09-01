import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Button, Input, Radio, Toast } from 'zarm'
import type { ChangeEvent } from 'react'
import classNames from 'classnames'
import Captcha from 'react-captcha-code'

import styles from './styles.module.less'
import logo from '@/assets/logo.svg'
import { useCanvasBreathingEffect } from '@/hook/useCanvasBreathingEffect'
import { useLogin } from '@/api/http'

const Login = () => {
  const loginApi = useLogin(() => {
    Toast.show({
      icon: 'success',
      content: '登录成功',
    })
  })
  const textRef = useRef<HTMLSpanElement>(null)
  const canvasRef = useCanvasBreathingEffect()
  const text = '小账童'

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showCaptcha, setShowCaptcha] = useState(false)
  const [captcha, setCaptcha] = useState('')
  const [verifyCaptcha, setVerifyCaptcha] = useState('')

  useEffect(() => {
    if (username && password) {
      setShowCaptcha(true)
    }
  }, [username, password])

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

  const handleLogin = () => {
    if (username?.length > 10 && password?.length > 20) {
      Toast.show({
        icon: 'fail',
        content: '账号或者密码不正确',
      })
      return
    }
    setVerifyCaptcha(captcha)
    if (captcha !== verifyCaptcha) {
      Toast.show({
        icon: 'fail',
        content: '验证码错误',
      })
      return
    }

    loginApi.mutate({
      username,
      password,
    })
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
      <div className={styles.message}>
        <div className={styles.message_label}>账号</div>
        <div className={styles.message_input}>
          <Input
            placeholder='请输入账号'
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
          />
        </div>
      </div>
      <div className={classNames(styles.message)}>
        <div className={styles.message_passwordText}>密码</div>
        <div className={styles.message_input}>
          <Input
            placeholder='请输入密码'
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </div>
      </div>

      {showCaptcha && (
        <div className={styles.captcha_box}>
          <div>
            <Input
              placeholder='请输入验证码'
              value={captcha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setVerifyCaptcha(e.target.value)
              }}
            />
          </div>
          <div className={styles.captcha}>
            <Captcha bgColor='#202338' charNum={4} onChange={handleChange} />
            <span>看不清,点击切换</span>
          </div>
        </div>
      )}

      <div className={styles.interaction}>
        <div className={styles.interaction_btn}>
          <Button theme='primary' onClick={handleLogin}>
            登录
          </Button>
        </div>
      </div>

      <div className={styles.footer}>
        <div>
          <Radio defaultChecked>记住我</Radio>
        </div>
        <div>忘记密码</div>
      </div>
    </div>
  )
}

export default Login
