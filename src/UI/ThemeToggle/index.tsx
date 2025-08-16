'use client'

import React from 'react'
import Button from '@/UI/Button'
import SunIcon from '../../../public/icons/SunIcon'
import MoonIcon from '../../../public/icons/MoonIcon'
import { useTheme } from '@/hooks/useTheme'

interface ThemeToggleProps {
  className?: string
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { isDark, isLoaded, toggleTheme } = useTheme()

  // Не показываем кнопку пока тема не загружена
  if (!isLoaded) {
    return (
      <Button
        variant="landing"
        size="lg"
        className={`text-[18px] font-regular h-[44px] w-[44px] !p-3 ${className}`}
        disabled
      >
        <div className="w-5 h-5 animate-pulse bg-current opacity-50 rounded" />
      </Button>
    )
  }

  return (
    <Button
      variant="landing"
      size="lg"
      onClick={toggleTheme}
      className={`text-[18px] font-regular h-[44px] w-[44px] !p-3 ${className}`}
      title={isDark ? 'Переключить на светлую тему' : 'Переключить на темную тему'}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </Button>
  )
}

export default ThemeToggle
