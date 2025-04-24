// src/hooks/useErrorHandler.ts
import { useState } from 'react';

export function useErrorHandler() {
  const [error, setError] = useState<Error | null>(null);

  /** Обработать ошибку любого типа */
  const handleError = (err: unknown) => {
    setError(err instanceof Error ? err : new Error(String(err)));
  };

  /** Очистить текущее состояние ошибки */
  const clearError = () => {
    setError(null);
  };

  return { error, handleError, clearError };
}