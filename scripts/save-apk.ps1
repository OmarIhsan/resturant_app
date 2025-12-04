# Copies the built APK into ./artifacts/app-release.apk for easy access/download
# Usage: From project root
#   powershell -File .\scripts\save-apk.ps1

$repoRoot = Split-Path -Parent $PSScriptRoot
$unsigned = Join-Path $repoRoot "android\app\build\outputs\apk\release\app-release-unsigned.apk"
$signed = Join-Path $repoRoot "android\app\build\outputs\apk\release\app-release-signed.apk"
$destDir = Join-Path $repoRoot "artifacts"
$dest = Join-Path $destDir "app-release.apk"

if (-not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir | Out-Null
}

if (Test-Path $signed) {
    Copy-Item $signed $dest -Force
    Write-Host "Copied signed APK to $dest"
    exit 0
} elseif (Test-Path $unsigned) {
    Copy-Item $unsigned $dest -Force
    Write-Host "Copied unsigned APK to $dest (please sign before publishing)"
    exit 0
} else {
    Write-Error "No APK found. Build the project (assembleRelease) and then run this script."
    exit 1
}
