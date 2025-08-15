"use client";

import React, { useState, useRef, useEffect } from "react";
import Button from "@/UI/Button";
import PlanetIcon from "../../../public/icons/PlanetIcon";

// Типы для языков
export interface Language {
  code: string;
  name: string;
  flag: string;
  nativeName?: string;
}

// Встроенные языки
export const defaultLanguages: Language[] = [
  {
    code: "ru",
    name: "Русский",
    flag: "🇷🇺",
    nativeName: "Русский",
  },
  {
    code: "en",
    name: "English",
    flag: "🇺🇸",
    nativeName: "English",
  },
];

// Пропсы компонента
export interface LanguageSelectorProps {
  languages?: Language[];
  currentLanguage?: Language;
  variant?: "full" | "compact";
  className?: string;
}

// Иконка стрелки вниз
const ChevronDownIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  languages = defaultLanguages,
  currentLanguage = defaultLanguages[0],
  variant = "full",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Закрытие дропдауна при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLanguageSelect = (language: Language) => {
    setIsOpen(false);
  };

  // Компактный вариант (только флаг)
  if (variant === "compact") {
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <Button
          variant="dark"
          className="!p-2 !min-w-0"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-lg">{currentLanguage.flag}</span>
        </Button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-2 bg-surface border border-white/10 rounded-lg shadow-lg z-50 min-w-[120px]">
            {languages.map((language) => (
              <button
                key={language.code}
                className={`w-full flex items-center px-3 py-2 text-sm text-white hover:bg-white/10 transition-colors ${
                  language.code === currentLanguage.code ? "bg-primary" : ""
                }`}
                onClick={() => handleLanguageSelect(language)}
              >
                <span className="text-lg mr-2">{language.flag}</span>
                <span className="truncate">{language.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Полный вариант (как на скриншоте)
  return (
    <div className={`relative max-h-[44px] ${className}`} ref={dropdownRef}>
      <Button
        variant="outline"
        className="w-full max-h-[44px] justify-between !px-3 !py-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <PlanetIcon />
            <span className="text-white font-medium">
              {currentLanguage.name}
            </span>
          </div>
          <ChevronDownIcon />
        </div>
      </Button>

      {isOpen && (
        <div className="absolute top-full overflow-hidden left-0 right-0 bg-surface border border-background rounded-[16px] z-1">
          {languages.map((language) => (
            <button
              key={language.code}
              className={`w-full max-h-[44px] flex items-center px-4 py-[11px] text-white hover:bg-white/10 transition-colors ${
                language.code === currentLanguage.code
                  ? "bg-primary !hover:bg-primary/70"
                  : ""
              }`}
              onClick={() => handleLanguageSelect(language)}
            >
              <span className="text-lg mr-3">{language.flag}</span>
              <div className="flex flex-col items-start">
                <span className="font-medium">{language.name}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
