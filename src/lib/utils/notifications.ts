// src/lib/utils/notifications.ts
'use client';

export const showTooltip = (message: string, duration = 3000): void => {
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip-box';
  tooltip.innerHTML = `
    <p>${message}</p>
    <button onclick="this.parentNode.remove()" 
            style="margin-top: 10px; padding: 5px 10px; 
                   background: var(--primary-color); 
                   color: white; border: none; 
                   border-radius: 4px; cursor: pointer;">
      OK
    </button>
  `;
  document.body.appendChild(tooltip);
  setTimeout(() => tooltip.remove(), duration);
};

export const showError = (message: string): void => {
  const errorTooltip = document.createElement('div');
  errorTooltip.className = 'tooltip-box';
  errorTooltip.style.backgroundColor = 'var(--error-color)';
  errorTooltip.innerHTML = `<p>${message}</p>`;
  document.body.appendChild(errorTooltip);
  setTimeout(() => errorTooltip.remove(), 5000);
};