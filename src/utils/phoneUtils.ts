// Функция для форматирования номера телефона для отображения
export const formatPhoneForDisplay = (phone: string): string => {
  if (!phone) return "";
  
  // Убираем все нецифровые символы
  const numbers = phone.replace(/\D/g, "");
  
  // Если номер начинается с 8, заменяем на 7
  let processedNumbers = numbers;
  if (processedNumbers.startsWith('8') && processedNumbers.length === 11) {
    processedNumbers = '7' + processedNumbers.slice(1);
  }
  
  // Если номер начинается с 7 и имеет 11 цифр, убираем первую 7
  if (processedNumbers.startsWith('7') && processedNumbers.length === 11) {
    processedNumbers = processedNumbers.slice(1);
  }
  
  // Ограничиваем до 10 цифр
  const limitedNumbers = processedNumbers.slice(0, 10);
  
  if (limitedNumbers.length === 0) return "";
  
  let formatted = "+7 ";
  
  if (limitedNumbers.length > 0) {
    formatted += "(" + limitedNumbers.slice(0, 3);
  }
  
  if (limitedNumbers.length > 3) {
    formatted += ") " + limitedNumbers.slice(3, 6);
  }
  
  if (limitedNumbers.length > 6) {
    formatted += " " + limitedNumbers.slice(6, 8);
  }
  
  if (limitedNumbers.length > 8) {
    formatted += "-" + limitedNumbers.slice(8, 10);
  }
  
  return formatted;
};

// Функция для валидации номера телефона
export const validatePhone = (phone: string): boolean => {
  if (!phone) return false;
  
  const numbers = phone.replace(/\D/g, "");
  
  // Проверяем, что номер содержит 10 цифр (без кода страны)
  return numbers.length === 10;
};

// Функция для очистки номера телефона (только цифры)
export const cleanPhoneNumber = (phone: string): string => {
  if (!phone) return "";
  return phone.replace(/\D/g, "").slice(0, 10);
};
