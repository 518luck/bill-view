import { useRef, useEffect } from 'react'
import gsap from 'gsap'

// 流星线条
export const MeteorLine = () => {
  const canvasLineRef = useRef<HTMLCanvasElement>(null)
  const offsetRef = useRef(0)

  useEffect(() => {
    const canvas = canvasLineRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1

    const W = window.innerWidth
    const H = window.innerHeight
    canvas.width = W * dpr
    canvas.height = H * dpr

    ctx.strokeStyle = '#ff0000'
    ctx.lineWidth = 2
    ctx.strokeRect(0, 0, W, H)

    gsap.to(offsetRef, {
      current: 40,
      duration: 2,
      ease: 'none',
      repeat: -1,
      yoyo: true,
    })

    function draw() {
      if (!ctx || !canvas) return
      // 清除画布
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const offset = offsetRef.current

      for (let i = 8; i >= 1; i--) {
        const glowGradient = ctx.createLinearGradient(
          85 + offset,
          70,
          290 + offset,
          70
        )
        const alpha = (0.1 * (9 - i)) / 8

        glowGradient.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.2})`)
        glowGradient.addColorStop(0.3, `rgba(255, 255, 255, ${alpha * 1})`)
        glowGradient.addColorStop(0.7, `rgba(255, 255, 255, ${alpha * 0.8})`)
        glowGradient.addColorStop(1, `rgba(255, 255, 255, 0)`)

        ctx.beginPath()
        ctx.moveTo(85, 70)
        ctx.lineTo(290, 70)
        ctx.lineWidth = i * 2
        ctx.lineCap = 'round'
        ctx.strokeStyle = glowGradient
        ctx.stroke()
      }

      const lgrd = ctx.createLinearGradient(85 + offset, 70, 290 + offset, 70)
      lgrd.addColorStop(0, 'rgba(255, 255, 255, 1)')
      lgrd.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)')
      lgrd.addColorStop(0.6, 'rgba(255, 255, 255, 0.1)')
      lgrd.addColorStop(1, 'rgba(255, 255, 255, 0)')

      ctx.beginPath()
      ctx.moveTo(85, 70)
      ctx.lineTo(290, 70)
      ctx.lineWidth = 2
      ctx.lineCap = 'round'
      ctx.strokeStyle = lgrd
      ctx.stroke()

      requestAnimationFrame(draw)
    }
    draw()
  }, [])

  return canvasLineRef
}
