export type RootStackParamList = {
  Home: undefined;
  Explore: undefined;
  Menu: undefined;
  Cart: undefined;
  Profile: undefined;
  // Add other screen params as needed
};

export type TabParamList = {
  HomeTab: undefined;
  ExploreTab: undefined;
  MenuTab: undefined;
  CartTab: undefined;
  ProfileTab: undefined;
};

export type MenuStackParamList = {
  MenuList: undefined;
  MenuItem: { itemId: string };
};

export type CartStackParamList = {
  CartList: undefined;
  Checkout: undefined;
  OrderConfirmation: { orderId: string };
};

// Add any other navigation-related types here
