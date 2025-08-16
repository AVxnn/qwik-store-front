'use client'

import { useState, useEffect, useRef } from 'react'

interface MousePosition {
  x: number
  y: number
}

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const animationRef = useRef<number | undefined>(undefined)
  const lastPosition = useRef<MousePosition>({ x: 0, y: 0 })

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      lastPosition.current = { x: ev.clientX, y: ev.clientY }
      
      // Используем requestAnimationFrame для throttling
      if (!animationRef.current) {
        animationRef.current = requestAnimationFrame(() => {
          setMousePosition(lastPosition.current)
          animationRef.current = undefined
        })
      }
    }

    window.addEventListener('mousemove', updateMousePosition)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return mousePosition
}
