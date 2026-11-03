import React from 'react';

interface CurrencyInputProps {
  id?: string;
  value: number;
  onChange: (val: number) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  id,
  value,
  onChange,
  placeholder = '0',
  className = '',
  disabled = false,
  min = 0,
  max,
}) => {
  // Format numeric value to comma-separated string (e.g. 300000 -> "300,000")
  const displayValue = value && value > 0 ? new Intl.NumberFormat('en-US').format(value) : '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Strip non-digits
    const raw = e.target.value.replace(/[^\d]/g, '');
    if (!raw) {
      onChange(0);
      return;
    }

    let parsed = parseInt(raw, 10);
    if (isNaN(parsed)) parsed = 0;
    if (min !== undefined && parsed < min) parsed = min;
    if (max !== undefined && parsed > max) parsed = max;

    onChange(parsed);
  };

  return (
    <input
      id={id}
      type="text"
      inputMode="numeric"
      value={displayValue}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      className={className}
    />
  );
};
