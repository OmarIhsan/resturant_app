<#
Script: restore-offline-caches.ps1
Run this on the OFFLINE machine that will perform the build. It restores Gradle caches, wrapper dists, Android SDK pieces (if included), project android/ folder and optional node_modules.

Usage (run from repository root):
  powershell -ExecutionPolicy Bypass -File .\scripts\restore-offline-caches.ps1 -ArchivePath C:\usb\expo-offline-20251203-120000.zip

This script will:
- extract the archive to a temporary folder
- copy `.gradle\caches` and `.gradle\wrapper\dists` into `%USERPROFILE%` (creating folders)
- copy android-sdk components into `%ANDROID_SDK_ROOT%` if present in the archive
- restore `android/` directory and optionally `node_modules`

IMPORTANT: this script will overwrite or merge into existing directories. Back up any important data.
#>
param(
  [Parameter(Mandatory=$true)]
  [string]$ArchivePath,
  [switch]$OverwriteExisting = $true
)

if(-not (Test-Path $ArchivePath)){
  Write-Error "Archive not found: $ArchivePath"
  exit 1
}

$repoRoot = (Get-Location).Path
$tmp = Join-Path $env:TEMP ("expo-offline-restore-{0}" -f ([System.Guid]::NewGuid().ToString()))
New-Item -ItemType Directory -Path $tmp | Out-Null

Write-Host "Extracting archive to $tmp"
Expand-Archive -Path $ArchivePath -DestinationPath $tmp -Force

# Find gradle caches and dists in extracted content
$extracted = Get-ChildItem -Path $tmp -Directory | Select-Object -ExpandProperty FullName

# Copy gradle caches
$gradleCachesSrc = Join-Path $tmp "caches"
if(-not (Test-Path $gradleCachesSrc)){
  # maybe nested under .gradle\caches
  $cand = Get-ChildItem -Path $tmp -Recurse -Directory | Where-Object { $_.FullName -match '\.gradle\\caches$' } | Select-Object -First 1
  if($cand){ $gradleCachesSrc = $cand.FullName }
}

if(Test-Path $gradleCachesSrc){
  $dest = Join-Path $env:USERPROFILE ".gradle\caches"
  Write-Host "Restoring Gradle caches to $dest"
  Ensure-Path $dest
  Copy-Item -Path $gradleCachesSrc\* -Destination $dest -Recurse -Force
} else { Write-Warning "Gradle caches not found in archive." }

# Copy gradle wrapper dists
$gradleDistsSrc = Join-Path $tmp "wrapper\dists"
if(-not (Test-Path $gradleDistsSrc)){
  $cand = Get-ChildItem -Path $tmp -Recurse -Directory | Where-Object { $_.FullName -match '\.gradle\\wrapper\\dists$' } | Select-Object -First 1
  if($cand){ $gradleDistsSrc = $cand.FullName }
}
if(Test-Path $gradleDistsSrc){
  $dest = Join-Path $env:USERPROFILE ".gradle\wrapper\dists"
  Write-Host "Restoring Gradle wrapper dists to $dest"
  Ensure-Path $dest
  Copy-Item -Path $gradleDistsSrc\* -Destination $dest -Recurse -Force
} else { Write-Warning "Gradle wrapper dists not found in archive." }

# Copy android-sdk pieces if present
$androidSdk = $env:ANDROID_SDK_ROOT
if($androidSdk){
  $sdkSrc = Join-Path $tmp "android-sdk"
  if(Test-Path $sdkSrc){
    Write-Host "Restoring Android SDK pieces to $androidSdk (merging)..."
    Copy-Item -Path (Join-Path $sdkSrc '*') -Destination $androidSdk -Recurse -Force
  } else { Write-Host "No android-sdk folder in archive to restore." }
} else { Write-Warning "ANDROID_SDK_ROOT is not set. If you included sdk pieces, set ANDROID_SDK_ROOT before running restore." }

# Restore project android/ folder
$androidSrc = Join-Path $tmp 'android'
if(Test-Path $androidSrc){
  $dest = Join-Path $repoRoot 'android'
  Write-Host "Restoring project android/ to $dest"
  if(Test-Path $dest -and -not $OverwriteExisting){ Write-Error "android/ already exists and overwrite disabled."; exit 1 }
  Copy-Item -Path $androidSrc\* -Destination $dest -Recurse -Force
} else { Write-Host "No android/ folder found in the archive." }

# Restore node_modules if present
$nmSrc = Join-Path $tmp 'node_modules'
if(Test-Path $nmSrc){
  $dest = Join-Path $repoRoot 'node_modules'
  Write-Host "Restoring node_modules to $dest"
  Copy-Item -Path $nmSrc\* -Destination $dest -Recurse -Force
} else { Write-Host "No node_modules folder in archive (skipped)." }

Write-Host "Cleanup: removing temp folder $tmp"
Remove-Item -Path $tmp -Recurse -Force
Write-Host "Restore complete. You should now be able to run Gradle offline builds (e.g., .\\gradlew assembleRelease --offline) from the project's android folder."

function Ensure-Path([string]$p){ if(-not (Test-Path $p)){ New-Item -ItemType Directory -Path $p | Out-Null } }

Exit 0
