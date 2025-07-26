import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, FAB, Paragraph, Text, Title, useTheme } from 'react-native-paper';
import { TabBar, TabView } from 'react-native-tab-view';
import { useCart } from '../contexts/CartContext';
import mockCategories from '../data/mockData';

type RootStackParamList = {
  Home: undefined;
  Menu: undefined;
  Cart: undefined;  // Make sure this matches the case used in navigation.navigate()
};

type MenuScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Menu'>;

interface MenuItemProps {
  item: {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    categoryId: number;
  };
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const [quantity, setQuantity] = useState(0);
  const { dispatch } = useCart();
  const theme = useTheme();

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: item });
    setQuantity(prev => prev + 1);
  };

  const handleRemoveFromCart = () => {
    if (quantity > 0) {
      dispatch({ type: 'REMOVE_ITEM', payload: item.id });
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.cardContent}>
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
          <View style={styles.itemInfo}>
            <Title style={styles.title}>{item.name}</Title>
            <Paragraph style={styles.description}>{item.description}</Paragraph>
            <Text style={styles.price}>{item.price.toFixed(2)} دينار</Text>
            <View style={styles.quantityContainer}>
              <Button
                mode="outlined"
                onPress={handleRemoveFromCart}
                style={styles.quantityButton}
                disabled={quantity === 0}
              >
                -
              </Button>
              <Text style={styles.quantityText}>{quantity}</Text>
              <Button
                mode="contained"
                onPress={handleAddToCart}
                style={styles.quantityButton}
              >
                +
              </Button>
            </View>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const MenuScreen: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState(
    mockCategories.map(category => ({
      key: category.id.toString(),
      title: category.name,
    }))
  );
  const navigation = useNavigation<MenuScreenNavigationProp>();
  const theme = useTheme();
  const { getTotalItems } = useCart();

  const renderScene = ({ route }: { route: { key: string; title: string } }) => {
    const category = mockCategories.find(cat => cat.id.toString() === route.key);
    if (!category) return null;

    return (
      <ScrollView style={styles.scene}>
        {category.menuItems.map(item => (
          <MenuItem key={item.id} item={item} />
        ))}
      </ScrollView>
    );
  };

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: theme.colors.primary }}
      style={{ backgroundColor: theme.colors.surface }}
      labelStyle={{ color: theme.colors.primary }}
      scrollEnabled
    />
  );

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={renderTabBar}
      />
      {getTotalItems() > 0 && (
        <FAB
          style={[styles.fab, { backgroundColor: theme.colors.primary }]}
          icon="cart"
          onPress={() => navigation.navigate('Cart')}
          label={`${getTotalItems()} items`}
          color="white"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scene: {
    flex: 1,
    padding: 8,
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  itemInfo: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    minWidth: 40,
    height: 32,
    marginHorizontal: 4,
    justifyContent: 'center',
  },
  quantityText: {
    width: 20,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default MenuScreen;
