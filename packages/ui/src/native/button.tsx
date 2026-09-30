import { colors, radii, spacing, typography } from '@multiplatform/tokens';
import { Pressable, StyleSheet, Text, useColorScheme, type ViewStyle } from 'react-native';

import type { ButtonProps, ButtonSize, ButtonVariant } from '../index';

type SizeStyle = { minHeight: number; paddingHorizontal: number; paddingVertical: number; fontSize: number };

const sizeStyles: Record<ButtonSize, SizeStyle> = {
  sm: {
    minHeight: 36,
    paddingHorizontal: spacing.two,
    paddingVertical: spacing.one,
    fontSize: typography.size.small,
  },
  md: {
    minHeight: 44,
    paddingHorizontal: spacing.three,
    paddingVertical: spacing.two,
    fontSize: typography.size.body,
  },
  lg: {
    minHeight: 52,
    paddingHorizontal: spacing.four,
    paddingVertical: spacing.three,
    fontSize: typography.size.body,
  },
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  onPress,
  disabled = false,
  accessibilityLabel,
  style,
}: ButtonProps) {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? colors.dark : colors.light;
  const outlined = variant === 'outline';
  const subtle = variant === 'secondary' || outlined;
  const backgroundColor = outlined
    ? 'transparent'
    : variant === 'primary'
      ? theme.primary
      : variant === 'danger'
        ? theme.danger
        : theme.surface;
  const textColor = subtle ? theme.text : '#ffffff';

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={type === 'submit' ? 'Submits the form' : undefined}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor, borderColor: outlined ? theme.border : backgroundColor, ...sizeStyles[size] },
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style as ViewStyle,
      ]}
    >
      <Text style={[styles.label, { color: textColor, fontSize: sizeStyles[size].fontSize }]}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: radii.control,
  },
  label: {
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
  },
  pressed: { opacity: 0.8 },
  disabled: { opacity: 0.5 },
});
