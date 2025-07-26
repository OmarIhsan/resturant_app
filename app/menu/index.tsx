import { useCart } from '@/contexts/CartContext';
import { categories, MenuItem, menuItems } from '@/data/menuItems';
import { MaterialIcons } from '@expo/vector-icons';
import {
  Badge,
  Box,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  Pressable,
  ScrollView,
  Text,
  VStack
} from 'native-base';
import React, { useState } from 'react';
import { FlatList } from 'react-native';



export default function MenuScreen() {
  const [selectedCategory, setSelectedCategory] = useState('main-dishes');
  const [searchQuery, setSearchQuery] = useState('');
  const { state, dispatch } = useCart();



  console.log('Menu items:', menuItems.length);
  console.log('Selected category:', selectedCategory);
  
  const filteredItems = menuItems.filter(
    (item) =>
      item.category === selectedCategory &&
      (item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
       item.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  console.log('Filtered items:', filteredItems.length);

  const addToCart = (item: MenuItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  return (
    <Box flex={1} bg="background.500">
      {/* Header */}
      <Box px={4} py={4} bg="white" shadow={2}>
        <Heading textAlign="center" color="primary.500" mb={2}>
          قائمة الطعام
        </Heading>
        
        {/* Search Bar */}
        <Box mb={3} position="relative">
          <Input 
            placeholder="ابحث عن وجبة..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            textAlign="right"
            bg="white"
            borderRadius={10}
            py={3}
            pl={10}
            _focus={{
              borderColor: 'primary.500',
              bg: 'white',
            }}
          />
          <Box position="absolute" left={3} top={3} zIndex={1}>
            <Icon as={<MaterialIcons name="search" />} size={5} color="muted.400" />
          </Box>
        </Box>
      </Box>

      {/* Categories */}
      <Box bg="white" py={2} borderBottomWidth={1} borderColor="muted.200">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} px={4}>
          <HStack space={3}>
            {categories.map((category) => (
              <Pressable
                key={category.id}
                onPress={() => setSelectedCategory(category.id)}
                bg={selectedCategory === category.id ? 'primary.500' : 'background.500'}
                px={4}
                py={2}
                borderRadius={20}
                borderWidth={1}
                borderColor={selectedCategory === category.id ? 'primary.500' : 'muted.300'}
              >
                <Text 
                  color={selectedCategory === category.id ? 'white' : 'muted.600'}
                  fontWeight={selectedCategory === category.id ? 'bold' : 'medium'}
                >
                  {category.name}
                </Text>
              </Pressable>
            ))}
          </HStack>
        </ScrollView>
      </Box>

      {/* Menu Items */}
      <Box flex={1} p={4}>
        <FlatList
          data={filteredItems.length > 0 ? filteredItems : menuItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Box 
              bg="white" 
              borderRadius={16} 
              mb={4} 
              overflow="hidden"
              shadow={2}
              borderWidth={1}
              borderColor="muted.100"
            >
              <HStack>
                <Image
                  source={item.imageUrl}
                  alt={item.name}
                  size="lg"
                  resizeMode="cover"
                  style={{ width: 120, height: 120 }}
                />
                <Box flex={1} p={4}>
                  <HStack justifyContent="space-between" alignItems="flex-start">
                    <VStack flex={1} ml={2}>
                      <Text fontSize="lg" fontWeight="bold" color="primary.500">
                        {item.name}
                      </Text>
                      <Text color="muted.500" fontSize="sm" mt={1} numberOfLines={2}>
                        {item.description}
                      </Text>
                    </VStack>
                    
                    <Pressable 
                      onPress={() => addToCart(item)}
                      bg="primary.500" 
                      p={2} 
                      borderRadius={10}
                      _pressed={{
                        opacity: 0.8,
                      }}
                    >
                      <Icon as={<MaterialIcons name="add" />} size={5} color="white" />
                    </Pressable>
                  </HStack>
                  
                  <HStack mt={3} alignItems="center" justifyContent="space-between">
                    <Text fontSize="lg" fontWeight="bold" color="secondary.500">
                      {item.price} دينار
                    </Text>
                    
                    {state.items.some(cartItem => cartItem.item.id === item.id) && (
                      <Badge 
                        colorScheme="primary" 
                        rounded="full" 
                        variant="solid"
                        alignSelf="flex-end"
                        _text={{
                          fontSize: 'xs',
                          fontWeight: 'bold',
                        }}
                      >
                        في السلة
                      </Badge>
                    )}
                  </HStack>
                </Box>
              </HStack>
            </Box>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </Box>
    </Box>
  );
}
