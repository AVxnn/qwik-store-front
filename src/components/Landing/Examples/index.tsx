'use client'

import React from 'react'

const Examples = () => {
  const brands = [
    {
      name: "Born to be",
      description: "Бренд одежды завоевавший большое доверие среди комьюнити"
    },
    {
      name: "Supreme",
      description: "Бренд одежды завоевавший большое доверие среди комьюнити"
    },
    {
      name: "Nike",
      description: "Бренд одежды завоевавший большое доверие среди комьюнити"
    }
  ]

  return (
    <div className="py-24 px-4 bg-background">
      {/* Heading */}
      <h2 className="text-foreground text-[56px] font-regular mb-8">
        Примеры
      </h2>

      {/* Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
        {brands.map((brand, index) => (
          <div key={index} className="bg-surface rounded-[24px] p-6 h-128 flex flex-col shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer">
            {/* Text Content */}
            <div className="mb-6">
              <h3 className="text-foreground text-[32px] font-regular mb-3">
                {brand.name}
              </h3>
              <p className="text-muted text-[16px] leading-relaxed">
                {brand.description}
              </p>
            </div>

            {/* Placeholder Area */}
            <div className="bg-background -mb-6 rounded-tl-[24px] rounded-tr-[24px] flex-1"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Examples
