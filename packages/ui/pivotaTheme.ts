import {
  createTheme,
  MantineColorsTuple,
  MantineThemeOverride,
} from '@mantine/core';

// === Brand Colors === //
const pivotaTeal: MantineColorsTuple = [
  '#e6f7f7', '#cceeee', '#99dddd', '#66cccc', '#33bbbb',
  '#00aaaa', '#008080', '#006666', '#004c4c', '#003333',
];

const pivotaAmber: MantineColorsTuple = [
  '#fff8e1', '#ffecb3', '#ffe082', '#ffd54f', '#ffca28',
  '#ffc107', '#ffb300', '#ffa000', '#ff8f00', '#ff6f00',
];

const pivotaTerracotta: MantineColorsTuple = [
  '#fbeae7', '#f5d1c9', '#f1b3a8', '#ec9486', '#e8786a',
  '#e2725b', '#cc5f4b', '#b34f3d', '#993f30', '#802f23',
];

const coolGray: MantineColorsTuple = [
  '#f9fafb', '#f3f4f6', '#e5e7eb', '#d1d5db', '#9ca3af',
  '#6b7280', '#4b5563', '#374151', '#1f2937', '#111827',
];

const midGray: MantineColorsTuple = [
  '#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1', '#94a3b8',
  '#64748b', '#475569', '#334155', '#1e293b', '#0f172a',
];

export const pivotaTheme: MantineThemeOverride = createTheme({
  primaryColor: 'pivota-teal',
  primaryShade: { light: 6, dark: 7 },
  autoContrast: true,
  luminanceThreshold: 0.3,

  colors: {
    'pivota-teal': pivotaTeal,
    'pivota-amber': pivotaAmber,
    'pivota-terracotta': pivotaTerracotta,
    'cool-gray': coolGray,
    'mid-gray': midGray,
    red: [
      '#fef2f2', '#fee2e2', '#fecaca', '#fca5a5', '#f87171',
      '#ef4444', '#dc2626', '#b91c1c', '#991b1b', '#7f1d1d',
    ],
  },

  fontFamily: 'var(--font-geist-sans), sans-serif',
  fontFamilyMonospace: 'var(--font-geist-mono), monospace',

  headings: {
    fontFamily: 'var(--font-geist-sans), sans-serif',
    fontWeight: '700',
    textWrap: 'balance',
    sizes: {
      h1: { fontSize: '2.5rem' },
      h2: { fontSize: '2.25rem' },
      h3: { fontSize: '2rem' },
      h4: { fontSize: '1.75rem' },
      h5: { fontSize: '1.5rem' },
      h6: { fontSize: '1.25rem' },
    },
  },

  radius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
  },
  defaultRadius: 'md',

  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
  },

  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
  },

  lineHeights: {
    xs: '1',
    sm: '1.25',
    md: '1.5',
    lg: '1.75',
    xl: '2',
  },

  shadows: {
    xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
    sm: '0 2px 4px rgba(0, 0, 0, 0.05)',
    md: '0 4px 8px rgba(0, 128, 128, 0.1)',
    lg: '0 8px 16px rgba(0, 128, 128, 0.12)',
    xl: '0 12px 24px rgba(0, 0, 0, 0.15)',
  },

  cursorType: 'pointer',

  defaultGradient: {
    from: 'pivota-amber',
    to: 'pivota-terracotta',
    deg: 45,
  },

  focusRing: 'auto',
});
