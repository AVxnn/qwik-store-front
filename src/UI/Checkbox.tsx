"use client"

import React, { forwardRef } from 'react';
import CheckIcon from '../../public/icons/CheckIcon';

// Типы для Checkbox компонента
export interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  name?: string;
  id?: string;
  className?: string;
  label?: React.ReactNode;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'success' | 'warning';
  indeterminate?: boolean;
  children?: React.ReactNode;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  checked = false,
  onChange,
  disabled = false,
  required = false,
  error,
  name,
  id,
  className = '',
  label,
  description,
  size = 'md',
  variant = 'default',
  indeterminate = false,
  children,
}, ref) => {
  // Обработчик изменения
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange?.(e.target.checked);
    }
  };

  // Обработчик клика по контейнеру
  const handleContainerClick = () => {
    if (!disabled) {
      onChange?.(!checked);
    }
  };

  // Классы для размеров
  const sizeClasses = {
    sm: {
      container: 'gap-2',
      checkbox: 'w-4 h-4',
      icon: 'w-3 h-3',
      text: 'text-sm',
    },
    md: {
      container: 'gap-3',
      checkbox: 'w-6 h-6',
      icon: 'w-4 h-4',
      text: 'text-base',
    },
    lg: {
      container: 'gap-4',
      checkbox: 'w-7 h-7',
      icon: 'w-5 h-5',
      text: 'text-lg',
    },
  };

  // Классы для вариантов
  const variantClasses = {
    default: {
      unchecked: 'border-gray-600 bg-surface',
      checked: 'border-primary bg-primary',
      hover: 'hover:border-primary/60',
    },
    primary: {
      unchecked: 'border-primary/30 bg-surface',
      checked: 'border-primary bg-primary',
      hover: 'hover:border-primary/60',
    },
    success: {
      unchecked: 'border-green-600/30 bg-surface',
      checked: 'border-green-600 bg-green-600',
      hover: 'hover:border-green-600/60',
    },
    warning: {
      unchecked: 'border-yellow-600/30 bg-surface',
      checked: 'border-yellow-600 bg-yellow-600',
      hover: 'hover:border-yellow-600/60',
    },
  };

  const currentSize = sizeClasses[size];
  const currentVariant = variantClasses[variant];

  // Классы для чекбокса
  const checkboxClasses = [
    'relative flex-shrink-0 border-2 rounded-[8px] transition-all duration-200',
    'flex items-center justify-center cursor-pointer',
    currentSize.checkbox,
    disabled ? 'opacity-50 cursor-not-allowed' : currentVariant.hover,
    checked || indeterminate ? currentVariant.checked : currentVariant.unchecked,
  ].join(' ');

  // Классы для контейнера
  const containerClasses = [
    'flex items-start',
    currentSize.container,
    disabled ? 'cursor-not-allowed' : 'cursor-pointer',
    className,
  ].join(' ');

  // Классы для текста
  const textClasses = [
    'text-change leading-relaxed text-[14px] mt-[1px]',
    currentSize.text,
    disabled ? 'opacity-50' : '',
  ].join(' ');

  return (
    <div className="w-full">
      <div className={containerClasses} onClick={handleContainerClick}>
        {/* Checkbox */}
        <div className={checkboxClasses}>
          <input
            ref={ref}
            type="checkbox"
            id={id || name}
            name={name}
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            required={required}
            className="sr-only"
            aria-describedby={description ? `${id || name}-description` : undefined}
          />
          
          {/* Check Icon */}
          {(checked || indeterminate) && (
            <CheckIcon className={`${currentSize.icon} text-white`} />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Label */}
          {label && (
            <label 
              htmlFor={id || name}
              className={`${textClasses} font-regular`}
            >
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}

          {/* Children */}
          {children && (
            <div className={textClasses}>
              {children}
            </div>
          )}

          {/* Description */}
          {description && (
            <p 
              id={`${id || name}-description`}
              className="text-sm text-muted mt-1"
            >
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-sm text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
