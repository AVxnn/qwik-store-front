"use client"

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface ImageUploadProps {
  value?: string | File | null;
  onChange: (file: File | null) => void;
  placeholder?: string;
  maxSize?: number; // в МБ
  accept?: string;
  className?: string;
  disabled?: boolean;
  showPreview?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  placeholder = "Загрузите изображение",
  maxSize = 6, // 6MB по умолчанию
  accept = "image/*",
  className = "",
  disabled = false,
  showPreview = true
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Получаем URL для предпросмотра
  const getPreviewUrl = () => {
    if (value instanceof File) {
      return URL.createObjectURL(value);
    }
    if (typeof value === 'string') {
      return value;
    }
    return null;
  };

  // Валидация файла
  const validateFile = (file: File): boolean => {
    setError(null);

    // Проверяем тип файла
    if (!file.type.startsWith('image/')) {
      setError('Пожалуйста, выберите изображение');
      return false;
    }

    // Проверяем размер файла
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      setError(`Размер файла не должен превышать ${maxSize}MB`);
      return false;
    }

    return true;
  };

  // Обработчик выбора файла
  const handleFileSelect = (file: File) => {
    if (validateFile(file)) {
      onChange(file);
    }
  };

  // Обработчик изменения input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // Обработчики drag & drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // Обработчик клика по области
  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  // Обработчик удаления файла
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const previewUrl = getPreviewUrl();

  return (
    <div className={`w-full ${className}`}>
             <motion.div
         className={`
           relative bg-background rounded-[16px] pr-4 h-16 cursor-pointer transition-all duration-200
           ${isDragOver 
             ? 'border-2 border-primary bg-primary/10' 
             : 'hover:shadow-[0_0px_8px_0px_#8077FF]'
           }
           ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
           ${error ? 'border-red-500' : ''}
         `}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
          disabled={disabled}
        />

        {previewUrl && showPreview ? (
          // Превью изображения
          <div className="relative flex items-center gap-3">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-16 h-16 object-cover border-4 border-background rounded-[16px] overflow-hidden"
            />
               <span className="text-gray-400 text-sm font-medium">Изображение загружено</span>
            <button
              onClick={handleRemove}
              className="absolute top-4 right-0 p-2 bg-primary text-white rounded-full hover:bg-primary/70 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
                 ) : (
           // Плейсхолдер
           <div className="flex items-center justify-between w-full">
             {/* Левая секция с иконкой */}
             <div className="flex items-center gap-3">
               <div className="w-16 h-16 rounded-[16px] border-4 border-background bg-gray-700 flex items-center justify-center">
                 <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                 </svg>
               </div>
               <span className="text-gray-400 text-sm font-medium">{placeholder}</span>
             </div>
             
             {/* Правая секция с размером */}
             <span className="text-gray-400 text-xs">Max. {maxSize} mb</span>
           </div>
         )}

        {/* Индикатор загрузки при drag */}
        {isDragOver && (
          <div className="absolute inset-0 bg-primary/20 rounded-[16px] flex items-center justify-center">
            <p className="text-primary font-medium">Отпустите файл для загрузки</p>
          </div>
        )}
      </motion.div>

      {/* Сообщение об ошибке */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm mt-2"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default ImageUpload;
