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
        className="form-input w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 bg-white peer placeholder-transparent text-gray-900"
        placeholder={label}
      />
      <label
        className={`floating-label absolute left-4 transition-all duration-300 pointer-events-none text-gray-500 ${
          isFocused || value
            ? '-top-2 text-sm text-amber-600 bg-white px-2 font-medium'
            : 'top-4 text-base'
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
        className="form-input w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 bg-white peer placeholder-transparent resize-none text-gray-900"
        placeholder={label}
      />
      <label
        className={`floating-label absolute left-4 transition-all duration-300 pointer-events-none text-gray-500 ${
          isFocused || value
            ? '-top-2 text-sm text-amber-600 bg-white px-2 font-medium'
            : 'top-4 text-base'
        }`}
      >
        {label}
      </label>
    </div>
  );
};