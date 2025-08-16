'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ChevronDownIcon from '../../../../public/icons/ChevronDownIcon'

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onToggle }) => {
  return (
    <motion.div 
      className="bg-surface rounded-[16px] p-6 mb-4 cursor-pointer hover:bg-surface/60"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 1 }}
      onClick={onToggle}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-change font-medium text-[18px] pr-4">
          {question}
        </h3>
        <motion.div 
          animate={{ scaleY: isOpen ? -1 : 1 }}
          transition={{ duration: 0.1, ease: "easeInOut" }}
        >
          <ChevronDownIcon className="w-6 h-6 text-change" />
        </motion.div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t border-[#404040]">
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="text-muted text-[16px] leading-relaxed"
              >
                {answer}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0) // Второй элемент открыт по умолчанию

  const faqData = [
    {
      question: "Могу ли я создать магазин сам?",
      answer: "Конечно можете, ведь наш сервис для этого и создан! Простой и интуитивно понятный интерфейс позволит вам создать полнофункциональный магазин в Telegram всего за несколько минут."
    },
    {
      question: "Какие платежные системы поддерживаются?",
      answer: "Мы поддерживаем все популярные платежные системы: ЮMoney, Сбербанк, Тинькофф, QIWI, а также криптовалютные платежи. Интеграция происходит автоматически."
    },
    {
      question: "Есть ли техническая поддержка?",
      answer: "Да, у нас есть круглосуточная техническая поддержка. Наша команда готова помочь вам с любыми вопросами по настройке и использованию сервиса."
    },
    {
      question: "Можно ли перенести существующий магазин?",
      answer: "Да, мы предоставляем инструменты для миграции данных из других платформ. Наша команда поможет перенести товары, клиентов и настройки."
    },
    {
      question: "Есть ли ограничения по количеству товаров?",
      answer: "Нет, количество товаров не ограничено. Вы можете добавлять столько товаров, сколько нужно для вашего бизнеса."
    }
  ]

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div id="faq" className="relative py-20 px-4">
      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Section Title */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-[48px] font-bold mb-4">
            <span className="text-change">Частые </span>
            <span className="text-[#6378FF]">вопросы</span>
          </h2>
        </motion.div>

        {/* FAQ Items */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            >
              <FAQItem
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default FAQ
