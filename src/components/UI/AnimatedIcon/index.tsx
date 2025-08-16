'use client'

import React, { useRef, useEffect, useState } from 'react'
import { useMousePosition } from '@/hooks/useMousePosition'

interface AnimatedIconProps {
  children: React.ReactNode
  className?: string
  sensitivity?: number
  maxOffset?: number
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({ 
  children, 
  className = '', 
  sensitivity = 0.1,
  maxOffset = 20 
}) => {
  const iconRef = useRef<HTMLDivElement>(null)
  const { x: mouseX, y: mouseY } = useMousePosition()
  const [offsetX, setOffsetX] = useState(0)
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    if (!iconRef.current) return

    const rect = iconRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Вычисляем расстояние от центра иконки до мыши
    const deltaX = mouseX - centerX
    const deltaY = mouseY - centerY

    // Применяем чувствительность и ограничиваем максимальное смещение
    const newOffsetX = Math.max(-maxOffset, Math.min(maxOffset, deltaX * sensitivity))
    const newOffsetY = Math.max(-maxOffset, Math.min(maxOffset, deltaY * sensitivity))

    setOffsetX(newOffsetX)
    setOffsetY(newOffsetY)
  }, [mouseX, mouseY, sensitivity, maxOffset])

  return (
    <div 
      ref={iconRef}
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{
        transform: `translate(${offsetX}px, ${offsetY}px)`
      }}
    >
      {children}
    </div>
  )
}

export default AnimatedIcon
