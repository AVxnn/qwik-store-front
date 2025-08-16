'use client'

import { motion } from 'framer-motion'
import React from 'react'
import CustomCursor from '@/UI/CustomCursor'

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
    <div id="examples" className="py-24 px-4 bg-background">
      {/* Heading */}
      <h2 className="text-foreground text-[56px] font-regular mb-8">
        Примеры
      </h2>

      {/* Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
        {brands.map((brand, index) => (
          <CustomCursor 
            key={index}
            size={52}
            color="#ffffff"
            arrowColor="#1f2937"
            glowColor="#6378FF"
            glowIntensity={0.1}
            animationSpeed="normal"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1 }} 
              className="bg-surface rounded-[24px] p-6 h-128 flex flex-col shadow-lg hover:shadow-xl cursor-none"
            >
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
            </motion.div>
          </CustomCursor>
        ))}
      </div>
    </div>
  )
}

export default Examples
