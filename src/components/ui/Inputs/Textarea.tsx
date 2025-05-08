"use client";

import React, { FC, ChangeEvent, useState, useEffect } from "react";

interface TextareaProps {
  id?: string;
  name?: string; // Добавлено
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  minLength?: number;
  maxLength?: number;
  className?: string;
}

const Textarea: FC<TextareaProps> = ({
  id,
  name,
  value,
  onChange,
  placeholder = "",
  rows = 4,
  minLength,
  maxLength,
  className = "",
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
        name={name} // Добавлено
        className="textarea"
        placeholder={placeholder}
        rows={rows}
        minLength={minLength}
        maxLength={maxLength}
        value={value}
        onChange={handleChange}
      />
      {typeof maxLength === "number" && (
        <div className="textarea-counter">
          {count}/{maxLength}
        </div>
      )}
    </div>
  );
};

export default Textarea;