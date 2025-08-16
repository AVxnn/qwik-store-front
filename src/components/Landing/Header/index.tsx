'use client'

import React from 'react'
import LogotypeIcon from '../../../../public/icons/LogotypeIcon'
import Link from 'next/link'
import Button from '@/UI/Button'
import LanguageSelector from '@/UI/LanguageSelector'
import ThemeToggle from '@/UI/ThemeToggle'
import { useScrollDirection } from '@/hooks/useScrollDirection'

const HeaderLanding = () => {
  const { isVisible } = useScrollDirection()

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-background/50 backdrop-blur-md border-b border-surface/20 transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="flex h-[100px] py-[28px] items-center justify-between max-w-[1180px] mx-auto px-4">
          <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2">
                  <LogotypeIcon className='text-background' />
                  <span className="text-[18px] font-medium">QwikStore</span>
              </Link>
          </div>
          <div className="flex items-center gap-6">
              <Link href="" className="text-[18px] hover:text-primary transition-colors">Как это работает</Link>
              <Link href="" className="text-[18px] hover:text-primary transition-colors">Примеры</Link>
              <Link href="" className="text-[18px] hover:text-primary transition-colors">Цены</Link>
              <Link href="" className="text-[18px] hover:text-primary transition-colors">Обновления</Link>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
              <LanguageSelector className="border-1 border-surface rounded-[16px] hover:shadow-[0_0px_8px_0px_#8077FF]" />
              <Button variant="landing" size="lg" className="text-[18px] font-regular h-[44px]">Войти</Button>
          </div>
      </div>
    </header>
  )
}

export default HeaderLanding
