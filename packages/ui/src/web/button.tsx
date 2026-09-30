import type { CSSProperties } from 'react';

import type { ButtonProps, ButtonSize, ButtonVariant } from '../index';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onPress,
  disabled = false,
  accessibilityLabel,
  style,
}: ButtonProps) {
  return (
    <button
      aria-label={accessibilityLabel}
      className={`mp-button ${variantClass[variant]} ${sizeClass[size]}`}
      disabled={disabled}
      onClick={onPress}
      style={style as CSSProperties}
      type="button"
    >
      {children}
    </button>
  );
}

const variantClass: Record<ButtonVariant, string> = {
  primary: 'mp-button--primary',
  secondary: 'mp-button--secondary',
  outline: 'mp-button--outline',
  danger: 'mp-button--danger',
};

const sizeClass: Record<ButtonSize, string> = {
  sm: 'mp-button--sm',
  md: 'mp-button--md',
  lg: 'mp-button--lg',
};
