import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as React from 'react';
import { Image, ScrollView, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { Button, Card, Paragraph, Text, Title, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';



// Define the type for our featured items
type FeaturedItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: any;
};

const featuredItems: FeaturedItem[] = [
  {
    id: 1,
    name: 'سمك السلمون المشوي',
    description: 'سمك سلمون طازج مع صلصة الليمون والزبدة',
    price: 25000,
    imageUrl: require('../../assets/images/menu/grilled_salmon.jpg'),
  },
  {
    id: 2,
    name: 'ستيك ريب آي',
    description: 'ستيك لحم بقري مميز مع خضروات مشوية',
    price: 30000,
    imageUrl: require('../../assets/images/menu/ribeye_steak.jpg'),
  },
  {
    id: 3,
    name: 'تيراميسو',
    description: 'حلوى إيطالية تقليدية مع القهوة والجبن الكريمي',
    price: 12000,
    imageUrl: require('../../assets/images/menu/tiramisu.jpg'),
  },
];

export default function HomeScreen() {
  const theme = useTheme();
  


  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' }}
          style={styles.heroImage}
          resizeMode="cover"
        />
        
        <View style={styles.content}>
          <Text variant="headlineMedium" style={styles.welcomeText as TextStyle}>
            Welcome to Our Restaurant
          </Text>
          
          <Text variant="bodyLarge" style={styles.subtitle as TextStyle}>
            Discover our delicious dishes made with the finest ingredients
          </Text>
          
          <Button 
            mode="contained" 
            onPress={() => router.push('/menu')}
            style={[styles.menuButton, { 
              backgroundColor: theme.colors.primary,
              paddingVertical: 12,
              borderRadius: 8,
              marginTop: 16,
              marginBottom: 24,
              elevation: 4,
            }]}
            contentStyle={{
              flexDirection: 'row-reverse',
              paddingHorizontal: 24,
            }}
            icon={() => (
              <MaterialIcons 
                name="restaurant-menu" 
                size={24} 
                color="white" 
                style={{ marginLeft: 8 }}
              />
            )}
            labelStyle={{
              fontSize: 16,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}
          >
            عرض القائمة الكاملة
          </Button>
          
          <Text variant="headlineSmall" style={styles.sectionTitle as TextStyle}>
            Today&apos;s Specials
          </Text>
          
          {featuredItems.map((item) => (
            <Card key={item.id} style={styles.card as ViewStyle}>
              <Card.Content>
                <View style={styles.cardContent}>
                  <Image 
                    source={item.imageUrl} 
                    style={styles.itemImage}
                  />
                  <View style={styles.itemDetails}>
                    <Title>{item.name}</Title>
                    <Paragraph numberOfLines={2} style={styles.itemDescription as TextStyle}>
                      {item.description}
                    </Paragraph>
                    <Text style={styles.price as TextStyle}>{item.price.toFixed(2)} دينار</Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroImage: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 16,
  },
  welcomeText: {
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#666',
  },
  menuButton: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemDescription: {
    color: '#666',
    marginBottom: 8,
  },
  price: {
    fontWeight: 'bold',
    color: '#2e7d32',
    fontSize: 16,
  },
});
