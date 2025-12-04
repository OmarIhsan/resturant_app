import { promotions } from '@/data/mockData';
import { calculateTotals } from '@/utils/promotions';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { Modal, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
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

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      dispatch({ type: 'REMOVE_ITEM', payload: itemId });
    } else {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { id: itemId, quantity: newQuantity },
      });
    }
  };

  const handleRemoveItem = (itemId: string) => {
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

  // Basic promo detection (visual hint only)
  const hasDessertOrDrink = state.items.some(
    (ci) => ci.item.categoryId === 'cat-desserts' || ci.item.categoryId === 'cat-drinks'
  );
  const qualifiesFixed5 = state.total >= 30;
  const appliedPromoHint = hasDessertOrDrink
    ? 'Holiday 20% Off applies to Desserts & Drinks'
    : qualifiesFixed5
    ? '$5 off applies for orders $30+'
    : undefined;

  // Compute totals using centralized promotions utility (includes bundle rules)
  const totals = React.useMemo(() => {
    const lines = state.items.map((ci) => ({ id: ci.item.id, name: ci.item.name, price: ci.item.price, quantity: ci.quantity, categoryId: ci.item.categoryId }));
    return calculateTotals(lines, promotions as any);
  }, [state.items]);
  const [promoInfoVisible, setPromoInfoVisible] = React.useState(false);

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
        {appliedPromoHint ? (
          <View style={styles.summaryRow}>
            <Text variant="bodySmall" style={{ color: '#DAA520' }}>{appliedPromoHint}</Text>
          </View>
        ) : null}
        <View style={styles.summaryRow}>
          <Text variant="bodyMedium">Subtotal:</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Text variant="bodyMedium">{totals.subtotal.toFixed(2)} دينار</Text>
            <TouchableOpacity onPress={() => setPromoInfoVisible(true)}>
              <Text style={{ color: '#007aff' }}>Promo info</Text>
            </TouchableOpacity>
          </View>
        </View>
        {totals.percentageDiscount > 0 && (
          <View style={styles.summaryRow}>
            <Text variant="bodyMedium">Category promo:</Text>
            <Text variant="bodyMedium">- {totals.percentageDiscount.toFixed(2)} دينار</Text>
          </View>
        )}
        {totals.fixedDiscount > 0 && (
          <View style={styles.summaryRow}>
            <Text variant="bodyMedium">Fixed promo:</Text>
            <Text variant="bodyMedium">- {totals.fixedDiscount.toFixed(2)} دينار</Text>
          </View>
        )}
        {totals.bundleDiscount > 0 && (
          <View style={styles.summaryRow}>
            <Text variant="bodyMedium">Bundle savings:</Text>
            <Text variant="bodyMedium">- {totals.bundleDiscount.toFixed(2)} دينار</Text>
          </View>
        )}
        <View style={styles.summaryRow}>
          <Text variant="titleLarge">Total:</Text>
          <Text variant="titleLarge">{totals.total.toFixed(2)} دينار</Text>
        </View>
              <Modal visible={promoInfoVisible} transparent animationType="fade" onRequestClose={() => setPromoInfoVisible(false)}>
                <View style={styles.modalBackdrop}>
                  <View style={styles.modalCard}>
                    <Text variant="titleMedium" style={{ marginBottom: 8 }}>Applied Promotions</Text>
                    {totals.applied.length === 0 ? (
                      <Text>No promotions applied.</Text>
                    ) : (
                      totals.applied.map((a) => (
                        <View key={a.id} style={{ marginBottom: 8 }}>
                          <Text style={{ fontWeight: '600' }}>{a.title}</Text>
                          <Text>-{a.amount.toFixed(2)} دينار</Text>
                        </View>
                      ))
                    )}
                    <Button mode="contained" onPress={() => setPromoInfoVisible(false)} style={{ marginTop: 12 }}>Close</Button>
                  </View>
                </View>
              </Modal>
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
