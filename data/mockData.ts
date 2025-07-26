import Category from '../models/Category';

const mockCategories: Category[] = [
  {
    id: 1,
    name: 'Appetizers',
    menuItems: [
      {
        id: 1,
        name: 'Bruschetta',
        description: 'Toasted bread topped with tomatoes, garlic and fresh basil',
        price: 8.99,
        imageUrl: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        categoryId: 1,
      },
      {
        id: 2,
        name: 'Mozzarella Sticks',
        description: 'Breaded mozzarella cheese fried to golden perfection',
        price: 7.50,
        imageUrl: 'https://images.unsplash.com/photo-1563371337632-b490890eafe4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        categoryId: 1,
      },
    ],
  },
  {
    id: 2,
    name: 'Main Courses',
    menuItems: [
      {
        id: 3,
        name: 'Grilled Salmon',
        description: 'Fresh Atlantic salmon with lemon butter sauce',
        price: 22.99,
        imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        categoryId: 2,
      },
      {
        id: 4,
        name: 'Ribeye Steak',
        description: '12oz premium cut with roasted vegetables',
        price: 28.99,
        imageUrl: 'https://images.unsplash.com/photo-1432139509613-5c4255815697?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        categoryId: 2,
      },
    ],
  },
  {
    id: 3,
    name: 'Pasta',
    menuItems: [
      {
        id: 5,
        name: 'Spaghetti Carbonara',
        description: 'Classic pasta with eggs, cheese, pancetta, and black pepper',
        price: 16.99,
        imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526229898c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        categoryId: 3,
      },
      {
        id: 6,
        name: 'Fettuccine Alfredo',
        description: 'Creamy pasta with parmesan cheese and butter',
        price: 15.99,
        imageUrl: 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        categoryId: 3,
      },
    ],
  },
  {
    id: 4,
    name: 'Desserts',
    menuItems: [
      {
        id: 7,
        name: 'Tiramisu',
        description: 'Classic Italian dessert with coffee-soaked ladyfingers',
        price: 8.99,
        imageUrl: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        categoryId: 4,
      },
      {
        id: 8,
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with a molten center, served with vanilla ice cream',
        price: 9.50,
        imageUrl: 'https://images.unsplash.com/photo-1571115173804-db92b7f4d3d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        categoryId: 4,
      },
    ],
  },
];

export default mockCategories;
