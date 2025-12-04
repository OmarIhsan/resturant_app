This folder is intended to contain built APK artifacts for easy download from the repository root.

- Place a release APK at `artifacts/app-release.apk` to enable the "Download APK" button in the project `README.md`.
- The project includes a helper script `scripts/save-apk.ps1` which copies the output APK from `android/app/build/outputs/...` into `artifacts/`.

Notes:
- If you commit APK binaries to a public repo, be mindful of repository size and security.
- For demo purposes you can keep the APK alongside the repo locally and use the README button to open or copy the file.