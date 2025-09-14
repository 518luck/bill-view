import { useEffect, useState } from 'react'
import styles from './index.module.less'

const NotFound = () => {
  const [dots, setDots] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'))
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.commonBackground}>
      <div className={styles.container}>
        <div className={styles.icon}>
          <div className={styles.gear}>
            <div className={styles.gearInner}></div>
          </div>
          <div className={styles.gear2}>
            <div className={styles.gearInner}></div>
          </div>
        </div>

        <h1 className={styles.title}>正在开发中{dots}</h1>
        <p className={styles.subtitle}>我们正在努力为您打造更好的体验</p>

        <div className={styles.features}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🚀</div>
            <span>性能优化</span>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>✨</div>
            <span>界面美化</span>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🔧</div>
            <span>功能完善</span>
          </div>
        </div>

        <div className={styles.progress}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill}></div>
          </div>
          <span className={styles.progressText}>开发进度 75%</span>
        </div>

        <button
          className={styles.homeButton}
          onClick={() => (window.location.href = '/')}>
          <span className={styles.homeIcon}>🏠</span>
          返回首页
        </button>
      </div>
    </div>
  )
}

export default NotFound
