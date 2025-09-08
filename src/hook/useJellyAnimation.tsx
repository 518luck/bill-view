import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export const useJellyAnimation = (trigger: boolean) => {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (trigger && elementRef.current) {
      gsap.set(elementRef.current, {
        opacity: 0,
        x: -100,
        scaleX: 0.3,
        scaleY: 1.2,
        transformOrigin: 'left center',
      })

      gsap.to(elementRef.current, {
        opacity: 1,
        x: 0,
        scaleX: 1,
        scaleY: 1,
        duration: 0.8,
        ease: 'elastic.out(1, 5)',
      })
    }
  }, [trigger])

  return elementRef
}
