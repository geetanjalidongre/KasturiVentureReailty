import React, { useState } from 'react';

interface FloatingLabelInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  label,
  type,
  value,
  onChange,
  required = false
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required={required}
        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kasturi-gold focus:border-transparent transition-all duration-300 transform focus:scale-105 peer placeholder-transparent"
        placeholder={label}
      />
      <label
        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
          isFocused || value
            ? '-top-2 text-sm text-kasturi-gold bg-white px-2'
            : 'top-4 text-gray-500'
        }`}
      >
        {label}
      </label>
    </div>
  );
};

interface FloatingLabelTextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}

export const FloatingLabelTextarea: React.FC<FloatingLabelTextareaProps> = ({
  label,
  value,
  onChange,
  rows = 4
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        rows={rows}
        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kasturi-gold focus:border-transparent transition-all duration-300 transform focus:scale-105 peer placeholder-transparent resize-none"
        placeholder={label}
      />
      <label
        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
          isFocused || value
            ? '-top-2 text-sm text-kasturi-gold bg-white px-2'
            : 'top-4 text-gray-500'
        }`}
      >
        {label}
      </label>
    </div>
  );
};