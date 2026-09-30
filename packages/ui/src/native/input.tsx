import { colors, radii, spacing, typography } from '@multiplatform/tokens';
import { StyleSheet, TextInput, useColorScheme, type TextInputProps, type TextStyle } from 'react-native';

import type { InputProps } from '../index';

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
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? colors.dark : colors.light;
  const hasError = Boolean(error);
  const typeProps: Pick<TextInputProps, 'keyboardType' | 'secureTextEntry' | 'autoCapitalize'> = {
    keyboardType: type === 'email' ? 'email-address' : type === 'search' ? 'web-search' : 'default',
    secureTextEntry: type === 'password',
    autoCapitalize: type === 'email' || type === 'password' ? 'none' : undefined,
  };

  return (
    <TextInput
      accessibilityHint={[required ? 'Required' : undefined, typeof error === 'string' ? error : undefined]
        .filter(Boolean)
        .join('. ') || undefined}
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled }}
      editable={!disabled}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={theme.textSecondary}
      value={value}
      defaultValue={value === undefined ? defaultValue : undefined}
      {...typeProps}
      style={[
        styles.input,
        { backgroundColor: theme.surface, borderColor: hasError ? theme.danger : theme.border, color: theme.text },
        disabled && styles.disabled,
        style as TextStyle,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    minHeight: 44,
    borderWidth: 1,
    borderRadius: radii.control,
    paddingHorizontal: spacing.three,
    paddingVertical: spacing.two,
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.size.body,
  },
  disabled: { opacity: 0.55 },
});
