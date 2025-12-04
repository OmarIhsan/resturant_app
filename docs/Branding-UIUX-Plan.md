# Restaurant App — Senior-Level Branding & UI/UX Execution Plan

This plan details a full transformation of the current Expo/React Native restaurant app into a polished, portfolio-ready "Brandy" app: bi-color branded, premium UI/UX, production-grade interactions and performance. It is designed for implementation in phases with clear deliverables and verification steps.

## Objectives
- Establish a distinct bi-color brand system applied consistently across screens and components.
- Deliver premium UX patterns: fast navigation, micro-interactions, delightful visuals, and accessibility.
- Ensure pixel-perfect execution across iOS/Android/Web with Expo, NativeBase, and React Navigation.
- Maintain clean architecture, theme-driven design, and scalable component library.

## Tech Context
- Stack: Expo + Expo Router, React Native 0.79, React 19, NativeBase, React Navigation, Reanimated, Gesture Handler, Paper/Chakra (selected pieces), Expo Image, Fonts, Haptics.
- Existing theme setup in `constants/theme.ts` and `theme/native-base-theme.ts` with Cairo font and palette.
- Entry and routing in `app/_layout.tsx` with `(tabs)` providing `explore`, `cart`, `menu`.

---

## Phase 1 — Branding Foundations (Bi-Color System)
1. Define Brand Identity
   - Choose two primary brand colors (Bi-Color): e.g., **Brand Dark** (`#0F172A` slate) and **Brand Accent** (`#DAA520` gold) for high-end culinary tone.
   - Supporting neutrals for backgrounds and surfaces: light (`#FFFFFF`, `#F8FAFC`) and dark (`#1E293B`, `#0B1220`).
   - Typography: Continue with Cairo; introduce scale tokens (12/14/16/18/22/28) and weights (400/700).

2. Consolidate Theme Files
   - Unify color tokens in `constants/theme.ts` to expose `brandDark`, `brandAccent`, `neutralLight`, `neutralDark`.
   - Align `theme/native-base-theme.ts` with the same tokens; set `Button`, `Input`, `Badge`, `Card` defaults.
   - Ensure `lightTheme`/`darkTheme` variations reflect bi-color emphasis (accent for CTAs, dark for headers/surfaces).

3. Global Surface & Elevation
   - Define elevation tokens: `surface-0/1/2/3` with associated backgrounds and shadows.
   - Implement cross-platform shadow helpers (Android elevation + iOS shadow props) in a `components/ui/Surface.tsx` primitive.

Verification
- Snapshot `MenuScreen`, `CartScreen`, `(tabs)` after theme application; ensure consistent color usage and legibility.

---

## Phase 2 — Layout & Navigation Polish
1. Tab Bar Design
   - Replace default tab bar with a branded bar: blurred translucent background using `expo-blur` (`components/ui/TabBarBackground.tsx`).
   - Active tab indicator: 2px accent underline + subtle scale/haptic on press.
   - Icons: Use consistent `@expo/vector-icons`; standardize sizes and hit slop.

2. Header & Safe Areas
   - Create `components/ui/AppHeader.tsx` with brand-dark background, title (Cairo 18/700), optional search/cart action.
   - Ensure `SafeAreaView` usage across screens; set `contentStyle` from theme background.

3. Screen Structure
   - Menu: Sticky category tabs, grid/list toggle, image-first cards with price and add-to-cart CTA.
   - Explore: Promotional banners, featured sections, horizontal carousels.
   - Cart: Order summary, quantity steppers, promo code input, checkout CTA.

Verification
- Navigation transitions smooth, consistent header presence, tab bar visuals match brand, no layout jumps.

---

## Phase 3 — Component Library & Tokens
1. Design Tokens
   - Add `tokens/spacing.ts`, `tokens/typography.ts`, `tokens/elevation.ts` for consistent spacing, font sizes, and shadows.
   - Use 4px base grid (4/8/12/16/24/32/48).

