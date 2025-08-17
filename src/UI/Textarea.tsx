"use client"

import React, { useState, forwardRef } from 'react';

// Типы для Textarea компонента
export interface TextareaProps {
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  success?: boolean;
  maxLength?: number;
  minLength?: number;
  name?: string;
  id?: string;
  className?: string;
  textareaClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'outline' | 'landing';
  rows?: number;
  cols?: number;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: string) => string | null;
  };
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  placeholder,
  value,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  required = false,
  error,
  success = false,
  maxLength,
  minLength,
  name,
  id,
  className = '',
  textareaClassName = '',
  labelClassName = '',
  errorClassName = '',
  size = 'md',
  variant = 'default',
  rows = 4,
  cols,
  resize = 'vertical',
  validation,
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Базовые классы для контейнера
  const containerBaseClasses = 'relative w-full text-[16px]';

  // Классы для размеров
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  // Классы для вариантов
  const variantClasses = {
    default: 'bg-surface border border-gray-600 focus:border-primary',
    filled: 'bg-surface/50 border border-gray-600 focus:border-primary',
    landing: `bg-surface focus:border-primary hover:shadow-[0_0px_8px_0px_#8077FF] ${isFocused ? 'shadow-[0_0px_8px_0px_#8077FF]' : '!ring-0 !ring-primary/0'}`,
    outline: 'bg-transparent border border-gray-600 focus:border-primary',
  };

  // Классы для resize
  const resizeClasses = {
    none: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
    both: 'resize',
  };

  // Базовые классы для textarea
  const textareaBaseClasses = [
    'w-full rounded-[16px] transition-all duration-200 outline-none',
    'placeholder:text-muted text-change',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'px-4 py-3',
    sizeClasses[size],
    variantClasses[variant],
    resizeClasses[resize],
  ].join(' ');

  // Классы для состояний
  const stateClasses = [
    isFocused ? 'ring-2 ring-primary/20' : '',
    error || validationError ? 'border-red-500 focus:border-red-500' : '',
    success ? 'border-green-500 focus:border-green-500' : '',
  ].join(' ');

  const textareaClasses = [
    textareaBaseClasses,
    stateClasses,
    textareaClassName,
  ].join(' ');

  // Функция валидации
  const validateTextarea = (value: string): string | null => {
    if (!validation) return null;

    if (validation.required && !value.trim()) {
      return 'Это поле обязательно для заполнения';
    }

    if (validation.minLength && value.length < validation.minLength) {
      return `Минимальная длина ${validation.minLength} символов`;
    }

    if (validation.maxLength && value.length > validation.maxLength) {
      return `Максимальная длина ${validation.maxLength} символов`;
    }

    if (validation.pattern && !validation.pattern.test(value)) {
      return 'Неверный формат';
    }

    if (validation.custom) {
      return validation.custom(value);
    }

    return null;
  };

  // Обработчик изменения
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    
    // Валидация
    if (validation) {
      const validationResult = validateTextarea(newValue);
      setValidationError(validationResult);
    }

    onChange?.(newValue);
  };

  // Обработчик фокуса
  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  // Обработчик потери фокуса
  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    
    // Валидация при потере фокуса
    if (validation) {
      const validationResult = validateTextarea(e.target.value);
      setValidationError(validationResult);
    }
    
    onBlur?.(e);
  };

  // Отображение ошибки
  const displayError = error || validationError;

  return (
    <div className={`${containerBaseClasses} ${className}`}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={id || name} 
          className={`block text-sm font-regular text-change mb-2 ${labelClassName}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Textarea Field */}
      <textarea
        ref={ref}
        id={id || name}
        name={name}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        maxLength={maxLength}
        minLength={minLength}
        rows={rows}
        cols={cols}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={textareaClasses}
      />

      {/* Error Message */}
      {displayError && (
        <p className={`text-sm text-red-500 mt-1 ${errorClassName}`}>
          {displayError}
        </p>
      )}

      {/* Character Counter */}
      {maxLength && (
        <p className="text-xs text-muted mt-1 text-right">
          {(value?.length || 0)}/{maxLength}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
