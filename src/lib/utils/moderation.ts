// src/lib/utils/moderation.ts
const bannedWords = [
    'хуй', 'пизда', 'ебал', 'ебан', 'еблан', 'мудак', 'сука', 'блядь', 
    'fuck', 'shit', 'asshole', 'bitch', 'cunt', 'nigger', 'nigga', 'faggot'
  ];
  
  export const moderateText = (text: string): string => {
    let result = text;
    bannedWords.forEach(word => {
      const regex = new RegExp(word, 'gi');
      result = result.replace(regex, '*'.repeat(word.length));
    });
    return result;
  };
  
  export const containsBannedWords = (text: string): boolean => {
    return bannedWords.some(word => 
      new RegExp(word, 'gi').test(text)
    );
  };