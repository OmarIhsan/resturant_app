import { darkTheme, lightTheme } from '@/constants/theme';
import { CartProvider } from '@/contexts/CartContext';
import { ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { useEffect } from 'react';
import { Platform, useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const theme = extendTheme({
  colors: {
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
      50: '#ffffff',
      100: '#f8fafc',
      200: '#f1f5f9',
      300: '#e2e8f0',
      400: '#cbd5e1',
      500: '#94a3b8',
      600: '#64748b',
      700: '#475569',
      800: '#334155',
      900: '#1e293b',
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
  config: {
    initialColorMode: 'light',
  },
});

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Cairo-Regular': require('../assets/fonts/Cairo-Regular.ttf'),
    'Cairo-Bold': require('../assets/fonts/Cairo-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <NativeBaseProvider theme={theme as any}>
        <NavigationThemeProvider value={colorScheme === 'dark' ? darkTheme : lightTheme}>
          <CartProvider>
            <SafeAreaView style={{ flex: 1 }} edges={['top']}>
              <Stack
                screenOptions={{
                  headerShown: false,
                  animation: Platform.OS === 'ios' ? 'default' : 'fade',
                  contentStyle: { backgroundColor: '#fff' },
                }}
              >
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="menu/index" options={{ headerShown: false }} />
                <Stack.Screen name="cart/index" options={{ headerShown: false }} />
              </Stack>
            </SafeAreaView>
          </CartProvider>
        </NavigationThemeProvider>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}
