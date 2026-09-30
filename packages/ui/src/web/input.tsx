import type { CSSProperties } from 'react';

import type { InputProps, InputType } from '../index';

export function Input({
  value,
  defaultValue,
  onChangeText,
  placeholder,
  type = 'text',
  disabled = false,
  required = false,
  error,
  accessibilityLabel,
  style,
}: InputProps) {
  const hasError = Boolean(error);

  return (
    <input
      aria-invalid={hasError || undefined}
      aria-label={accessibilityLabel}
      className="mp-input"
      disabled={disabled}
      onChange={(event) => onChangeText?.(event.currentTarget.value)}
      placeholder={placeholder}
      required={required}
      type={htmlInputType[type]}
      value={value}
      defaultValue={value === undefined ? defaultValue : undefined}
      style={{ ...(hasError ? { borderColor: 'var(--token-color-danger)' } : {}), ...(style as CSSProperties) }}
    />
  );
}

const htmlInputType: Record<InputType, 'text' | 'email' | 'password' | 'search'> = {
  text: 'text',
  email: 'email',
  password: 'password',
  search: 'search',
};
