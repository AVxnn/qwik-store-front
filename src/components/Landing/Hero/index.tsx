'use client'

import React from 'react'
import Button from '@/UI/Button'
import AnimatedIcon from '@/UI/AnimatedIcon'
import MoonIcon from '../../../../public/icons/MoonIcon'
import ClientsIcon from '../../../../public/icons/ClientsIcon'
import LineDashedIcon from '../../../../public/icons/LineDashedIcon'
import LineIcon from '../../../../public/icons/LineIcon'
import ClockIcon from '../../../../public/icons/ClockIcon'
import CartIcon from '../../../../public/icons/CartIcon'
import ChartIcon from '../../../../public/icons/ChartIcon'

const HeroLanding = () => {
  return (
    <div className="relative min-h-[600px] lg:min-h-[792px] flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 rounded-[16px] lg:rounded-[24px] bg-gradient-to-b from-gradient-from to-gradient-to">
        <LineDashedIcon className='text-background absolute top-0 left-0 lg:w-auto lg:h-auto' />
        <LineIcon className='text-background absolute top-[200px] lg:top-[330px] left-0 lg:w-auto lg:h-auto' />
        <LineDashedIcon className='text-background absolute rotate-180 top-[200px] lg:top-[330px] right-0 lg:w-auto lg:h-auto' />
        <LineIcon className='text-background absolute rotate-180 top-0 right-0 lg:w-auto lg:h-auto' />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 lg:px-0">
        {/* Beta Badge */}
        <div className="inline-flex items-center gap-2 bg-background backdrop-blur-sm border border-[#8077FF] rounded-full px-3 py-1.5 lg:px-4 lg:py-2 mb-6 lg:mb-8 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
          <MoonIcon className="text-[#8077FF] w-4 h-4 lg:w-5 lg:h-5" />
          <span className="text-change text-[14px] lg:text-[16px] font-regular">Beta Released</span>
        </div>

        {/* Main Title */}
        <h1 className="text-[40px] sm:text-[56px] lg:text-[72px] font-bold text-change mb-4 lg:mb-6 leading-tight">
          <span>Сервис для создания</span>
          <br />
          <span>магазина в </span>
          <span className="text-[#6378FF]">телеграм</span>
        </h1>

        {/* Subtitle */}
        <p className="text-[16px] lg:text-[18px] text-muted mb-6 lg:mb-8 max-w-2xl mx-auto">
          Всего за 2 минуты у вас будет готовый телеграм магазин.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center items-center mb-16 lg:mb-20">
          <Button 
            variant="primary" 
            size="xl" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 lg:px-8 lg:py-4 text-base lg:text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto"
          >
            Попробовать бесплатно
          </Button>
          <Button 
            variant="outline" 
            size="xl" 
            className="bg-white !text-primary border-gray-300 hover:bg-gray-50 px-6 py-3 lg:px-8 lg:py-4 text-base lg:text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto hidden lg:block"
          >
            Как это работает?
          </Button>
        </div>
      </div>

      {/* Feature Icons with Flow Lines - Desktop Only */}
      <div className=" pointer-events-none w-full mx-auto h-full lg:block">
        {/* Top Left - Clock */}
        <div className="absolute top-8 left-8 lg:top-9 lg:left-[264px]">
          <AnimatedIcon speed={0.8} amplitude={12} delay={0}>
            <div className="bg-surface backdrop-blur-sm border border-purple-400/30 rounded-[18px] p-4 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              <ClockIcon className="w-5 h-5 lg:w-8 lg:h-8" />
            </div>
          </AnimatedIcon>
        </div>

        {/* Mid Left - Shopping Cart */}
        <div className="absolute bottom-8 left-8 lg:top-[300px] lg:left-[184px]">
          <AnimatedIcon speed={1.2} amplitude={18} delay={500}>
            <div className="bg-surface backdrop-blur-sm border border-purple-400/30 rounded-[18px] p-4 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              <CartIcon className="w-5 h-5 lg:w-8 lg:h-8" />
            </div>
          </AnimatedIcon>
        </div>

        {/* Top Right - Analytics */}
        <div className="absolute top-8 right-8 lg:top-9 lg:right-[334px]">
          <AnimatedIcon speed={1.0} amplitude={15} delay={200}>
            <div className="bg-surface backdrop-blur-sm border border-purple-400/30 rounded-[18px] p-4 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              <ChartIcon className="w-5 h-5 lg:w-8 lg:h-8" />
            </div>
          </AnimatedIcon>
        </div>

        {/* Mid Right - People */}
        <div className="absolute bottom-8 right-8 lg:top-[431px] lg:right-[184px]">
          <AnimatedIcon speed={0.9} amplitude={14} delay={800}>
            <div className="bg-surface backdrop-blur-sm border border-purple-400/30 rounded-[18px] p-4 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              <ClientsIcon className="w-5 h-5 lg:w-8 lg:h-8" />
            </div>
          </AnimatedIcon>
        </div>
      </div>
    </div>
  )
}

export default HeroLanding
