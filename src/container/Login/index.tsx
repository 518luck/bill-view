import { useCanvasBreathingEffect } from '@/hook/useCanvasBreathingEffect'

import styles from './styles.module.less'
import logo from '@/assets/logo.svg'

const Login = () => {
  const canvasRef = useCanvasBreathingEffect()

  return (
    <>
      <canvas ref={canvasRef} className={styles.canvas_bg}></canvas>
      <div className={styles.login_header}>
        <div className={styles.login_logo}>
          <img src={logo} alt='login' />
        </div>
        <div>小账童</div>
      </div>
    </>
  )
}

export default Login
