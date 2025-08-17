'use client'

import React, { useState } from 'react'
import LogotypeIcon from '../../../../public/icons/LogotypeIcon'
import Link from 'next/link'
import Button from '@/UI/Button'
import LanguageSelector from '@/UI/LanguageSelector'
import ThemeToggle from '@/UI/ThemeToggle'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import CustomCursor from '@/UI/CustomCursor'
import MobileMenu from '../MobileMenu'
import BurgerButton from '../BurgerButton'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/hooks/useAuthStore'

const HeaderLanding = () => {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();
  const { isVisible } = useScrollDirection()
  const { scrollToElement } = useSmoothScroll()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleNavClick = (elementId: string) => {
    scrollToElement(elementId, 0) // Отступ для фиксированного хедера
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 bg-background/50 backdrop-blur-md border-b border-surface/20 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="flex relative h-[100px] py-[28px] items-center justify-between max-w-[1180px] mx-auto px-4">
            <div className="flex items-center gap-2">
                <Link href="/" className="flex items-center gap-2">
                    <LogotypeIcon className='text-background' />
                    <span className="text-[18px] font-medium">QwikStore</span>
                </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
                <CustomCursor 
                  size={36}
                  color="#ffffff"
                  arrowColor="#1f2937"
                  glowColor="#6378FF"
                  glowIntensity={0.15}
                  animationSpeed="normal"
                >
                  <div onClick={() => handleNavClick('how-it-work')} className="text-[18px] hover:text-primary transition-colors cursor-pointer">Как это работает</div>
                </CustomCursor>
                <CustomCursor 
                  size={36}
                  color="#ffffff"
                  arrowColor="#1f2937"
                  glowColor="#6378FF"
                  glowIntensity={0.15}
                  animationSpeed="normal"
                >
                <div onClick={() => handleNavClick('examples')} className="text-[18px] hover:text-primary transition-colors cursor-pointer">Примеры</div>
                </CustomCursor>
                <CustomCursor 
                  size={36}
                  color="#ffffff"
                  arrowColor="#1f2937"
                  glowColor="#6378FF"
                  glowIntensity={0.15}
                  animationSpeed="normal"
                >
                <div onClick={() => handleNavClick('pricing')} className="text-[18px] hover:text-primary transition-colors cursor-pointer">Цены</div>
                </CustomCursor>
                <CustomCursor 
                  size={36}
                  color="#ffffff"
                  arrowColor="#1f2937"
                  glowColor="#6378FF"
                  glowIntensity={0.15}
                  animationSpeed="normal"
                >
                <div onClick={() => handleNavClick('faq')} className="text-[18px] hover:text-primary transition-colors cursor-pointer">FAQ</div>
                </CustomCursor>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Desktop Controls */}
              <div className="hidden lg:flex items-center gap-2">
                <ThemeToggle />
                <LanguageSelector className="rounded-[16px] hover:shadow-[0_0px_8px_0px_#8077FF]" />
                {isAuthenticated ? (    
                  <Button onClick={() => router.push("/dashboard")} variant="landing" size="lg" className="text-[18px] font-regular h-[44px]">
                    <span>Панель</span>
                  </Button>
                ) : isLoading ? (
                  <Button variant="landing" size="lg" className="text-[18px] font-regular h-[44px]">Загрузка...</Button>
                ) : (
                  <Button onClick={() => router.push("/login")} variant="landing" size="lg" className="text-[18px] font-regular h-[44px]">Войти</Button>
                )}              </div>
              
              {/* Mobile Controls */}
              <div className="lg:hidden flex items-center gap-2">
                <ThemeToggle />
                {isAuthenticated ? (    
                  <Button onClick={() => router.push("/dashboard")} variant="landing" size="lg" className="text-[18px] font-regular h-[44px]">
                    <span>Панель</span>
                  </Button>
                ) : isLoading ? (
                  <Button variant="landing" size="lg" className="text-[18px] font-regular h-[44px]">Загрузка...</Button>
                ) : (
                  <Button onClick={() => router.push("/login")} variant="landing" size="lg" className="text-[18px] font-regular h-[44px]">Войти</Button>
                )}
                <BurgerButton isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />

              </div>
            </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
    </>
  )
}

export default HeaderLanding
