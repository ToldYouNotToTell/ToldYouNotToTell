// src/lib/uiActions.ts
'use client';

// Подключение Phantom Wallet
export async function connectPhantom(): Promise<void> {
  try {
    if (!window.solana?.isPhantom) {
      window.open("https://phantom.app/", "_blank");
      return;
    }

    const { solana } = window;
    const response = await solana.connect();
    const publicKey = response.publicKey.toString();
    
    // Сохраняем в localStorage
    localStorage.setItem("phantomWallet", publicKey);
    
    console.log("Connected to Phantom:", publicKey);
  } catch (error) {
    console.error("Phantom connection error:", error);
  }
}

// Показ модального окна Presale
export function showPresaleModal(): void {
  const modal = document.getElementById('presaleModal');
  if (modal) {
    modal.style.display = 'flex'; // Показываем модалку
    document.body.style.overflow = 'hidden'; // Блокируем скролл
  }
}

// Скрытие модального окна
export function hidePresaleModal(): void {
  const modal = document.getElementById('presaleModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Возвращаем скролл
  }
}