'use client'

import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useMousePosition } from '@/hooks/useMousePosition'
import { motion, AnimatePresence } from 'framer-motion'

interface CustomCursorProps {
  children: React.ReactNode
  className?: string
  cursorClassName?: string
  showArrow?: boolean
  size?: number
  color?: string
  arrowColor?: string
  glowColor?: string
  glowIntensity?: number
  animationSpeed?: 'slow' | 'normal' | 'fast'
}

const CustomCursor: React.FC<CustomCursorProps> = ({ 
  children, 
  className = '',
  cursorClassName = '',
  showArrow = true,
  size = 40,
  color = 'white',
  arrowColor = '#1f2937',
  glowColor = 'white',
  glowIntensity = 0.2,
  animationSpeed = 'normal'
}) => {
  const { x: mouseX, y: mouseY } = useMousePosition()
  const [isHovering, setIsHovering] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const lastMousePosition = useRef({ x: 0, y: 0 })

  const animationSpeedClass = {
    slow: 'animate-pulse',
    normal: 'animate-pulse',
    fast: 'animate-ping'
  }

  // Плавное обновление позиции курсора
  const updateCursorPosition = useCallback(() => {
    if (isHovering) {
      const targetX = mouseX - size / 2
      const targetY = mouseY - size / 2
      
      // Плавная интерполяция для более мягкого движения
      const lerp = 0.15 // Коэффициент сглаживания (0-1)
      const newX = lastMousePosition.current.x + (targetX - lastMousePosition.current.x) * lerp
      const newY = lastMousePosition.current.y + (targetY - lastMousePosition.current.y) * lerp
      
      lastMousePosition.current = { x: newX, y: newY }
      setCursorPosition({ x: newX, y: newY })
    }
    
    animationRef.current = requestAnimationFrame(updateCursorPosition)
  }, [mouseX, mouseY, isHovering, size])

  useEffect(() => {
    if (isHovering) {
      // Инициализируем позицию курсора
      lastMousePosition.current = { x: mouseX - size / 2, y: mouseY - size / 2 }
      setCursorPosition({ x: mouseX - size / 2, y: mouseY - size / 2 })
      animationRef.current = requestAnimationFrame(updateCursorPosition)
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isHovering, updateCursorPosition, mouseX, mouseY, size])

  useEffect(() => {
    const handleMouseEnter = () => {
      setIsHovering(true)
      document.body.style.cursor = 'none'
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
      document.body.style.cursor = 'auto'
    }

    const element = containerRef.current
    if (element) {
      element.addEventListener('mouseenter', handleMouseEnter)
      element.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (element) {
        element.removeEventListener('mouseenter', handleMouseEnter)
        element.removeEventListener('mouseleave', handleMouseLeave)
      }
      document.body.style.cursor = 'auto'
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <>
      <div 
        ref={containerRef}
        className={`${className}`}
      >
        {children}
      </div>

      {/* Custom Cursor */}
      <AnimatePresence mode="wait">
        {isHovering && (
          <motion.div
            key="custom-cursor"
            initial={{ 
              opacity: 0, 
              scale: 0.3,
              y: -20,
              filter: "blur(8px)"
            }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: 0,
              filter: "blur(0px)"
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.3,
              y: 20,
              filter: "blur(8px)"
            }}
            transition={{ 
              duration: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94], // Кастомная кривая для эффекта капли
              scale: {
                duration: 0.5,
                ease: [0.34, 1.56, 0.64, 1] // Эластичная кривая для bounce эффекта
              }
            }}
            className={`fixed pointer-events-none z-[9999] ${cursorClassName}`}
            style={{
              left: cursorPosition.x,
              top: cursorPosition.y,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="relative">
              {/* Main circle with water drop effect */}
              <motion.div 
                className="rounded-full shadow-lg border border-gray-200 flex items-center justify-center overflow-hidden"
                style={{
                  width: size,
                  height: size,
                  backgroundColor: color
                }}
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.2 }
                }}
              >
                {/* Water drop shine effect */}
                <div 
                  className="absolute inset-0 rounded-full opacity-30"
                  style={{
                    background: `linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)`
                  }}
                />
                
                {showArrow && (
                  <motion.svg 
                    width={size * 0.4} 
                    height={size * 0.4} 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: arrowColor }}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    <path 
                      d="M5 12H19M19 12L12 5M19 12L12 19" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                )}
              </motion.div>
              
              {/* Glow effect with water ripple */}
              <motion.div 
                className={`absolute inset-0 rounded-full blur-md ${animationSpeedClass[animationSpeed]}`}
                style={{
                  width: size,
                  height: size,
                  backgroundColor: glowColor,
                  opacity: glowIntensity
                }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: glowIntensity }}
                transition={{ delay: 0.1, duration: 0.4 }}
              />
              
              {/* Water ripple effect */}
              <motion.div 
                className="absolute inset-0 rounded-full border-2 border-white/20"
                style={{
                  width: size,
                  height: size
                }}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ 
                  scale: [0.5, 1.2, 0.8],
                  opacity: [0, 0.5, 0]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default CustomCursor
