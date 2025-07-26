import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Divider, List, Text, useTheme } from 'react-native-paper';
import { useCart } from '../contexts/CartContext';

// Define the parameter list for your navigation
type RootStackParamList = {
  Home: undefined;
  Menu: undefined;
  Cart: undefined;
  // Add other screen names as needed
};

// Define the navigation prop type for this screen
type CartScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Cart'>;

const CartScreen: React.FC = () => {
  const { state, dispatch, getTotalItems } = useCart();
  const navigation = useNavigation<CartScreenNavigationProp>();
  const theme = useTheme();

  const handleUpdateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      dispatch({ type: 'REMOVE_ITEM', payload: itemId });
    } else {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { id: itemId, quantity: newQuantity },
      });
    }
  };

  const handleRemoveItem = (itemId: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  };

  if (state.items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={[styles.emptyText, { fontSize: 20, fontWeight: 'bold' }]}>
          Your cart is empty
        </Text>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Home')}
          style={styles.button}
        >
          Continue Shopping
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <List.Section>
          {state.items.map((cartItem) => (
            <Card key={cartItem.item.id} style={styles.card}>
              <Card.Content>
                <View style={styles.itemContainer}>
                  <View style={styles.itemInfo}>
                    <Text variant="titleMedium">{cartItem.item.name}</Text>
                    <Text variant="bodyMedium" style={styles.price}>
                      {(cartItem.item.price * cartItem.quantity).toFixed(2)} دينار
                    </Text>
                    <Text variant="bodySmall" style={styles.quantity}>
                      {cartItem.item.price.toFixed(2)} دينار لكل قطعة
                    </Text>
                  </View>
                  <View style={styles.quantityContainer}>
                    <Button
                      compact
                      mode="outlined"
                      onPress={() =>
                        handleUpdateQuantity(cartItem.item.id, cartItem.quantity - 1)
                      }
                      style={styles.quantityButton}
                    >
                      -
                    </Button>
                    <Text style={styles.quantityText}>{cartItem.quantity}</Text>
                    <Button
                      compact
                      mode="outlined"
                      onPress={() =>
                        handleUpdateQuantity(cartItem.item.id, cartItem.quantity + 1)
                      }
                      style={styles.quantityButton}
                    >
                      +
                    </Button>
                    <Button
                      icon="delete"
                      onPress={() => handleRemoveItem(cartItem.item.id)}
                      style={styles.deleteButton}
                    >
                      Remove
                    </Button>
                  </View>
                </View>
              </Card.Content>
              <Divider />
            </Card>
          ))}
        </List.Section>
      </ScrollView>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text variant="titleMedium">Total Items:</Text>
          <Text variant="titleMedium">{getTotalItems()}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text variant="titleLarge">Total:</Text>
          <Text variant="titleLarge">{state.total.toFixed(2)} دينار</Text>
        </View>
        <Button
          mode="contained"
          onPress={() => {
            // Handle checkout
          }}
          style={styles.checkoutButton}
        >
          Proceed to Checkout
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    marginBottom: 20,
  },
  card: {
    margin: 8,
    elevation: 2,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  itemInfo: {
    flex: 1,
  },
  price: {
    fontWeight: 'bold',
    marginTop: 4,
  },
  quantity: {
    color: '#666',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    minWidth: 40,
    marginHorizontal: 4,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 8,
    minWidth: 20,
    textAlign: 'center',
  },
  deleteButton: {
    marginLeft: 8,
  },
  summaryContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  checkoutButton: {
    marginTop: 16,
    paddingVertical: 8,
  },
  button: {
    marginTop: 16,
  },
});

export default CartScreen;
