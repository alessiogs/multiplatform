import type { CSSProperties } from 'react';
import type { ColorToken } from '@multiplatform/tokens';

import type { TextProps, TextVariant } from '../index';

const colorVariable = (token: ColorToken) => `var(--token-color-${token.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)})`;

const variantClasses: Record<TextVariant, string> = {
  body: 'mp-text--body',
  small: 'mp-text--small',
  heading: 'mp-text--heading',
  title: 'mp-text--title',
  subtitle: 'mp-text--subtitle',
  code: 'mp-text--code',
};

export function Text({ children, variant = 'body', color = 'text', accessibilityLabel, style }: TextProps) {
  return (
    <span
      aria-label={accessibilityLabel}
      className={`mp-text ${variantClasses[variant]}`}
      style={{ color: colorVariable(color), ...(style as CSSProperties) }}
    >
      {children}
    </span>
  );
}
