'use client'

import React from 'react'
import BurgerIcon from '../../../../public/icons/BurgerIcon'

interface BurgerButtonProps {
  isOpen: boolean
  onClick: () => void
}

const BurgerButton: React.FC<BurgerButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col justify-center items-center w-8 h-8 p-1 hover:bg-surface/50 rounded-lg transition-colors"
      aria-label="Toggle menu"
    >
      <BurgerIcon />
    </button>
  )
}

export default BurgerButton
