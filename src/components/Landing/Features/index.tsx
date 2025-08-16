'use client'

import React from 'react'

const Features = () => {
  const features = [
    {
      title: "Простота использования",
      description: "Наши конкуренты используют непонятный интерфейс что заставляет путаться и допускать ошибки, что приводит к долгому процессу создания магазина. Мы разработали удобный и простой функционал для создания магазина, попробуйте сами)"
    },
    {
      title: "Без лагов и багов)",
      description: "Наши конкуренты используют непонятный интерфейс что заставляет путаться и допускать ошибки, что приводит к долгому процессу создания магазина. Мы разработали удобный и простой функционал для создания магазина, попробуйте сами)"
    },
    {
      title: "Быстрая поддержка",
      description: "Наши конкуренты используют непонятный интерфейс что заставляет путаться и допускать ошибки, что приводит к долгому процессу создания магазина. Мы разработали удобный и простой функционал для создания магазина, попробуйте сами)"
    }
  ]

  return (
    <div className="py-24 pb-48 px-4 bg-background">
      {/* Heading */}
      <h2 className="text-foreground text-[56px] font-regular mb-8 text-center">
        Почему именно мы?
      </h2>

      {/* Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <div key={index} className="bg-surface rounded-[24px] p-8 shadow-lg hover:shadow-xl transition-all duration-200">
            {/* Card Heading */}
            <h3 className="text-foreground text-[32px] font-regular mb-6">
              {feature.title}
            </h3>
            
            {/* Card Body Text */}
            <p className="text-muted text-[16px] leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Features
