// Simple seed/validation script for mock data
/* eslint-disable no-console */
const path = require('path');

function load(tsPath) {
  // Metro/Expo uses TypeScript transpilation; for seed we can require compiled JS or use ts-node.
  // For simplicity in this demo, we use Babel-register fallback if available; otherwise just require.
  try {
    return require(tsPath);
  } catch (e) {
    console.warn('Direct require failed for', tsPath, e.message);
    return require(tsPath.replace(/\.ts$/, '.js'));
  }
}

function main() {
  const mock = load(path.join('..', 'data', 'mockData.ts'));
  const itemsModule = load(path.join('..', 'data', 'menuItems.ts'));

  const categories = mock.categories || [];
  const banners = mock.banners || [];
  const promotions = mock.promotions || [];
  const featuredSets = mock.featuredSets || {};
  const items = itemsModule.menuItems || [];

  console.log('--- Mock Data Summary ---');
  console.log('Categories:', categories.length);
  console.log('Menu Items:', items.length);
  console.log('Banners:', banners.length);
  console.log('Promotions:', promotions.length);
  console.log('Featured Sets:', Object.keys(featuredSets).length);

  // Basic validations
  const itemIds = new Set();
  let missingImages = 0;
  let missingCategories = 0;
  items.forEach((item) => {
    if (itemIds.has(item.id)) {
      console.warn('Duplicate item id:', item.id);
    }
    itemIds.add(item.id);
    if (!item.image) missingImages += 1;
    if (!categories.find((c) => c.id === item.categoryId)) missingCategories += 1;
  });

  console.log('Missing Images:', missingImages);
  console.log('Items with unknown category:', missingCategories);

  // Featured exist check
  Object.entries(featuredSets).forEach(([key, ids]) => {
    const missing = ids.filter((id) => !itemIds.has(id));
    if (missing.length) {
      console.warn(`Featured set '${key}' missing items:`, missing.join(', '));
    }
  });

  console.log('Seed validation complete.');
}

main();
