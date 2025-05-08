// src/lib/utils/crypto.ts
import { randomBytes } from "crypto";

/**
 * Генерирует случайный код восстановления.
 * @param length — длина кода (по умолчанию 6 случайных байт, представленных в hex → 12 символов)
 * @returns строка из случайных символов [0-9a-f]
 */
export function generateRecoveryCode(length = 6): string {
  // randomBytes возвращает Buffer длиной length,
  // .toString("hex") даёт строку в hex вдвое длиннее → длина result = length * 2
  return randomBytes(length).toString("hex");
}
