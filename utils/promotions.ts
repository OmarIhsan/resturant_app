export type CartLine = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  categoryId?: string;
};

export type Promotion = {
  id: string;
  title: string;
  type: 'percentage' | 'fixed' | 'bundle';
  value?: number; // percentage or fixed amount
  bundleItems?: string[]; // item ids required for bundle
  bundlePrice?: number; // total price for the bundle
  description?: string;
};

export type PromoResult = {
  subtotal: number;
  percentageDiscount: number;
  fixedDiscount: number;
  bundleDiscount: number;
  total: number;
  applied: { id: string; title: string; amount: number }[];
};

export function calculateTotals(cart: CartLine[], promos: Promotion[]): PromoResult {
  const subtotal = cart.reduce((sum, l) => sum + l.price * l.quantity, 0);
  let percentageDiscount = 0;
  let fixedDiscount = 0;
  let bundleDiscount = 0;
  const applied: { id: string; title: string; amount: number }[] = [];

  // Percentage discount example: apply across eligible categories if present
  const percentagePromos = promos.filter((p) => p.type === 'percentage' && p.value);
  for (const p of percentagePromos) {
    const eligibleSubtotal = cart.reduce((sum, l) => {
      // Example rule: desserts or drinks
      const eligible = l.categoryId === 'cat-desserts' || l.categoryId === 'cat-drinks';
      return sum + (eligible ? l.price * l.quantity : 0);
    }, 0);
    const disc = Math.round(((p.value || 0) / 100) * eligibleSubtotal * 100) / 100;
    if (disc > 0) {
      percentageDiscount += disc;
      applied.push({ id: p.id, title: p.title, amount: disc });
    }
  }

  // Fixed discount example: threshold based
  const fixedPromos = promos.filter((p) => p.type === 'fixed' && p.value);
  for (const p of fixedPromos) {
    // Example: apply if subtotal >= 30
    if (subtotal >= 30) {
      const amt = p.value || 0;
      fixedDiscount += amt;
      applied.push({ id: p.id, title: p.title, amount: amt });
    }
  }

  // Bundle pricing: if all bundleItems present, set combined price to bundlePrice
  const bundlePromos = promos.filter((p) => p.type === 'bundle' && p.bundleItems && p.bundlePrice);
  for (const p of bundlePromos) {
    const items = p.bundleItems || [];
    // Determine min number of complete bundles present based on quantities
    const quantities = items.map((id) => cart.find((l) => l.id === id)?.quantity || 0);
    const bundleCount = Math.min(...quantities);
    if (bundleCount > 0) {
      // Compute normal price for one set
      const normalSetPrice = items.reduce((sum, id) => {
        const line = cart.find((l) => l.id === id);
        return sum + (line ? line.price : 0);
      }, 0);
      const perBundleDiscount = Math.max(0, normalSetPrice - (p.bundlePrice || 0));
      const totalBundleDiscount = Math.round(perBundleDiscount * bundleCount * 100) / 100;
      if (totalBundleDiscount > 0) {
        bundleDiscount += totalBundleDiscount;
        applied.push({ id: p.id, title: p.title, amount: totalBundleDiscount });
      }
    }
  }

  const total = Math.max(0, Math.round((subtotal - percentageDiscount - fixedDiscount - bundleDiscount) * 100) / 100);
  return { subtotal, percentageDiscount, fixedDiscount, bundleDiscount, total, applied };
}
