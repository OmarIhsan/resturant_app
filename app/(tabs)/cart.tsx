import CartScreen from '@/screens/CartScreen';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function CartTabScreen() {
  return (
    <View style={styles.container}>
      <CartScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
