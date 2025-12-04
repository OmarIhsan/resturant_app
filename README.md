# Brandy — React Native Restaurant (Portfolio Ready)

> A polished, branded restaurant mobile app built with Expo and React Native — designed for portfolio presentation, realistic demo data, and production-grade UX patterns.

<p align="center">
  <a href="./artifacts/app-release.apk"><img src="https://img.shields.io/badge/Download%20APK-Android-brightgreen" alt="Download APK"></a>
</p>

## Quick Overview
- Purpose: Showcase a premium, bi-color themed restaurant app with realistic mock data, smooth interactions (haptics, shimmer, skeleton loaders), and a production-ready structure for Expo/EAS builds.
- Platforms: Android (APK/AAB), iOS (via EAS), Web (expo-web)
- Design goals: Clean tokens, accessible typography, consistent components, and portfolio-grade screenshots/animations.

## Key Features
- Branded bi-color theme and design tokens
- Menu browsing with category filters, skeletons and shimmer placeholders
- Explore screen with promotional banners and carousels
- Cart with accurate promo math (percentage, fixed, bundle) and promo info modal
- Reusable UI primitives and a simple theming system

## Tech Stack
- Expo (Managed) + Expo Router
- React Native 0.79, React 19
- NativeBase, React Native Paper, expo-image, expo-haptics
- Gradle (Android), EAS Build for cloud builds

## Download APK
- If an APK artifact exists in the repository at `./artifacts/app-release.apk`, use the button at the top of this README to download it.
- To produce and place that APK locally, build and then copy the release APK to `./artifacts/app-release.apk` (see the helper script in `scripts/`).

## Development — Local (fast)
1. Install dependencies:
```powershell
npm ci
# or
yarn install
```
2. Start the Expo dev server:
```powershell
npx expo start
```
3. Open on device or emulator (`a` for Android from expo CLI).

## Building — Cloud (EAS)
1. Install EAS CLI (recommended):
```powershell
npx eas-cli whoami || npx eas-cli login
```
2. Build an APK using the `preview` profile (configured in `eas.json`):
```powershell
npx eas-cli build --platform android --profile preview
```
3. Download artifact from the build output URL or with `eas-cli`.

## Building — Fully Offline (Air-gapped)
This repository supports fully offline local Gradle builds, but you must ensure all required caches and SDKs are present locally.

Two general approaches:

- Option A (recommended if you can go online once on the same machine):
  1. From project root: `npx expo prebuild -p android` (done already in this repo).
  2. Populate Gradle/Maven caches while online:
     ```powershell
     cd android
     .\gradlew --stop
     .\gradlew assembleDebug
     .\gradlew assembleRelease
     ```
  3. Disconnect network and run offline builds:
     ```powershell
     cd android
     .\gradlew assembleRelease --offline
     ```

- Option B (air-gap copy): copy `%USERPROFILE%\\.gradle\\caches`, `%USERPROFILE%\\.gradle\\wrapper\\dists`, and required Android SDK build-tools/platforms from a machine that has successfully built this project and restore them on the offline machine. Then run Gradle with `--offline`.

When a release APK is produced, use the helper to place it under `./artifacts`:
```powershell
# After a successful release build
# From project root
powershell -File .\\scripts\\save-apk.ps1
```

## Signing
- You can sign the APK manually (zipalign + apksigner) or configure signing in `android/gradle.properties` and `android/app/build.gradle` so `assembleRelease` produces a signed APK.
- See `scripts/save-apk.ps1` for a convenient local copy command.

## Tests
- Unit tests (promotion math) are located under `__tests__/promotions.test.ts`. Run:
```powershell
npm run test
```

## Contributing & Notes
- This repo is structured for demo and portfolio use — prefer token-driven styles and primitives when adding UI.
- If you change native dependencies, run `npx expo prebuild` and ensure `android/` changes are intentional.

## License
- This project is for portfolio/demo purposes. Add your preferred license if releasing publicly.

---

If you want, I can (automatically) run an EAS build, or produce the offline packaging scripts to move caches between machines. Tell me how you'd like to proceed.