2. UI Primitives
   - `ThemedView`, `ThemedText` already exist; extend variants: `subtitle`, `caption`, `overline`.
   - `Button` variants: `primary`, `secondary`, `ghost`, `link` with accent/dark mapping.
   - `Card` component with image header, body, actions; supports `surface` prop for elevation.
   - `Badge` for categories (rounded, small, accent background).

3. Forms & Inputs
   - Styled `Input`, `Select`, `Stepper` with focus ring accent, large touch targets (48px min).

Verification
- Replace ad-hoc styles in `screens/` and `components/` with primitives; lint for no inline styles except layout.

---

## Phase 4 — Menu & Cart UX Excellence
1. Menu Browsing
   - Category chips horizontally scrollable with active accent and smooth reanimated transitions.
   - Product cards: lazy-loaded images via `expo-image` with `contentFit="cover"`, skeleton placeholders.
   - Quick Add CTA: plus button shows quantity toast/haptic, updates `CartContext`.

2. Details & Modals
   - Product detail modal (sheet) with large image, description, options, add-to-cart.
   - Use `react-native-reanimated` for enter/exit animations; dim backdrop.

3. Cart Interaction
   - Quantity steppers with long-press acceleration; subtotal/taxes; promo code apply.
   - Sticky checkout button; confirmation dialog; order summary route.

Verification
- Time-to-interaction under 100ms on modern devices; cart state consistent across tabs.

---

## Phase 5 — Micro-Interactions & Delight
1. Haptics
   - Integrate `expo-haptics` for add-to-cart, tab press, checkout actions (light/medium impact).

2. Motion
   - Subtle scale on press, fade/slide for lists, parallax headers (`components/ParallaxScrollView.tsx`).
   - Use Framer Motion (web) and Reanimated (native) where appropriate.

3. Feedback
   - Toasts/snackbars with accent backgrounds for success; non-blocking.

Verification
- Animations at 60fps; no jank during scroll or transitions.

---

## Phase 6 — Accessibility & Internationalization
1. Accessibility
   - Color contrast checks for brand dark vs text; aim AA/AAA where feasible.
   - Larger touch targets; `accessibilityLabel` on interactive elements.

2. RTL & i18n
   - Cairo font supports Arabic; test RTL layout using `I18nManager.forceRTL(true)` in dev.
   - Extract strings to `i18n/` with simple JSON-based loader; default EN + AR.

Verification
- VoiceOver/TalkBack usable; RTL layout correct with mirrored icons.

---

## Phase 7 — Performance & Quality
1. Images
   - Optimize image sizes in `assets/images/menu/`; use `expo-image` cache.

2. Bundle & Startup
   - Preload fonts/images; ensure splash hides only after readiness (`app/_layout.tsx`).
   - Use `expo-updates`; test OTA behavior.

3. Linting & Types
   - Strengthen ESLint config; ensure no `any` leaks; strict TypeScript in `models/` and `contexts/`.

Verification
- Cold start under ~2s; consistent FPS; no redboxes in navigation.

---

## Phase 8 — Theming API & Dark Mode
1. Dark Mode
   - Map brand dark as surfaces; accent retained; text reversed.
   - Add theme toggle in settings; persist with `expo-constants` or AsyncStorage.

2. Dynamic Theming
   - Expose `useThemeColor` hooks; allow runtime brand accent swap for white-label demos.

Verification
- Visual parity across light/dark; no unreadable elements.

---

## Phase 9 — Portfolio Presentation Enhancements
1. Branding Page
   - Add `screens/BrandShowcase.tsx` demonstrating tokens, components, and usage.
   - Interactive palette switchers; component gallery.

2. README & Screenshots
   - Update `README.md` with brand story, design decisions, and before/after screenshots.
   - Include short videos/GIFs of interactions.

3. EAS Build Setup
   - Configure `eas.json` profiles for `development`, `preview`, `production`.

Verification
- Polished README and assets; easy to run and evaluate.

---

## Implementation Steps (Concrete Tasks)
1. Token & Theme Consolidation
   - Update `constants/theme.ts` and `theme/native-base-theme.ts` with final bi-color tokens.
   - Ensure `app/_layout.tsx` uses unified theme; remove duplicate color definitions.

