import tokenData from './tokens.json';

export const tokens = tokenData;
export const colors = tokens.colors;
export const spacing = tokens.spacing;
export const typography = tokens.typography;
export const radii = tokens.radii;
export const shadows = tokens.shadows;
export const layout = tokens.layout;

export type ColorScheme = keyof typeof colors;
export type ColorToken = keyof (typeof colors)['light'];
