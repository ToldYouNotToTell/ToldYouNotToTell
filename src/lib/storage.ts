// src/lib/storage.ts
export const safeLocalStorage = {
    get: (key: string) => {
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    set: (key: string, value: string) => {
      try {
        localStorage.setItem(key, value);
      } catch (e) {
        console.error('LocalStorage set error', e);
      }
    }
  };