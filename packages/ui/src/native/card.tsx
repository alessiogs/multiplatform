import { colors, radii, spacing } from '@multiplatform/tokens';
import { StyleSheet, View, useColorScheme, type ViewStyle } from 'react-native';

import type { CardPadding, CardProps } from '../index';

const paddingValues: Record<CardPadding, number> = {
  none: 0,
  sm: spacing.two,
  md: spacing.three,
  lg: spacing.four,
};

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  accessibilityLabel,
  style,
}: CardProps) {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? colors.dark : colors.light;

  return (
    <View
      accessibilityLabel={accessibilityLabel}
      style={[
        styles.card,
        {
          backgroundColor: variant === 'outlined' ? 'transparent' : theme.surface,
          borderColor: theme.border,
          borderWidth: variant === 'outlined' ? 1 : 0,
          padding: paddingValues[padding],
          elevation: variant === 'elevated' ? 2 : 0,
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: variant === 'elevated' ? 2 : 0 },
          shadowOpacity: variant === 'elevated' ? (scheme === 'dark' ? 0.3 : 0.12) : 0,
          shadowRadius: variant === 'elevated' ? 4 : 0,
        },
        style as ViewStyle,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.lg,
  },
});
