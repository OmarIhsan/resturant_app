Offline build packaging

This folder contains two helper scripts to create and restore offline build caches.

1. `package-offline-caches.ps1` (run on an ONLINE machine)
   - Packages:
     - `%USERPROFILE%\.gradle\caches`
     - `%USERPROFILE%\.gradle\wrapper\dists`
     - selected Android SDK `platforms` and `build-tools` (configurable)
     - project `android/` directory (gradle wrapper)
     - optional `node_modules`
   - Usage:
     ```powershell
     # from repo root
     powershell -ExecutionPolicy Bypass -File .\scripts\package-offline-caches.ps1 -OutputDir C:\tmp\expo-offline -IncludeNodeModules
     ```
   - Copies data into an archive you can move to the offline machine.

2. `restore-offline-caches.ps1` (run on OFFLINE machine)
   - Usage:
     ```powershell
     powershell -ExecutionPolicy Bypass -File .\scripts\restore-offline-caches.ps1 -ArchivePath C:\usb\expo-offline-20251203-120000.zip
     ```
   - Restores caches into the correct locations and merges SDK files if present.

After restore
- From project root:
  ```powershell
  cd android
  .\gradlew assembleRelease --offline
  ```

Notes & Caveats
- Archives can be very large. Use a fast USB drive or network copy.
- Make sure `ANDROID_SDK_ROOT` is set on the offline machine before restoring SDK pieces.
- If Gradle still tries to download artifacts, ensure `%USERPROFILE%\.gradle\caches` and `wrapper\dists` were copied fully and contain the required plugin/artifact files.
