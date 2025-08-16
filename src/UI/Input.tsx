"use client"

import React, { useState, forwardRef } from 'react';
import EyeCloseIcon from '../../public/icons/EyeCloseIcon';
import EyeIcon from '../../public/icons/EyeIcon';

// Типы для Input компонента
export interface InputProps {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  success?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  autoComplete?: string;
  name?: string;
  id?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'outline' | 'landing';
  showPasswordToggle?: boolean;
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: string) => string | null;
  };
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  placeholder,
  type = 'text',
  value,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  leftIcon,
  rightIcon,
  disabled = false,
  required = false,
  error,
  success = false,
  maxLength,
  minLength,
  pattern,
  autoComplete,
  name,
  id,
  className = '',
  inputClassName = '',
  labelClassName = '',
  errorClassName = '',
  size = 'md',
  variant = 'default',
  showPasswordToggle = false,
  validation,
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Определяем тип для отображения
  const inputType = type === 'password' && showPasswordToggle && showPassword ? 'text' : type;

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

  // Базовые классы для input
  const inputBaseClasses = [
    'w-full rounded-[16px] transition-all duration-200 outline-none',
    'placeholder:text-muted text-change h-[44px]',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    sizeClasses[size],
    variantClasses[variant],
  ].join(' ');

  // Классы для состояний
  const stateClasses = [
    isFocused ? 'ring-2 ring-primary/20' : '',
    error || validationError ? 'border-red-500 focus:border-red-500' : '',
    success ? 'border-green-500 focus:border-green-500' : '',
  ].join(' ');

  // Классы для padding в зависимости от иконок
  const paddingClasses = [
    leftIcon ? 'pl-12' : 'pl-4',
    (rightIcon || (type === 'password' && showPasswordToggle)) ? 'pr-12' : 'pr-4',
    'py-3',
  ].join(' ');

  const inputClasses = [
    inputBaseClasses,
    paddingClasses,
    stateClasses,
    inputClassName,
  ].join(' ');

  // Функция валидации
  const validateInput = (value: string): string | null => {
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    // Валидация
    if (validation) {
      const validationResult = validateInput(newValue);
      setValidationError(validationResult);
    }

    onChange?.(newValue);
  };

  // Обработчик фокуса
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  // Обработчик потери фокуса
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    
    // Валидация при потере фокуса
    if (validation) {
      const validationResult = validateInput(e.target.value);
      setValidationError(validationResult);
    }
    
    onBlur?.(e);
  };

  // Переключение видимости пароля
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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

      {/* Input Container */}
      <div className="relative">
        {/* Left Icon */}
        {leftIcon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted">
            {leftIcon}
          </div>
        )}

        {/* Input Field */}
        <input
          ref={ref}
          type={inputType}
          id={id || name}
          name={name}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          autoComplete={autoComplete}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={inputClasses}
        />

        {/* Right Icon or Password Toggle */}
        <div className="absolute right-4 top-6.5 transform -translate-y-1/2">
          {type === 'password' && showPasswordToggle ? (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="text-muted hover:text-change transition-colors duration-200"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeCloseIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          ) : (
            rightIcon && (
              <div className="text-muted">
                {rightIcon}
              </div>
            )
          )}
        </div>
      </div>

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

Input.displayName = 'Input';

export default Input;
