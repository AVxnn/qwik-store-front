'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/UI/Button'
import ToggleSwitch from '@/components/UI/ToggleSwitch'
import CheckIcon from '../../../../public/icons/CheckIcon'
import CloseIcon from '../../../../public/icons/CloseIcon'
import CartIcon from '../../../../public/icons/CartIcon'
import CategoriesIcon from '../../../../public/icons/CategoriesIcon'

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false)

  const plans = [
    {
      name: "Старт",
      description: "Подходит для предпринимателей без большого оборота",
      monthlyPrice: 1299,
      yearlyPrice: 13999,
      products: 100,
      categories: 100,
      features: [
        "Безлимитное кол-во подписчиков и заказов",
        "Добавление до 3 баннеров",
        "Отправка до 3 рассылок в месяц",
        "Добавление до 3 изображений в товар",
        "Каталог и товары",
        "Прием платежей",
        "Доступ к аналитике",
        "Импорт товаров и каталогов",
        "Лейбл tgstore"
      ],
      includedFeatures: [0, 1, 2, 3, 4, 5, 6, 7],
      isPopular: false,
      showPreviousPlanNote: false
    },
    {
      name: "Бизнес",
      description: "Подходит для агенств, предпринимателям с хорошим оборотом и интернет магазинам",
      monthlyPrice: 2299,
      yearlyPrice: 29990,
      products: 300,
      categories: 150,
      features: [
        "Безлимитное кол-во подписчиков и заказов",
        "Добавление до 10 баннеров",
        "Отправка до 10 рассылок в месяц",
        "Добавление до 10 изображений в товар",
        "Редактирование полей в оформление заказа",
        "Добавление опций к товарам",
        "Отзывы",
        "Импорт товаров и каталогов",
        "Лейбл tgstore"
      ],
      includedFeatures: [0, 1, 2, 3, 4, 5, 6, 7],
      isPopular: true,
      showPreviousPlanNote: true
    },
    {
      name: "Корпорация",
      description: "Подходит для агенств, предпринимателям с хорошим оборотом и интернет магазинам",
      monthlyPrice: 3299,
      yearlyPrice: 43999,
      products: "∞",
      categories: "∞",
      features: [
        "Безлимитное кол-во подписчиков и заказов",
        "Добавление до 20 баннеров",
        "Отправка до 20 рассылок в месяц",
        "Добавление до 15 изображений в товар",
        "Поиск товаров и каталогов",
        "Личный кабинет клиента",
        "Привязка товаров к баннерам",
        "Цифровые товары",
        "Лейбл tgstore"
      ],
      includedFeatures: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      isPopular: false,
      showPreviousPlanNote: true
    }
  ]

  return (
    <div id="pricing" className="py-8 pb-48 bg-background">
      {/* Header Section */}
      <div className="flex flex-col relative md:flex-row items-center justify-between mb-8 max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-foreground text-[56px] font-regular mb-8 md:mb-0">
          Цены
        </h2>

          {/* Month/Year Toggle */}
          <div className="mb-4 lg:mb-0 lg:absolute left-[calc(50%-89px)]">
            <ToggleSwitch
              options={[
                { label: "Месяц", value: false },
                { label: "Год", value: true }
              ]}
              value={isYearly}
              onChange={(value) => setIsYearly(value as boolean)}
            />
          </div>

          {/* Individual Plan Button */}
          <Button
            variant="outline"
            size="lg"
            className="hidden lg:block bg-transparent border-surface text-foreground hover:bg-surface/20 px-6 py-3 rounded-[16px] text-[16px] font-regular"
          >
            Индивидуальный тариф
          </Button>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto">
        {plans.map((plan, index) => (
          <AnimatePresence 
          key={index} mode="wait">
                     <motion.div
             key={index}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.4, delay: index * 0.1 }}
             layout
             className={`relative rounded-[24px] p-6 ${
               plan.isPopular 
                 ? 'bg-gradient-to-br from-[#6378FF] to-[#2441FF] border border-blue-400/30' 
                 : 'bg-surface'
             }`}
           >
            {/* Plan Name */}
            <h3 className={`${plan.isPopular ? "text-white" : "text-change"} text-change text-[24px] font-semibold mb-2`}>
              {plan.name}
            </h3>

            {/* Description */}
            <p className={`text-[13px] mb-2 ${
              plan.isPopular ? 'text-[#DDDDDD]' : 'text-muted'
            }`}>
              {plan.description}
            </p>

            {/* Price */}
            <motion.div
                className="mb-2 overflow-hidden relative"
                animate={{ height: isYearly ? 110 : 60 }}
                initial={false}
                transition={{
                    height: { duration: 0.6, ease: "easeInOut" }
                }}
            >
                <AnimatePresence mode="wait">
                    {isYearly ? (
                        // Годовой тариф - показываем обе цены
                        <motion.div 
                            key="yearly-pricing"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ 
                                duration: 0.2, 
                                ease: [0.25, 0.46, 0.45, 0.94] // Кастомная кривая для пузырька
                            }}
                            layout
                        >
                            {/* Месячная эквивалентная цена */}
                            <div className="flex items-center gap-4">
                                <div className="flex items-baseline">
                                                                         <motion.span 
                                         initial={{ opacity: 0, scale: 0.9 }}
                                         animate={{ opacity: 1, scale: 1 }}
                                         transition={{ duration: 0.2, delay: 0.1 }}
                                         className={`${plan.isPopular ? "text-white" : "text-change"} text-[42px] font-medium`}
                                     >
                                         {plan.yearlyPrice} ₽
                                     </motion.span>
                                     <motion.span 
                                         initial={{ opacity: 0, scale: 0.9 }}
                                         animate={{ opacity: 1, scale: 1 }}
                                         transition={{ duration: 0.2, delay: 0.15 }}
                                         className={`${
                                             plan.isPopular ? 'text-[#DDDDDD]' : 'text-muted'
                                         } text-[16px] ml-1.5`}
                                     >
                                         / в год
                                     </motion.span>
                                </div>
                                <motion.span 
                                    initial={{ opacity: 0, scale: 0.3 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ 
                                        duration: 0.2, 
                                        ease: "easeOut",
                                        delay: 0.20
                                    }}
                                    className={`px-4 py-1 ${plan.isPopular ? "bg-background text-change" : "bg-primary text-white"} rounded-full text-[18px]  shadow-lg`}
                                >
                                    -20%
                                </motion.span>
                            </div>
                            
                            {/* Годовая цена */}
                                                         <div 
                                 className="flex items-baseline absolute"
                             >
                                <motion.span 
                                         initial={{ opacity: 0, scale: 0.9 }}
                                         animate={{ opacity: 1, scale: 1 }}
                                         transition={{ duration: 0.2, delay: 0.25 }} className={`${plan.isPopular ? "text-white" : "text-change"} text-[28px] font-medium`}>
                                    {Math.round(plan.yearlyPrice / 12)} ₽
                                </motion.span>
                                
                                <motion.span 
                                         initial={{ opacity: 0, scale: 0.9 }}
                                         animate={{ opacity: 1, scale: 1 }}
                                         transition={{ duration: 0.2, delay: 0.30 }} className={`${
                                    plan.isPopular ? 'text-[#DDDDDD]' : 'text-muted'
                                } text-[14px] ml-1.5`}>
                                    / в месяц
                                </motion.span>
                            </div>
                        </motion.div>
                    ) : (
                        // Месячный тариф - показываем одну цену
                        <motion.div 
                            key="monthly-pricing"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ 
                                duration: 0.2, 
                                ease: [0.25, 0.46, 0.45, 0.94]
                            }}
                            className="flex items-baseline"
                            layout
                        >
                            <motion.span 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.2, delay: 0.1 }}
                                className={`${plan.isPopular ? "text-white" : "text-change"} text-[42px] font-medium`}
                            >
                                {plan.monthlyPrice} ₽
                            </motion.span>
                            <motion.span 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.2, delay: 0.15 }}
                                className={`${
                                    plan.isPopular ? 'text-[#DDDDDD]' : 'text-muted'
                                } text-[16px] ml-1.5`}
                            >
                                / месяц
                            </motion.span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Quantity Badges */}
            <div className="flex flex-row gap-2 mb-6">
              {/* Products */}
              <div className={`flex flex-col w-full justify-between ${
              plan.isPopular ? 'bg-white' : 'bg-background'
            } rounded-[24px] px-6 py-4`}>
                <span className={`text-[13px] ${
              plan.isPopular ? 'text-black' : 'text-change'
            } font-regular mb-2`}>Кол-во товаров</span>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#F15B5B] rounded-[12px] flex items-center justify-center">
                    {/* Cart Icon */}
                    <CartIcon className="w-4.5 h-4.5 text-white" />
                  </div>
                  <span className={`text-[28px] ${
              plan.isPopular ? 'text-black' : 'text-change'
            } font-medium`}>{plan.products}</span>
                </div>
              </div>

              {/* Categories */}
              <div className={`flex flex-col w-full justify-between ${
              plan.isPopular ? 'bg-white' : 'bg-background'
            } rounded-[24px] px-6 py-4`}>
                <span className={`text-[13px] ${
              plan.isPopular ? 'text-black' : 'text-change'
            } font-regular mb-2`}>Кол-во категорий</span>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#4ECB71] rounded-[12px] flex items-center justify-center">
                    {/* Grid Icon */}
                    <CategoriesIcon className="w-4.5 h-4.5 text-white" />
                  </div>
                  <span className={`text-[28px] ${
              plan.isPopular ? 'text-black' : 'text-change'
            } font-medium`}>{plan.categories}</span>
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-3 mb-4">
              {plan.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    {plan.includedFeatures.includes(featureIndex) ? (
                      <div className="p-1 bg-primary rounded-full text-white">
                        <CheckIcon className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="p-1 bg-[#18181B] rounded-full text-white">
                        <CloseIcon className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <span className={`text-[13px] font-regular ${
                    plan.includedFeatures.includes(featureIndex) 
                      ? plan.isPopular ? "text-white" : "text-change"
                      : plan.isPopular ? "text-white" : "text-change"
                  }`}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Previous Plan Note */}
            {plan.showPreviousPlanNote && (
              <p className={`${plan.isPopular ? plan.isPopular ? "text-white" : "text-change" : 'text-change'} text-[12px] mb-4`}>
                Все доступы предыдущего тарифа включены в этот
              </p>
            )}
            {!plan.showPreviousPlanNote && (
              <p className={`${plan.isPopular ? 'text-change' : 'text-change'} text-[12px] mb-4`}>
                Тариф позволяет пользоваться всеми функциями
              </p>
            )}

            {/* CTA Button */}
            <Button
              variant={"primary"}
              size="lg"
              className={`w-full py-4 text-[16px] font-regular`}
            >
              Выбрать тариф
            </Button>
          </motion.div></AnimatePresence>
        ))}
      </div>
    </div>
  )
}

export default Pricing
