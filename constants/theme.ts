import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { extendTheme } from 'native-base';

// Define color palette
const colors = {
  primary: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  secondary: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  background: {
    default: '#ffffff',
    paper: '#f8fafc',
  },
  text: {
    primary: '#1e293b',
    secondary: '#64748b',
    disabled: '#94a3b8',
  },
};

// Extend the default theme
const customTheme = extendTheme({
  colors,
  fontConfig: {
    Cairo: {
      400: {
        normal: 'Cairo-Regular',
      },
      700: {
        normal: 'Cairo-Bold',
      },
    },
  },
  fonts: {
    heading: 'Cairo',
    body: 'Cairo',
    mono: 'Cairo',
  },
  config: {
    initialColorMode: 'light',
  },
});

// Merge with Navigation theme
const lightTheme = {
  ...NavigationDefaultTheme,
  ...customTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    primary: colors.primary[500],
    background: colors.background.default,
    card: colors.background.paper,
    text: colors.text.primary,
    border: colors.text.disabled,
    notification: colors.primary[500],
  },
};

const darkTheme = {
  ...NavigationDarkTheme,
  ...customTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    primary: colors.primary[300],
    background: '#0f172a',
    card: '#1e293b',
    text: '#f8fafc',
    border: '#334155',
    notification: colors.primary[500],
  },
};

export { lightTheme, darkTheme, colors };
