export const colors = {
  light: {
    text: '#000000',
    background: '#ffffff',
    surface: '#F0F0F3',
    surfacePressed: '#E0E1E6',
    textSecondary: '#60646C',
    primary: '#3c87f7',
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
    surface: '#212225',
    surfacePressed: '#2E3135',
    textSecondary: '#B0B4BA',
    primary: '#75aaff',
  },
} as const;

export type ColorScheme = keyof typeof colors;
export type ColorToken = keyof (typeof colors)['light'];

export const spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const typography = {
  fontFamily: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  size: {
    body: 16,
    small: 14,
    title: 48,
    subtitle: 32,
    code: 12,
  },
  lineHeight: {
    body: 24,
    small: 20,
    title: 52,
    subtitle: 44,
    link: 30,
  },
} as const;

export const radii = {
  xs: 8,
  sm: 6,
  md: 10,
  control: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  circle: 40,
  pill: 999,
} as const;

export const layout = {
  maxContentWidth: 800,
} as const;
