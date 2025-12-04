import { Category } from '@/models/Category';

export type Banner = {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  cta?: string;
};

export type Promotion = {
  id: string;
  title: string;
  description?: string;
  type: 'percentage' | 'fixed' | 'bundle';
  value?: number; // percentage or fixed amount
  bundleItems?: string[]; // menuItem ids
};

export const categories: Category[] = [
  { id: 'cat-breakfast', name: 'Breakfast' },
  { id: 'cat-burgers', name: 'Burgers' },
  { id: 'cat-pizzas', name: 'Pizzas' },
  { id: 'cat-salads', name: 'Salads' },
  { id: 'cat-desserts', name: 'Desserts' },
  { id: 'cat-drinks', name: 'Drinks' },
  { id: 'cat-specials', name: 'Specials' },
  { id: 'cat-chef', name: "Chef's Picks" },
];

export const banners: Banner[] = [
  {
    id: 'banner-hero-1',
    title: 'Festive Flavors Week',
    subtitle: 'Limited-time seasonal dishes',
    image: 'https://images.unsplash.com/photo-1543352634-51576c5b3cde?w=1200&h=900&fit=crop&q=70',
    cta: 'Explore Specials',
  },
  {
    id: 'banner-combo-1',
    title: 'Burger + Drink Combo',
    subtitle: 'Save 20% on combos',
    image: 'https://images.unsplash.com/photo-1550317138-10000687a72b?w=1200&h=900&fit=crop&q=70',
    cta: 'View Deals',
  },
];

export const promotions: Promotion[] = [
  {
    id: 'promo-20pct',
    title: 'Holiday 20% Off',
    description: 'Applies to desserts and drinks',
    type: 'percentage',
    value: 20,
  },
  {
    id: 'promo-fixed-5',
    title: '$5 Off Orders $30+',
    description: 'Automatic at checkout',
    type: 'fixed',
    value: 5,
  },
  {
    id: 'promo-bundle-burger',
    title: 'Burger + Drink Bundle',
    description: 'Classic Burger with any drink',
    type: 'bundle',
    bundleItems: ['burger-classic', 'drink-cola', 'drink-iced-tea'],
  },
];

export const featuredSets = {
  chefPicks: ['pizza-truffle', 'salad-quinoa', 'dessert-cheesecake'],
  seasonal: ['breakfast-french-toast', 'drink-pumpkin-latte'],
};

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
