// src/components/ui/Textarea.tsx
'use client';

import React, { FC, ChangeEvent, useState, useEffect } from 'react';

interface TextareaProps {
  /** Уникальный идентификатор поля */
  id?: string;
  /** Текущее значение */
  value: string;
  /** Обработчик изменения */
  onChange: (value: string) => void;
  /** Плейсхолдер */
  placeholder?: string;
  /** Количество строк по умолчанию */
  rows?: number;
  /** Минимальная длина */
  minLength?: number;
  /** Максимальная длина */
  maxLength?: number;
  /** Стили CSS-классы, дополнительно */
  className?: string;
}

/**
 * Универсальный компонент <textarea> с отображением счётчика символов.
 */
const Textarea: FC<TextareaProps> = ({
  id,
  value,
  onChange,
  placeholder = '',
  rows = 4,
  minLength,
  maxLength,
  className = '',
}) => {
  const [count, setCount] = useState(value.length);

  useEffect(() => {
    setCount(value.length);
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setCount(newValue.length);
    onChange(newValue);
  };

  return (
    <div className={`textarea-container ${className}`}>
      <textarea
        id={id}
        className="textarea"
        placeholder={placeholder}
        rows={rows}
        minLength={minLength}
        maxLength={maxLength}
        value={value}
        onChange={handleChange}
      />
      {typeof maxLength === 'number' && (
        <div className="textarea-counter">
          {count}/{maxLength}
        </div>
      )}
    </div>
  );
};

export default Textarea;