2. UI Primitives
   - Create `components/ui/Surface.tsx`, `components/ui/Button.tsx`, `components/ui/Card.tsx`, `components/ui/Badge.tsx`.

3. Navigation Polish
   - Replace tab bar background with blur; add active indicator and haptics.

4. Screen Refactors
   - `screens/MenuScreen.tsx`: category chips, grid/list toggle, skeleton loaders.
   - `screens/CartScreen.tsx`: stepper, sticky checkout, promo code.

5. Micro-Interactions
   - Integrate haptics and motion on presses and transitions.

6. Accessibility & i18n
   - Add labels, test contrast, enable RTL; extract strings.

7. Performance
   - Optimize images and startup; audit bundle size.

8. Portfolio Assets
   - Showcase screen, README refresh, screenshots and videos.

---

## Try It — Dev Commands (Windows PowerShell)
```powershell
# Start the app (choose platform)
npm install
expo start

# Android
expo start --android

# iOS (macOS required)
expo start --ios

# Web
expo start --web

# Lint
npm run lint
```

## Risks & Mitigations
- Mixed UI libraries: Prefer NativeBase + React Navigation; minimize Chakra/Paper overlap.
- Performance on lower-end devices: reduce heavy shadows/blur; cache images.
- Design drift: enforce tokens via primitives; avoid inline colors.

## Success Criteria
- Consistent bi-color brand across all surfaces and components.
- Smooth, delightful interactions with haptic/motion feedback.
- Accessible, performant, and production-ready presentation suitable for portfolio inclusion.

---

## Phase 10 — Data & Mock Content (Showcase-Ready)
1. Content Model & Coverage
   - Categories: Breakfast, Burgers, Pizzas, Salads, Desserts, Drinks, Specials, Chef’s Picks.
   - Menu Items: At least 8–12 per category with diverse pricing and dietary tags (Vegan, Gluten-Free, Spicy).
   - Promotions: Daily deals, seasonal specials, combo offers (e.g., "Burger + Drink" bundle).
   - Banners: Hero promotions and featured collections for the Explore screen.

2. Schema Alignment
   - Confirm `models/MenuItem.ts` and `models/Category.ts` fields: `id`, `name`, `description`, `price`, `currency`, `image`, `categoryId`, `tags`, `isFeatured`, `rating`, `reviewsCount`.
   - Extend if needed: `options` (size, extras), `availability` (start/end), `nutrition` (kcal, protein, carbs, fat).

3. Mock Data Sources
   - `data/menuItems.ts`: Fill with realistic items and images mapped to `assets/images/menu/`.
   - `data/mockData.ts`: Provide categories, banners, promotions, and featured sets.
   - Use names and descriptions that feel premium and authentic; ensure no copyrighted text or images.

4. Images & Placeholders
   - Place curated images under `assets/images/menu/` with consistent dimensions/aspect (e.g., 4:3, 1200x900), optimized for mobile.
   - Use temporary placeholders for missing items via `expo-image` `placeholder` prop; generate blurred low-res previews.

5. Data Seeding & Utilities
   - Add a simple seeding utility `scripts/seed-mock-data.ts` (or JS) to validate schema and log coverage.
   - Export typed selectors/utilities: `getFeaturedItems()`, `getItemsByCategory(id)`, `searchItems(query)`, `getPromotions()`.

6. Demo Scenarios (for portfolio)
   - Normal browse → add items → edit quantities → checkout flow.
   - Promo applied (percentage/fixed): show UI feedback and recalculated totals.
   - Dietary filter (e.g., Vegan): filtered list with badges.
   - Out-of-stock/availability window: gracefully disabled CTA with tooltip.

7. Localization Strings
   - Extract strings for item names, descriptions, categories, and promotions to `i18n/en.json` and `i18n/ar.json`.
   - Show RTL demo with Arabic labels; ensure truncation and wrapping rules are sane.

Verification
- Screens render rich content without empty states; filters, promos, and featured carousels behave correctly.
- No redboxes from missing images/fields; seed script validates consistency.

---

### Additional Commands (Windows PowerShell)
```powershell
# Optional — Mock Data Seed (if added)
node ./scripts/seed-mock-data.js
```
