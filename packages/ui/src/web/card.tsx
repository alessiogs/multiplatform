import type { CSSProperties } from 'react';

import type { CardPadding, CardProps, CardVariant } from '../index';

export function Card({ children, variant = 'default', padding = 'md', accessibilityLabel, style }: CardProps) {
  return (
    <div
      aria-label={accessibilityLabel}
      className={`mp-card ${variantClass[variant]} ${paddingClass[padding]}`}
      style={style as CSSProperties}
    >
      {children}
    </div>
  );
}

const variantClass: Record<CardVariant, string> = {
  default: 'mp-card--default',
  outlined: 'mp-card--outlined',
  elevated: 'mp-card--elevated',
};

const paddingClass: Record<CardPadding, string> = {
  none: 'mp-card--padding-none',
  sm: 'mp-card--padding-sm',
  md: 'mp-card--padding-md',
  lg: 'mp-card--padding-lg',
};
