'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface ToggleOption {
  label: string
  value: string | boolean
}

interface ToggleSwitchProps {
  options: ToggleOption[]
  value: string | boolean
  onChange: (value: string | boolean) => void
  className?: string
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ 
  options, 
  value, 
  onChange, 
  className = "" 
}) => {
  const [buttonWidths, setButtonWidths] = useState<number[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])
  
  // Обновляем активный индекс при изменении значения
  useEffect(() => {
    const newActiveIndex = options.findIndex(option => option.value === value)
    setActiveIndex(newActiveIndex)
  }, [value, options])

  // Измеряем ширину кнопок после рендера
  useEffect(() => {
    const widths = buttonRefs.current.map(button => button?.offsetWidth || 0)
    setButtonWidths(widths)
  }, [options])

  // Вычисляем позицию и ширину активного элемента
  const getActivePosition = () => {
    if (buttonWidths.length === 0) return { x: 0, width: 0 }
    
    let x = 0
    for (let i = 0; i < activeIndex; i++) {
      x += buttonWidths[i] || 0
    }
    
    return {
      x: x,
      width: buttonWidths[activeIndex] || 0
    }
  }

  const activePosition = getActivePosition()

  return (
    <div className={`relative bg-surface rounded-full p-1 ${className}`}>
      {/* Animated Background Bubble */}
      <motion.div
        className="absolute inset-1 bg-gradient-to-r from-[#6378FF] to-[#2441FF] rounded-full"
        initial={false}
        animate={{
          x: activePosition.x,
          width: activePosition.width
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 20,
          mass: 1.2
        }}
        style={{
          filter: "blur(0.3px)",
          boxShadow: "0 4px 16px rgba(99, 120, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
        }}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
      />
      
      {/* Liquid Effect Overlay */}
      <motion.div
        className="absolute inset-1 bg-gradient-to-r from-[#6378FF]/20 to-[#2441FF]/20 rounded-full"
        initial={false}
        animate={{
          x: activePosition.x,
          width: activePosition.width
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 25,
          mass: 1.5
        }}
        style={{
          filter: "blur(1px)",
          opacity: 0.6
        }}
      />
      
      {/* Options */}
      <div className="relative flex">
        {options.map((option, index) => (
          <button
            key={option.value.toString()}
            ref={el => { buttonRefs.current[index] = el }}
            onClick={() => onChange(option.value)}
            className={`relative px-5 py-1.5 rounded-full text-[16px] font-regular transition-all duration-300 cursor-pointer z-10 ${
              option.value === value 
                ? 'text-white font-medium' 
                : 'text-muted hover:text-foreground'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ToggleSwitch
