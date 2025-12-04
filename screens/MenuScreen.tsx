import Shimmer from '@/components/ui/Shimmer';
import { promotions } from '@/data/mockData';
import { getCategories, getItemsByCategory } from '@/data/selectors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useMemo, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';
import { Badge, Button, Card, FAB, Paragraph, Snackbar, Text, Title, useTheme } from 'react-native-paper';
import { TabBar, TabView } from 'react-native-tab-view';
import { useCart } from '../contexts/CartContext';

type RootStackParamList = {
  Home: undefined;
  Menu: undefined;
  Cart: undefined;  // Make sure this matches the case used in navigation.navigate()
};

type MenuScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Menu'>;

interface MenuItemProps {
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    image: any;
    categoryId: string;
  };
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const [quantity, setQuantity] = useState(0);
  const { dispatch } = useCart();
  const theme = useTheme();
  const [snackVisible, setSnackVisible] = useState(false);

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: item });
    setQuantity(prev => prev + 1);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    setSnackVisible(true);
  };

  const handleRemoveFromCart = () => {
    if (quantity > 0) {
      dispatch({ type: 'REMOVE_ITEM', payload: item.id });
      setQuantity(prev => prev - 1);
      Haptics.selectionAsync().catch(() => {});
      setSnackVisible(true);
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.cardContent}>
          <Image source={item.image} style={styles.image} />
          <View style={styles.itemInfo}>
            <Title style={styles.title}>{item.name}</Title>
            <Paragraph style={styles.description}>{item.description}</Paragraph>
            <Text style={styles.price}>{item.price.toFixed(2)} دينار</Text>
            {/* Single most relevant promotion badge */}
            {(() => {
              // Prioritize bundle over percentage
              const bundle = promotions.find((p) => p.type === 'bundle' && (p.bundleItems || []).includes(item.id));
              const percentage = promotions.find(
                (p) => p.type === 'percentage' && (item.categoryId === 'cat-drinks' || item.categoryId === 'cat-desserts')
              );
              const relevant = bundle || percentage;
              if (!relevant) return null;
              return (
                <Badge
                  style={{
                    alignSelf: 'flex-start',
                    marginBottom: 6,
                    backgroundColor: theme.colors.primary,
                  }}
                >
                  {relevant.title}
                </Badge>
              );
            })()}
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
      <Snackbar visible={snackVisible} onDismiss={() => setSnackVisible(false)} duration={1200}>
        {quantity > 0 ? 'Updated cart' : 'Removed from cart'}
      </Snackbar>
    </Card>
  );
};

const MenuScreen: React.FC = () => {
  const [index, setIndex] = useState(0);
  const categories = useMemo(() => getCategories(), []);
  const [routes] = useState(
    categories.map(category => ({
      key: category.id,
      title: category.name,
    }))
  );
  const navigation = useNavigation<MenuScreenNavigationProp>();
  const theme = useTheme();
  const { getTotalItems } = useCart();
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  // Loading state shimmer handled via Shimmer component

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  // No inline Animated shimmer; standardized via Shimmer component

  const renderScene = ({ route }: { route: { key: string; title: string } }) => {
    let items = getItemsByCategory(route.key);
    if (activeFilters.length) {
      items = items.filter((m: any) => (m.tags || []).some((t: string) => activeFilters.includes(t)));
    }
    return (
      <ScrollView style={styles.scene}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterBar}>
          {['Vegan', 'Gluten-Free', 'Spicy'].map((tag) => {
            const active = activeFilters.includes(tag);
            return (
              <Button
                key={tag}
                mode={active ? 'contained' : 'outlined'}
                style={styles.filterChip}
                onPress={() => {
                  setActiveFilters((prev) =>
                    prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
                  );
                }}
              >
                {tag}
              </Button>
            );
          })}
        </ScrollView>

        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Card key={`skeleton-${i}`} style={styles.card}>
                <Card.Content>
                  <View style={styles.cardContent}>
                    <Shimmer style={[styles.image, styles.skeleton]} />
                    <View style={{ flex: 1 }}>
                      <Shimmer style={[styles.skeletonLine, { width: '60%' }]} />
                      <Shimmer style={[styles.skeletonLine, { width: '90%' }]} />
                      <Shimmer style={[styles.skeletonLine, { width: '40%' }]} />
                    </View>
                  </View>
                </Card.Content>
              </Card>
            ))
          : items.map(item => (
              <MenuItem key={item.id} item={item as any} />
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
  filterBar: {
    paddingVertical: 8,
  },
  filterChip: {
    marginRight: 8,
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
  skeleton: {
    backgroundColor: '#e6e6e6',
  },
  skeletonLine: {
    height: 12,
    backgroundColor: '#e6e6e6',
    marginBottom: 8,
    borderRadius: 6,
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
