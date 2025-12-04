import { calculateTotals, CartLine, Promotion } from '@/utils/promotions';

describe('promotions.calculateTotals', () => {
  const basePromos: Promotion[] = [
    { id: 'percent-20', title: 'Holiday 20% Off', type: 'percentage', value: 20 },
    { id: 'fixed-3', title: 'Fixed 3 off 30+', type: 'fixed', value: 3 },
    { id: 'bundle-burger-drink', title: 'Burger + Drink Bundle', type: 'bundle', bundleItems: ['burger-1', 'drink-1'], bundlePrice: 7.5 },
  ];

  it('applies percentage to desserts/drinks only', () => {
    const cart: CartLine[] = [
      { id: 'dessert-1', name: 'Cake', price: 5, quantity: 2, categoryId: 'cat-desserts' },
      { id: 'pizza-1', name: 'Pizza', price: 10, quantity: 1, categoryId: 'cat-pizzas' },
    ];
    const res = calculateTotals(cart, basePromos);
    expect(res.subtotal).toBe(20);
    // 20% of desserts total (10) = 2
    expect(res.percentageDiscount).toBe(2);
    // No fixed discount since subtotal < 30
    expect(res.total).toBe(18);
  });

  it('applies fixed discount when threshold met', () => {
    const cart: CartLine[] = [
      { id: 'pizza-1', name: 'Pizza', price: 10, quantity: 3, categoryId: 'cat-pizzas' },
    ];
    const res = calculateTotals(cart, basePromos);
    expect(res.subtotal).toBe(30);
    expect(res.fixedDiscount).toBe(3);
    expect(res.total).toBe(27);
  });

  it('applies bundle discount for complete sets', () => {
    const cart: CartLine[] = [
      { id: 'burger-1', name: 'Burger', price: 6, quantity: 2, categoryId: 'cat-burgers' },
      { id: 'drink-1', name: 'Drink', price: 3, quantity: 2, categoryId: 'cat-drinks' },
    ];
    const res = calculateTotals(cart, basePromos);
    expect(res.subtotal).toBe(18);
    // normal set price = 9, bundle price = 7.5, discount per bundle = 1.5, two bundles -> 3
    expect(res.bundleDiscount).toBe(3);
    // Also applies 20% on drinks (6 -> 1.2)
    expect(res.total).toBe(13.8);
  });
});
