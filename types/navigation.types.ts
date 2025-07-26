import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  cart: undefined;
  // Add other screens here as needed
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
