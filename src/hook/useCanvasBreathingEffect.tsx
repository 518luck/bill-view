import { useRef, useEffect } from 'react'

// 呼吸背景
export const useCanvasBreathingEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr

    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const breathCycle = (Math.sin(elapsed * 0.0015) + 1) / 2

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const radius = 1.2 + breathCycle * 0.2

      const gradient = ctx.createRadialGradient(
        canvas.width,
        0,
        0,
        canvas.width + 10,
        0,
        canvas.width * radius
      )
      gradient.addColorStop(0, 'rgba(78, 9, 237, 0.87)')
      gradient.addColorStop(0.1, 'rgba(70, 8, 210, 0.88)')
      gradient.addColorStop(0.2, 'rgba(60, 8, 180, 0.85)')
      gradient.addColorStop(0.35, 'rgba(45, 12, 120, 0.87)')
      gradient.addColorStop(0.5, 'rgba(35, 15, 80, 0.91)')
      gradient.addColorStop(0.6, 'rgba(30, 20, 50, 0.94)')
      gradient.addColorStop(0.7, 'rgba(20, 18, 40, 0.98)')
      gradient.addColorStop(0.8, 'rgba(10, 18, 30, 1)')
      gradient.addColorStop(1, 'rgba(3, 9, 18, 1)')

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return canvasRef
}
