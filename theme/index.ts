import { theme as baseTheme } from '@chakra-ui/theme';
import { extendTheme } from '@chakra-ui/theme-utils';

const theme = extendTheme({
  ...baseTheme,
  colors: {
    brand: {
      primary: '#8B4513', // Brown
      secondary: '#DAA520', // Golden
      background: '#FFF8E1', // Light beige
      text: '#4A4A4A', // Dark gray
      lightText: '#8B8B8B', // Light gray
      white: '#FFFFFF',
      border: '#E0D5C8',
      error: '#E74C3C',
      success: '#2ECC71',
    },
  },
  fonts: {
    heading: 'Cairo-Bold',
    body: 'Cairo-Regular',
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'md',
        _text: {
          fontWeight: 'bold',
        },
      },
      defaultProps: {
        colorScheme: 'brand',
      },
    },
  },
});

export default theme;
