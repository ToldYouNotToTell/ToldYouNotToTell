export function escapeHtml(unsafe: string): string {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .replace(/\n/g, "<br>");
  }
  
  export function moderateText(text: string): string {
    const bannedWords = ['badword1', 'badword2']; // Заменить на реальный список
    let result = text;
    
    bannedWords.forEach(word => {
      const regex = new RegExp(word, 'gi');
      result = result.replace(regex, '*'.repeat(word.length));
    });
    
    return result;
  }