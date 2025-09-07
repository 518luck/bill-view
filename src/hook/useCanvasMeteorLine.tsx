import { useRef, useEffect } from 'react'
import gsap from 'gsap'

export const MeteorLine = () => {
  const canvasLineRef = useRef<HTMLCanvasElement>(null)
  const progressRef = useRef(0)

  useEffect(() => {
    const canvas = canvasLineRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const W = 600,
      H = 200
    canvas.width = W
    canvas.height = H

    const start = { x: 50, y: 100 }
    const end = { x: 550, y: 100 }
    const dx = end.x - start.x,
      dy = end.y - start.y
    const totalLen = Math.hypot(dx, dy)
    const ux = dx / totalLen,
      uy = dy / totalLen
    const len = 200 // 流星可见长度

    // GSAP 补间 progress
    gsap.to(progressRef, {
      current: 1,
      duration: 2,
      ease: 'none',
      repeat: -1,
      modifiers: {
        current: (v) => (parseFloat(v) % 1).toFixed(3),
      },
    })

    function draw() {
      if (!ctx) return
      ctx.clearRect(0, 0, W, H)
      ctx.lineCap = 'round'

      const progress = progressRef.current
      const headDist = progress * (totalLen + len)
      const tailDist = headDist - len

      const head = { x: start.x + ux * headDist, y: start.y + uy * headDist }
      const tail = { x: start.x + ux * tailDist, y: start.y + uy * tailDist }

      const grad = ctx.createLinearGradient(tail.x, tail.y, head.x, head.y)
      grad.addColorStop(0, 'rgba(255,200,60,0)')
      grad.addColorStop(1, 'rgba(255,200,60,1)')

      ctx.strokeStyle = grad
      ctx.lineWidth = 6

      ctx.beginPath()
      ctx.moveTo(tail.x, tail.y)
      ctx.lineTo(head.x, head.y)
      ctx.stroke()

      requestAnimationFrame(draw)
    }
    draw()
  }, [])

  return canvasLineRef
}
