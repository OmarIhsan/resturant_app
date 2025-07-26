export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: any;
}

export const menuItems: MenuItem[] = [
  // Main Dishes - الأطباق الرئيسية
  {
    id: 1,
    name: 'سمك السلمون المشوي',
    description: 'سمك سلمون طازج مع صلصة الليمون والزبدة',
    price: 25000,
    category: 'main-dishes',
    imageUrl: require('../assets/images/menu/grilled_salmon.jpg'),
  },
  {
    id: 2,
    name: 'ستيك ريب آي',
    description: 'ستيك لحم بقري مميز مع خضروات مشوية',
    price: 30000,
    category: 'main-dishes',
    imageUrl: require('../assets/images/menu/ribeye_steak.jpg'),
  },
  {
    id: 3,
    name: 'باستا كاربونارا',
    description: 'باستا إيطالية مع البيض والجبن واللحم المقدد',
    price: 18000,
    category: 'main-dishes',
    imageUrl: require('../assets/images/menu/carbonara.jpg'),
  },
  {
    id: 4,
    name: 'باستا ألفريدو',
    description: 'باستا مع صلصة كريمية وجبن بارميزان',
    price: 16000,
    category: 'main-dishes',
    imageUrl: require('../assets/images/menu/alfredo.jpg'),
  },
  // Appetizers - المقبلات
  {
    id: 5,
    name: 'بروشيتا',
    description: 'خبز محمص مع طماطم وريحان طازج',
    price: 8000,
    category: 'appetizers',
    imageUrl: require('../assets/images/menu/bruschetta.jpg'),
  },
  {
    id: 6,
    name: 'أصابع الموزاريلا',
    description: 'جبنة موزاريلا مقلية مع صلصة الطماطم',
    price: 10000,
    category: 'appetizers',
    imageUrl: require('../assets/images/menu/mozzarella_sticks.jpg'),
  },
  // Desserts - الحلويات
  {
    id: 7,
    name: 'تيراميسو',
    description: 'حلوى إيطالية تقليدية مع القهوة والجبن الكريمي',
    price: 12,
    category: 'desserts',
    imageUrl: require('../assets/images/menu/tiramisu.jpg'),
  },

];

export const categories = [
  { id: 'main-dishes', name: 'الأطباق الرئيسية' },
  { id: 'appetizers', name: 'المقبلات' },
  { id: 'desserts', name: 'الحلويات' },
];
