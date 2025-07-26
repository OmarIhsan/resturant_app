import { extendTheme } from 'native-base';

export const theme = extendTheme({
  colors: {
    // Brand colors
    primary: {
      50: '#faf5f0',
      100: '#f2e6d9',
      200: '#e6ccb3',
      300: '#d9b38c',
      400: '#cc9966',
      500: '#8B4513', // Main brown color
      600: '#7a3d11',
      700: '#69340f',
      800: '#582c0d',
      900: '#47230b',
    },
    secondary: {
      50: '#fff9e6',
      100: '#ffedb3',
      200: '#ffe080',
      300: '#ffd44d',
      400: '#ffc71a',
      500: '#DAA520', // Golden color
      600: '#c49100',
      700: '#9b7200',
      800: '#725300',
      900: '#493400',
    },
    background: {
      50: '#fffcf5',
      100: '#fff8e6',
      200: '#fff1cc',
      300: '#ffe9b3',
      400: '#ffe199',
      500: '#FFF8E1', // Light beige
      600: '#e6dfca',
      700: '#b3ad9f',
      800: '#807c74',
      900: '#4d4a48',
    },
  },
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
  components: {
    Button: {
      baseStyle: {
        rounded: 'md',
        _text: {
          fontWeight: 'bold',
        },
      },
      defaultProps: {
        colorScheme: 'primary',
      },
    },
    Input: {
      baseStyle: {
        _focus: {
          borderColor: 'primary.500',
          bg: 'white',
        },
      },
    },
  },
  config: {
    initialColorMode: 'light',
  },
});

// Extend the theme type for TypeScript
type CustomThemeType = typeof theme;
declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}
