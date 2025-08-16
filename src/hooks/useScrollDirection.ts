'use client'

import { useState, useEffect } from 'react'

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null)
  const [prevScrollY, setPrevScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Если мы в самом верху страницы, показываем шапку
      if (currentScrollY <= 50) {
        setIsVisible(true)
        setScrollDirection(null)
        setPrevScrollY(currentScrollY)
        return
      }
      
      // Определяем направление скролла с порогом
      const scrollThreshold = 10 // Минимальное расстояние для определения направления
      
      if (currentScrollY > prevScrollY + scrollThreshold) {
        // Скролл вниз
        setScrollDirection('down')
        setIsVisible(false)
      } else if (currentScrollY < prevScrollY - scrollThreshold) {
        // Скролл вверх
        setScrollDirection('up')
        setIsVisible(true)
      }
      
      setPrevScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [prevScrollY])

  return { scrollDirection, isVisible }
}
