'use client'

import React, { useState } from 'react'
import Button from '@/UI/Button'
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
    <div className="py-24 bg-background">
      {/* Header Section */}
      <div className="flex flex-col relative md:flex-row items-center justify-between mb-8 max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-foreground text-[56px] font-regular mb-8 md:mb-0">
          Цены
        </h2>

          {/* Month/Year Toggle */}
          <div className="flex absolute left-[calc(50%-89px)] bg-surface rounded-full p-1">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-5 py-1.5 rounded-full text-[16px] font-regular transition-all duration-200 ${
                !isYearly 
                  ? 'bg-primary text-white' 
                  : 'text-muted hover:text-foreground'
              }`}
            >
              Месяц
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-5 py-1.5 rounded-full text-[16px] font-regular transition-all duration-200 ${
                isYearly 
                  ? 'bg-primary text-white' 
                  : 'text-muted hover:text-foreground'
              }`}
            >
              Год
            </button>
          </div>

          {/* Individual Plan Button */}
          <Button
            variant="outline"
            size="lg"
            className="bg-transparent border-surface text-foreground hover:bg-surface/20 px-6 py-3 rounded-[16px] text-[16px] font-regular"
          >
            Индивидуальный тариф
          </Button>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative rounded-[24px] p-6 ${
              plan.isPopular 
                ? 'bg-gradient-to-br from-[#6378FF] to-[#2441FF] border border-blue-400/30' 
                : 'bg-surface'
            }`}
          >
            {/* Plan Name */}
            <h3 className="text-change text-[24px] font-semibold mb-2">
              {plan.name}
            </h3>

            {/* Description */}
            <p className={`text-[13px] mb-2 ${
              plan.isPopular ? 'text-[#DDDDDD]' : 'text-muted'
            }`}>
              {plan.description}
            </p>

            {/* Price */}
            <div className="mb-2 flex flex-row gap-4 items-center">
                <div className="">
                    <span className="text-change text-[42px] font-medium">
                        {isYearly ? plan.yearlyPrice : plan.monthlyPrice} ₽
                    </span>
                    <span className={`${
                    plan.isPopular ? 'text-[#DDDDDD]' : 'text-muted'
                    } text-[16px] ml-1.5`}>
                        / {isYearly ? "год" : "месяц"}
                    </span>
                </div>
                {isYearly ? <span className={`px-4 py-1 ${plan.isPopular ? "bg-background" : "bg-primary"} rounded-full text-[18px] text-white`}>-10%</span> : null}
            </div>

            {/* Quantity Badges */}
            <div className="flex flex-row gap-2 mb-6">
              {/* Products */}
              <div className={`flex flex-col w-full justify-between ${
              plan.isPopular ? 'bg-white' : 'bg-background'
            } rounded-[24px] px-6 py-4`}>
                <span className={`text-[13px] ${
              plan.isPopular ? 'text-background' : 'text-white'
            } font-regular mb-2`}>Кол-во товаров</span>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#F15B5B] rounded-[12px] flex items-center justify-center">
                    {/* Cart Icon */}
                    <CartIcon className="w-4.5 h-4.5" />
                  </div>
                  <span className={`text-[28px] ${
              plan.isPopular ? 'text-background' : 'text-white'
            } font-medium`}>{plan.products}</span>
                </div>
              </div>

              {/* Categories */}
              <div className={`flex flex-col w-full justify-between ${
              plan.isPopular ? 'bg-white' : 'bg-background'
            } rounded-[24px] px-6 py-4`}>
                <span className={`text-[13px] ${
              plan.isPopular ? 'text-background' : 'text-white'
            } font-regular mb-2`}>Кол-во категорий</span>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#4ECB71] rounded-[12px] flex items-center justify-center">
                    {/* Grid Icon */}
                    <CategoriesIcon className="w-4.5 h-4.5" />
                  </div>
                  <span className={`text-[28px] ${
              plan.isPopular ? 'text-background' : 'text-white'
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
                      <div className="p-1 bg-background rounded-full text-white">
                      <CloseIcon className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <span className={`text-[13px] font-regular ${
                    plan.includedFeatures.includes(featureIndex) 
                      ? 'text-foreground' 
                      : 'text-foreground'
                  }`}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Previous Plan Note */}
            {plan.showPreviousPlanNote && (
              <p className="text-white text-[12px] mb-4">
                Все доступы предыдущего тарифа включены в этот
              </p>
            )}
            {!plan.showPreviousPlanNote && (
              <p className="text-white text-[12px] mb-4">
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
          </div>
        ))}
      </div>
    </div>
  )
}

export default Pricing
