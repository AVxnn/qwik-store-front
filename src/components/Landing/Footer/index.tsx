'use client'

import React from 'react'
import CustomCursor from '@/UI/CustomCursor'
import LogotypeIcon from '../../../../public/icons/LogotypeIcon'
import ThemeToggle from '@/UI/ThemeToggle'
import LanguageSelector from '@/UI/LanguageSelector'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'

const Footer = () => {
  const { scrollToElement } = useSmoothScroll()

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, elementId: string) => {
    e.preventDefault()
    scrollToElement(elementId, 100)
  }

  return (
    <div className="flex flex-col">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Side - Branding and Content */}
        <div className="flex-1 p-4 lg:p-8">
          {/* Top Left - Branding and Description */}
          <div className="mb-8 lg:mb-12">
            {/* Profile Picture and Brand Name */}
            <div className="flex items-center mb-4 lg:mb-6 gap-2">
              <div className="">
                {/* Placeholder for profile picture */}
                <LogotypeIcon className='text-background' />
              </div>
              <h1 className="text-[16px] lg:text-[18px] font-medium">QwikStore</h1>
            </div>
            
            {/* Service Description */}
            <p className="text-gray-400 font-regular text-sm lg:text-base leading-relaxed max-w-2xl">
              Сервис создан в целях создания магазинов, он находится в бета релизе, многие функции работаю с багами и могут быть ошибки. Если встретили подобное отпишите пожалуйста
            </p>
          </div>

          {/* Mid-Left - Contact Information */}
          <div className="flex flex-col sm:flex-row gap-8 lg:gap-16">
            {/* Email Section */}
            <div>
              <p className="text-change text-sm mb-2">Email</p>
              <CustomCursor 
                size={40}
                color="#ffffff"
                arrowColor="#1f2937"
                glowColor="#6378FF"
                glowIntensity={0.2}
                animationSpeed="normal"
              >
                <a 
                  href="mailto:thevxnn@icloud.com" 
                  className="text-[#6378FF] text-base lg:text-lg font-medium underline hover:text-primary/80 transition-colors duration-200 cursor-none"
                >
                  thevxnn@icloud.com
                </a>
              </CustomCursor>
            </div>

            {/* Telegram Section */}
            <div>
              <p className="text-change text-sm mb-2">Telegram</p>
              <CustomCursor 
                size={40}
                color="#ffffff"
                arrowColor="#1f2937"
                glowColor="#6378FF"
                glowIntensity={0.2}
                animationSpeed="normal"
              >
                <a 
                  href="https://t.me/romashkog" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#6378FF] decoration-none text-base lg:text-lg font-medium underline hover:text-primary/80 transition-colors duration-200 cursor-none"
                >
                  @romashkog
                </a>
              </CustomCursor>
            </div>
          </div>
        </div>

        {/* Right Side - Navigation */}
        <div className="w-full lg:w-80 p-4 lg:p-8">
            <div className="flex gap-4 mb-6 lg:mb-8">
            <div className="flex items-center gap-2">
                <ThemeToggle />
                <LanguageSelector className="rounded-[16px] hover:shadow-[0_0px_8px_0px_#8077FF]" />
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-3 lg:space-y-4 border border-surface p-4 rounded-[16px]">
            <a 
              href="#how-it-works" 
              onClick={(e) => handleNavClick(e, 'how-it-works')}
              className="block text-change text-sm lg:text-base hover:text-gray-300 transition-colors duration-200 cursor-pointer"
            >
              Как это работает
            </a>
            <a 
              href="#examples" 
              onClick={(e) => handleNavClick(e, 'examples')}
              className="block text-change text-sm lg:text-base hover:text-gray-300 transition-colors duration-200 cursor-pointer"
            >
              Примеры
            </a>
            <a 
              href="#pricing" 
              onClick={(e) => handleNavClick(e, 'pricing')}
              className="block text-change text-sm lg:text-base hover:text-gray-300 transition-colors duration-200 cursor-pointer"
            >
              Цены
            </a>
            <a 
              href="#updates" 
              onClick={(e) => handleNavClick(e, 'faq')}
              className="block text-change text-sm lg:text-base hover:text-gray-300 transition-colors duration-200 cursor-pointer"
            >
              FAQ
            </a>
          </nav>
        </div>
      </div>

      {/* Bottom - Footer Links */}
      <div className="p-4 lg:p-8 border-t border-[#27272A]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          {/* Copyright */}
          <p className="text-gray-400 text-xs lg:text-sm">
            © 2025 QwikStore. Все права защищены
          </p>

          {/* Legal Links */}
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
            <CustomCursor 
              size={36}
              color="#ffffff"
              arrowColor="#1f2937"
              glowColor="#6378FF"
              glowIntensity={0.15}
              animationSpeed="normal"
            >
              <a 
                href="/privacy" 
                className="text-gray-400 text-xs lg:text-sm hover:text-white transition-colors duration-200 cursor-none"
              >
                Политика конфиденциальности
              </a>
            </CustomCursor>
            <CustomCursor 
              size={36}
              color="#ffffff"
              arrowColor="#1f2937"
              glowColor="#6378FF"
              glowIntensity={0.15}
              animationSpeed="normal"
            >
              <a 
                href="/offer" 
                className="text-gray-400 text-xs lg:text-sm hover:text-white transition-colors duration-200 cursor-none"
              >
                Оферта
              </a>
            </CustomCursor>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
