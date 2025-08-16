'use client'

import React from 'react'
import Button from '@/UI/Button'
import AnimatedIcon from '@/UI/AnimatedIcon'
import MoonIcon from '../../../../public/icons/MoonIcon'
import ClientsIcon from '../../../../public/icons/ClientsIcon'
import LineDashedIcon from '../../../../public/icons/LineDashedIcon'
import LineIcon from '../../../../public/icons/LineIcon'
import ClockIcon from '../../../../public/icons/ClockIcon'

const HeroLanding = () => {
  return (
    <div className="relative min-h-[792px] flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 rounded-[24px] bg-gradient-to-b from-[#27272A] to-[#18181B] dark:from-[#27272A] dark:to-[#18181B]">
        <LineDashedIcon className='text-background absolute top-0 left-0' />
        <LineIcon className='text-background absolute top-[330px] left-0' />
        <LineDashedIcon className='text-background absolute rotate-180 top-[330px] right-0' />
        <LineIcon className='text-background absolute rotate-180 top-0 right-0' />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Beta Badge */}
        <div className="inline-flex items-center gap-2 bg-background backdrop-blur-sm border border-[#8077FF] rounded-full px-4 py-2 mb-8 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
          <MoonIcon className="text-[#8077FF]" />
          <span className="text-change text-[16px] font-regular">Beta Released</span>
        </div>

        {/* Main Title */}
        <h1 className="text-[72px] font-bold text-white mb-6 leading-tight">
          <span>Сервис для создания</span>
          <br />
          <span>магазина в </span>
          <span className="text-[#6378FF]">телеграм</span>
        </h1>

        {/* Subtitle */}
        <p className="text-[18px] text-[#999999] mb-8 max-w-2xl mx-auto">
          Всего за 2 минуты у вас будет готовый телеграм магазин.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
          <Button 
            variant="primary" 
            size="xl" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Попробовать бесплатно
          </Button>
          <Button 
            variant="outline" 
            size="xl" 
            className="bg-white !text-primary border-gray-300 hover:bg-gray-50 px-8 py-4 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Как это работает?
          </Button>
        </div>
      </div>

      {/* Feature Icons with Flow Lines */}
      <div className="absolute z-10 pointer-events-none w-full mx-auto h-full">
        {/* Top Left - Clock */}
        <div className="absolute top-9 left-[264px]">
          <AnimatedIcon sensitivity={0.08} maxOffset={18}>
            <div className="bg-surface backdrop-blur-sm border border-purple-400/30 rounded-[18px] p-4 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              <ClientsIcon className="w-8 h-8" />
            </div>
          </AnimatedIcon>
        </div>

        {/* Mid Left - Shopping Cart */}
        <div className="absolute top-[300px] left-[184px]">
          <AnimatedIcon sensitivity={0.12} maxOffset={22}>
            <div className="bg-surface backdrop-blur-sm border border-purple-400/30 rounded-[18px] p-4 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              <ClientsIcon className="w-8 h-8" />
            </div>
          </AnimatedIcon>
        </div>

        {/* Top Right - Analytics */}
        <div className="absolute top-9 right-[334px]">
          <AnimatedIcon sensitivity={0.1} maxOffset={20}>
            <div className="bg-surface backdrop-blur-sm border border-purple-400/30 rounded-[18px] p-4 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              <ClockIcon className="w-8 h-8" />
            </div>
          </AnimatedIcon>
        </div>

        {/* Mid Right - People */}
        <div className="absolute top-[431px] right-[184px]">
          <AnimatedIcon sensitivity={0.09} maxOffset={16}>
            <div className="bg-surface backdrop-blur-sm border border-purple-400/30 rounded-[18px] p-4 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              <ClientsIcon className="w-8 h-8" />
            </div>
          </AnimatedIcon>
        </div>
      </div>
    </div>
  )
}

export default HeroLanding
