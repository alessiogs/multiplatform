/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { colors, layout, radii, spacing, typography, type ColorToken } from '@multiplatform/tokens';
import { Platform } from 'react-native';

export const Colors = colors;

export type ThemeColor = ColorToken;

export const Fonts = Platform.select({
  ios: typography.fontFamily,
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
}) ?? typography.fontFamily;

export const Spacing = spacing;
export const Radii = radii;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = layout.maxContentWidth;
