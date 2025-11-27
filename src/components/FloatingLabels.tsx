import React, { useState } from 'react';

interface FloatingLabelInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  label,
  type = 'text',
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
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required={required}
        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none transition-all peer placeholder-transparent"
        placeholder={label}
      />
      <label
        className={`absolute left-4 transition-all pointer-events-none ${
          isFocused || value
            ? '-top-2.5 text-xs bg-white px-1 text-amber-600'
            : 'top-3 text-gray-500'
        }`}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    </div>
  );
};

interface FloatingLabelTextareaProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  required?: boolean;
}

export const FloatingLabelTextarea: React.FC<FloatingLabelTextareaProps> = ({
  label,
  value,
  onChange,
  rows = 4,
  required = false
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required={required}
        rows={rows}
        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none transition-all peer placeholder-transparent resize-none"
        placeholder={label}
      />
      <label
        className={`absolute left-4 transition-all pointer-events-none ${
          isFocused || value
            ? '-top-2.5 text-xs bg-white px-1 text-amber-600'
            : 'top-3 text-gray-500'
        }`}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    </div>
  );
};
