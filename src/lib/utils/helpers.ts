// src/lib/utils/helpers.ts
export const generateRecoveryCode = (): string => {
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // Исключены I, O для избежания путаницы
  const numbers = '23456789'; // Исключены 0, 1
  let result = '';
  // 3 буквы
  for (let i = 0; i < 3; i++) {
    result += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  // 2 цифры
  for (let i = 0; i < 2; i++) {
    result += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  return result;
};
  
  export const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  export const escapeHtml = (unsafe: string): string => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .replace(/\n/g, "<br>");
  };
  
  export const copyToClipboard = (text: string): void => {
    navigator.clipboard.writeText(text);
  };