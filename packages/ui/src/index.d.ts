import type { ReactNode } from 'react';
import type { ColorToken } from '@multiplatform/tokens';

export type TextVariant = 'body' | 'small' | 'heading' | 'title' | 'subtitle' | 'code';
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type CardVariant = 'default' | 'outlined' | 'elevated';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';
export type InputType = 'text' | 'email' | 'password' | 'search';

/** A portable style object. Platform-specific renderers interpret its values. */
export type SharedStyle = object;

export interface TextProps {
  children?: ReactNode;
  variant?: TextVariant;
  color?: ColorToken;
  accessibilityLabel?: string;
  style?: SharedStyle;
}

export interface ButtonProps {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onPress?: () => void;
  disabled?: boolean;
  accessibilityLabel?: string;
  style?: SharedStyle;
}

export interface CardProps {
  children?: ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  accessibilityLabel?: string;
  style?: SharedStyle;
}

export interface InputProps {
  value?: string;
  defaultValue?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  type?: InputType;
  disabled?: boolean;
  required?: boolean;
  error?: boolean | string;
  accessibilityLabel?: string;
  style?: SharedStyle;
}

export declare function Text(props: TextProps): ReactNode;
export declare function Button(props: ButtonProps): ReactNode;
export declare function Card(props: CardProps): ReactNode;
export declare function Input(props: InputProps): ReactNode;
