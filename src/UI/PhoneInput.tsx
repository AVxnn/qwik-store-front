"use client"

import React from 'react';
import { PatternFormat } from 'react-number-format';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  placeholder = "+7 (___) ___ __-__",
  className = "",
  disabled = false
}) => {
  // Обработчик изменения значения
  const handleValueChange = (values: { value: string; formattedValue: string }) => {
    const { value: numericValue } = values;
    onChange(numericValue);
  };

  // Обработчик вставки
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const numbers = pastedText.replace(/\D/g, "").slice(0, 10);
    
    if (numbers.length > 0) {
      onChange(numbers);
    }
  };

  return (
    <PatternFormat
      format="+7 (###) ### ##-##"
      value={value}
      onValueChange={handleValueChange}
      onPaste={handlePaste}
      placeholder={placeholder}
      className={`border-0 p-[12px] rounded-[16px] bg-surface text-white outline-none ${className} hover:shadow-[0_0px_8px_0px_#8077FF] focus:shadow-[0_0px_8px_0px_#8077FF] focus:ring-1 focus:ring-primary/20 transition-all duration-200`}
      disabled={disabled}
      mask="_"
      allowEmptyFormatting={true}
    />
  );
};

export default PhoneInput;
