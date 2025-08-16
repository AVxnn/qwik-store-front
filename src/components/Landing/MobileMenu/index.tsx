'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CustomCursor from '@/UI/CustomCursor'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import LogotypeIcon from '../../../../public/icons/LogotypeIcon'
import Link from 'next/link'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { scrollToElement } = useSmoothScroll()

  const handleNavClick = (elementId: string) => {
    scrollToElement(elementId, 100)
    onClose()
  }

  const menuItems = [
    { id: 'how-it-work', label: 'Как это работает' },
    { id: 'examples', label: 'Примеры' },
    { id: 'pricing', label: 'Цены' },
    { id: 'faq', label: 'FAQ' }
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Menu */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 200,
              duration: 0.4
            }}
            className="fixed top-0 right-0 h-full w-full bg-background z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 py-6 border-b h-[100px] border-surface/20">
            <div className="flex items-center gap-2">
                <Link href="/" className="flex items-center gap-2">
                    <LogotypeIcon className='text-background' />
                    <span className="text-[18px] font-medium">QwikStore</span>
                </Link>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-surface rounded-lg transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-foreground">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Navigation */}
            <nav className="p-6 w-full flex justify-center">
              <div className="space-y-4 w-full max-w-sm">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: index * 0.1,
                      duration: 0.3,
                      ease: "easeOut"
                    }}
                  >
                    <CustomCursor 
                      size={40}
                      color="#ffffff"
                      arrowColor="#1f2937"
                      glowColor="#6378FF"
                      glowIntensity={0.2}
                      animationSpeed="normal"
                    >
                      <div 
                        onClick={() => handleNavClick(item.id)}
                        className="text-lg text-center font-medium text-foreground hover:text-primary transition-colors cursor-pointer py-4 px-6 rounded-lg hover:bg-surface/50"
                      >
                        {item.label}
                      </div>
                    </CustomCursor>
                  </motion.div>
                ))}
              </div>
            </nav>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-surface/20">
              <div className="text-center">
                <p className="text-sm text-muted mb-2">© 2025 QwikStore</p>
                <p className="text-xs text-muted">Все права защищены</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu
