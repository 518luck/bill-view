import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Button, Input, Radio } from 'zarm'
import classNames from 'classnames'
import Captcha from 'react-captcha-code'

import styles from './styles.module.less'
import logo from '@/assets/logo.svg'
import { useCanvasBreathingEffect } from '@/hook/useCanvasBreathingEffect'

const Login = () => {
  const textRef = useRef<HTMLSpanElement>(null)
  const canvasRef = useCanvasBreathingEffect()
  const text = '小账童'

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
          <Input placeholder='请输入账号' />
        </div>
      </div>
      <div className={classNames(styles.message)}>
        <div className={styles.message_passwordText}>密码</div>
        <div className={styles.message_input}>
          <Input placeholder='请输入密码' />
        </div>
      </div>
      {/* 验证码 */}
      <div className={styles.captcha}>
        <Captcha bgColor='#202338' />
      </div>

      <div className={styles.interaction}>
        <div className={styles.interaction_btn}>
          <Button theme='primary'>primary</Button>
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
