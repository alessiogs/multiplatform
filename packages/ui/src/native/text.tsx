import { colors, typography } from '@multiplatform/tokens';
import { StyleSheet, Text as NativeText, useColorScheme, type TextStyle } from 'react-native';

import type { TextProps, TextVariant } from '../index';

const variantStyles: Record<TextVariant, TextStyle> = {
  body: { fontSize: typography.size.body, lineHeight: typography.lineHeight.body },
  small: { fontSize: typography.size.small, lineHeight: typography.lineHeight.small },
  heading: { fontSize: typography.size.heading, lineHeight: typography.lineHeight.heading, fontWeight: '600' },
  title: { fontSize: typography.size.title, lineHeight: typography.lineHeight.title, fontWeight: '600' },
  subtitle: { fontSize: typography.size.subtitle, lineHeight: typography.lineHeight.subtitle, fontWeight: '600' },
  code: { fontFamily: typography.fontFamily.mono, fontSize: typography.size.code },
};

export function Text({
  children,
  variant = 'body',
  color = 'text',
  accessibilityLabel,
  style,
}: TextProps) {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? colors.dark : colors.light;

  return (
    <NativeText
      accessibilityLabel={accessibilityLabel}
      style={[styles.base, variantStyles[variant], { color: theme[color] }, style as TextStyle]}
    >
      {children}
    </NativeText>
  );
}

const styles = StyleSheet.create({
  base: {
    color: colors.light.text,
    fontFamily: typography.fontFamily.sans,
  },
});
