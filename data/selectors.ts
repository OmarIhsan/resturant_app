import { menuItems } from './menuItems';
import { categories, promotions } from './mockData';

export function getItemsByCategory(categoryId: string) {
  return menuItems.filter((m) => m.categoryId === categoryId);
}

export function searchItems(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return menuItems;
  return menuItems.filter(
    (m) =>
      m.name.toLowerCase().includes(q) ||
      (m.description && m.description.toLowerCase().includes(q)) ||
      (m.tags || []).some((t) => t.toLowerCase().includes(q))
  );
}

export function getFeaturedItems(ids: string[]) {
  const set = new Set(ids);
  return menuItems.filter((m) => set.has(m.id));
}

export function getPromotions() {
  return promotions;
}

export function getCategories() {
  return categories;
}
