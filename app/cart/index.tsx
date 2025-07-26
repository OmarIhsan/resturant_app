import { useCart } from '@/contexts/CartContext';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Alert, FlatList, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CartScreen() {
  const { state, dispatch } = useCart();
  const { items } = state;
  
  const total = items.reduce((sum, cartItem) => sum + (cartItem.item.price * cartItem.quantity), 0);
  
  const updateQuantity = (id: string | number, change: number) => {
    // Convert both IDs to string for consistent comparison
    const cartItem = items.find(cartItem => String(cartItem.item.id) === String(id));
    if (cartItem) {
      const newQuantity = cartItem.quantity + change;
      if (newQuantity > 0) {
        dispatch({ 
          type: 'UPDATE_QUANTITY', 
          payload: { 
            id: cartItem.item.id, // Keep original type for the payload
            quantity: newQuantity 
          } 
        });
      } else {
        dispatch({ type: 'REMOVE_ITEM', payload: cartItem.item.id });
      }
    }
  };
  
  const removeFromCart = (id: string | number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: Number(id) });
  };

  const sendWhatsAppOrder = () => {
    if (state.items.length === 0) {
      Alert.alert('السلة فارغة', 'الرجاء إضافة عناصر إلى السلة أولاً');
      return;
    }

    const phoneNumber = 'PHONE_NUMBER'; // Replace with actual business WhatsApp number
    
    // Format order message in Arabic
    let message = '🌯 *طلب جديد* 🌯\n\n';
    message += 'مرحباً، أود طلب التالي:\n\n';
    
    state.items.forEach((item) => {
      message += `▫️ *${item.item.name}*\n`;
      message += `   ${item.quantity} × ${item.item.price} دينار\n\n`;
    });
    
    const subtotal = state.items.reduce((sum, item) => sum + (item.item.price * item.quantity), 0);
    const tax = subtotal * 0.15; // 15% tax
    const total = subtotal + tax;
    
    message += '------------------\n';
    message += `المجموع الفرعي: ${subtotal.toFixed(2)} دينار\n`;
    message += `الضريبة (15%): ${tax.toFixed(2)} دينار\n`;
    message += `*الإجمالي: ${total.toFixed(2)} دينار*\n\n`;
    message += 'شكراً لطلبكم 🍽️';
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp
    Linking.openURL(url).catch(() => {
      Alert.alert('خطأ', 'تعذر فتح تطبيق واتساب. يرجى التأكد من تثبيت التطبيق.');
    });
    Alert.alert('خطأ', 'حدث خطأ أثناء محاولة فتح واتساب');
  };

  const renderItem = ({ item }: { item: { item: any; quantity: number } }) => (
    <View style={styles.cartItem}>
      <Image source={item.item.imageUrl} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.item.name}</Text>
        <Text style={styles.itemPrice}>{item.item.price} دينار</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity 
          style={styles.quantityButton}
          onPress={() => updateQuantity(item.item.id, -1)}
        >
          <MaterialIcons name="remove" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity 
          style={styles.quantityButton}
          onPress={() => updateQuantity(item.item.id, 1)}
        >
          <MaterialIcons name="add" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity 
        style={styles.removeButton}
        onPress={() => removeFromCart(item.item.id)}
      >
        <MaterialIcons name="delete" size={24} color="#ff6b6b" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>سلة المشتريات</Text>
      
      {items.length === 0 ? (
        <View style={styles.emptyCart}>
          <MaterialIcons name="shopping-cart" size={64} color="#ccc" />
          <Text style={styles.emptyText}>سلة المشتريات فارغة</Text>
          <Text style={styles.emptySubtext}>قم بإضافة بعض العناصر إلى السلة</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.item.id.toString()}
            contentContainerStyle={styles.cartList}
          />
          
          <View style={styles.summary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>المجموع</Text>
              <Text style={styles.summaryValue}>{total.toFixed(2)} دينار</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.checkoutButton}
              onPress={sendWhatsAppOrder}
            >
              <MaterialIcons name="send" size={24} color="#fff" />
              <Text style={styles.checkoutButtonText}>إرسال الطلب عبر واتساب</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    fontFamily: 'Cairo-Bold',
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#666',
    fontFamily: 'Cairo-Bold',
  },
  emptySubtext: {
    fontSize: 16,
    color: '#999',
    marginTop: 8,
    fontFamily: 'Cairo-Regular',
  },
  cartList: {
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    alignItems: 'center',
    elevation: 2,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginHorizontal: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'right',
    fontFamily: 'Cairo-Bold',
  },
  itemPrice: {
    fontSize: 14,
    color: '#ff6b6b',
    textAlign: 'right',
    fontFamily: 'Cairo-Bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  quantityButton: {
    backgroundColor: '#ff6b6b',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    marginHorizontal: 12,
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
  },
  removeButton: {
    padding: 8,
  },
  summary: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  summaryLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Cairo-Bold',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff6b6b',
    fontFamily: 'Cairo-Bold',
  },
  checkoutButton: {
    backgroundColor: '#25D366',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
    fontFamily: 'Cairo-Bold',
  },
});


