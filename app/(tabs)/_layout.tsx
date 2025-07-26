import { TabBarIcon } from '@/components/TabBarIcon';
import { useCart } from '@/contexts/CartContext';
import { Tabs } from 'expo-router';
import { Box, Text, useTheme } from 'native-base';
import { Platform } from 'react-native';

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      Explore: undefined;
      Cart: undefined;
    }
  }
}



export default function TabLayout() {
  const { state } = useCart();
  const { colors } = useTheme();

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + (item.quantity || 0), 0);
  };
  
  const tabBarStyle = {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.muted[200],
    height: Platform.OS === 'ios' ? 90 : 80,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    paddingTop: 10,
    paddingHorizontal: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  };
  
  const tabBarLabelStyle = {
    fontFamily: 'Cairo-Bold',
    fontSize: 12,
    marginBottom: 4,
    marginTop: 2,
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary[500],
        tabBarInactiveTintColor: colors.muted[500],
        tabBarStyle,
        tabBarLabelStyle,
        tabBarIconStyle: {
          marginBottom: -4,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'الرئيسية',
          tabBarIcon: ({ color, focused }) => (
            <Box alignItems="center">
              <TabBarIcon
                name="home"
                color={color}
                focused={focused}
              />
              {focused && (
                <Box mt={1} w={1.5} h={1.5} bg="primary.500" rounded="full" />
              )}
            </Box>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'تصفح',
          tabBarIcon: ({ color, focused }) => (
            <Box alignItems="center">
              <TabBarIcon name="explore" color={color} focused={focused} />
              {focused && (
                <Box mt={1} w={1.5} h={1.5} bg="primary.500" rounded="full" />
              )}
            </Box>
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: 'السلة',
          tabBarIcon: ({ color, focused }) => (
            <Box alignItems="center">
              <Box>
                <TabBarIcon name="shopping-cart" color={color} focused={focused} />
                {getTotalItems() > 0 && (
                  <Box
                    position="absolute"
                    right={-8}
                    top={-4}
                    bg="primary.500"
                    rounded="full"
                    w={5}
                    h={5}
                    alignItems="center"
                    justifyContent="center"
                    borderWidth={2}
                    borderColor="background.500"
                  >
                    <Text color="white" fontSize="2xs" fontWeight="bold">
                      {getTotalItems() > 9 ? '9+' : getTotalItems()}
                    </Text>
                  </Box>
                )}
              </Box>
              {focused && (
                <Box mt={1} w={1.5} h={1.5} bg="primary.500" rounded="full" />
              )}
            </Box>
          ),
        }}
      />
    </Tabs>
  );
}
