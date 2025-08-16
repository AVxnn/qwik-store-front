'use client'

import React from 'react'

interface ReviewCardProps {
  name: string
  role: string
  text: string
  avatar: string
}

const ReviewCard: React.FC<ReviewCardProps> = ({ name, role, text, avatar }) => {
  return (
    <div className="bg-background h-fit rounded-[32px] p-6">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <img 
            src={avatar} 
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="text-change font-bold text-[16px] mb-1">{name}</h4>
          <p className="text-muted text-[14px]">{role}</p>
        </div>
      </div>
      <p className="text-muted text-[14px] leading-relaxed line-clamp-9">
        {text}
      </p>
    </div>
  )
}

const Reviews = () => {
  const reviews = [
    {
      name: "Nikita Kologriviy",
      role: "Clothes creator",
      text: "Наши конкуренты используют непонятный интерфейс что заставляет путаться и допускать ошибки, что приводит к долгому процессу создания магазина. Мы разработали удобный и простой функционал для создания магазина, попробуйте сами)функционал для создания магазина, попробуйте сами)",
      avatar: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Anna Petrova",
      role: "Digital creator",
      text: "Наши конкуренты используют непонятный интерфейс что заставляет путаться и допускать ошибки, что приводит к долгому процессу создания магазина. Мы разработали удобный и простой функционал для создания магазина, попробуйте сами)",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Dmitry Ivanov",
      role: "E-commerce expert",
      text: "Наши конкуренты используют непонятный интерфейс что заставляет путаться и допускать ошибки, что приводит к долгому процессу создания магазина. Мы разработали удобный и простой ",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Maria Sokolova",
      role: "Content creator",
      text: "Наши конкуренты используют непонятный интерфейс что заставляет путаться и допускать ошибки, что приводит к долгому процессу создания магазина. Мы разработали удобный и простой ",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Alexey Volkov",
      role: "Startup founder",
      text: "Наши конкуренты используют непонятный интерфейс что заставляет путаться и допускать ошибки, что приводит к долгому процессу создания магазина. Мы разработали удобный и простой функционал для создания магазина, попробуйте сами)",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Elena Kuznetsova",
      role: "Marketing manager",
      text: "Наши конкуренты используют непонятный интерфейс что заставляет путаться и допускать ошибки, что приводит к долгому процессу создания магазина. Мы разработали удобный и простой функционал для создания магазина, попробуйте сами)функционал для создания магазина, попробуйте сами)",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    }
  ]

  return (
    <div className="relative py-20 px-4">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gradient-from to-gradient-to rounded-[24px]">
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1024px] mx-auto">
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="text-[56px] font-bold text-change mb-4">
            Отзывы
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
          {reviews.map((review, index) => (
            <ReviewCard
              key={index}
              name={review.name}
              role={review.role}
              text={review.text}
              avatar={review.avatar}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Reviews
