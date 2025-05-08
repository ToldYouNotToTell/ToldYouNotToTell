export const BANNED_WORDS = [
  "хуй",
  "пизда",
  "ебал",
  "ебан",
  "еблан",
  "мудак",
  "сука",
  "блядь",
  "fuck",
  "shit",
  "asshole",
  "bitch",
  "cunt",
  "nigger",
  "nigga",
  "faggot",
];

export const BANNED_PATTERNS = [
  /(\d{4}[- ]?){4}/, // Кредитные карты
  /\+?\d{10,15}/, // Телефоны
  /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/, // Emails
];
