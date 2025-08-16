'use client'

import React, { useRef, useEffect, useState } from 'react'

interface AnimatedIconProps {
  children: React.ReactNode
  className?: string
  speed?: number
  amplitude?: number
  delay?: number
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({ 
  children, 
  className = '', 
  speed = 1,
  amplitude = 15,
  delay = 0
}) => {
  const iconRef = useRef<HTMLDivElement>(null)
  const [offsetX, setOffsetX] = useState(0)
  const [offsetY, setOffsetY] = useState(0)
  const animationRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    let time = 0
    const startTime = Date.now() + delay

    const animate = () => {
      const currentTime = Date.now()
      if (currentTime < startTime) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      time += 0.02 * speed

      // Создаем хаотичное движение с помощью синусов и косинусов с разными частотами
      const x1 = Math.sin(time * 0.8) * amplitude * 0.6
      const y1 = Math.cos(time * 1.2) * amplitude * 0.7
      const x2 = Math.sin(time * 0.5 + 1.5) * amplitude * 0.4
      const y2 = Math.cos(time * 0.9 + 2.3) * amplitude * 0.5

      // Комбинируем движения для создания более сложной траектории
      const newOffsetX = x1 + x2
      const newOffsetY = y1 + y2

      setOffsetX(newOffsetX)
      setOffsetY(newOffsetY)

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [speed, amplitude, delay])

  return (
    <div 
      ref={iconRef}
      className={`transition-transform duration-1000 ease-out ${className}`}
      style={{
        transform: `translate(${offsetX}px, ${offsetY}px)`
      }}
    >
      {children}
    </div>
  )
}

export default AnimatedIcon
