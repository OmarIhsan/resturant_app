<#
Script: package-offline-caches.ps1
Run this on an ONLINE machine where you can perform a successful Gradle build for this project.
It collects the Gradle caches, wrapper distributions, Android SDK pieces (selected), the project `android/` directory, and optionally `node_modules` into a zip archive you can copy to an offline machine.

Usage (run from repository root):
  powershell -ExecutionPolicy Bypass -File .\scripts\package-offline-caches.ps1 -OutputDir C:\tmp\expo-offline

Notes:
- The resulting archive(s) may be large (hundreds of MBs to several GBs) depending on `node_modules` and SDK components.
- You can customize which SDK platforms/build-tools to include by editing the arrays below.
#>
param(
  [string]$OutputDir = "C:\tmp\expo-offline",
  [switch]$IncludeNodeModules = $false,
  [string[]]$SdkPlatforms = @("platforms;android-33"),
  [string[]]$SdkBuildTools = @("build-tools;33.0.2")
)

function Ensure-Dir([string]$p){ if(-not (Test-Path $p)){ New-Item -ItemType Directory -Path $p | Out-Null } }

$repoRoot = Resolve-Path ..\ | Select-Object -ExpandProperty Path
$repoRoot = (Get-Location).Path
Write-Host "Repo root: $repoRoot"

Ensure-Dir $OutputDir

$gradleCache = Join-Path $env:USERPROFILE ".gradle\caches"
$gradleDists = Join-Path $env:USERPROFILE ".gradle\wrapper\dists"
$androidSdk = $env:ANDROID_SDK_ROOT

if(-not $androidSdk){ Write-Warning "ANDROID_SDK_ROOT is not set. You may still package Gradle caches and project files." }

# Ensure we've populated caches by running a build previously
Write-Host "Checking for Gradle caches..."
if(-not (Test-Path $gradleCache)) { Write-Warning "Gradle cache path not found: $gradleCache" }
if(-not (Test-Path $gradleDists)) { Write-Warning "Gradle wrapper dists not found: $gradleDists" }

# Copy selected items to a staging folder to create compressed archives
$staging = Join-Path $OutputDir "staging"
if(Test-Path $staging){ Remove-Item $staging -Recurse -Force }
New-Item -ItemType Directory -Path $staging | Out-Null

# Copy gradle caches and dists
if(Test-Path $gradleCache){ Write-Host "Copying Gradle caches..."; Copy-Item -Path $gradleCache -Destination $staging -Recurse -Force }
if(Test-Path $gradleDists){ Write-Host "Copying Gradle wrapper dists..."; Copy-Item -Path $gradleDists -Destination $staging -Recurse -Force }

# Copy Android SDK pieces (selected)
if($androidSdk){
  $sdkStaging = Join-Path $staging "android-sdk"
  New-Item -ItemType Directory -Path $sdkStaging | Out-Null
  foreach($p in $SdkPlatforms){
    $src = Join-Path $androidSdk $p
    if(Test-Path $src){ Write-Host "Including SDK platform: $p"; Copy-Item -Path $src -Destination $sdkStaging -Recurse -Force }
    else { Write-Warning "SDK platform not found: $src" }
  }
  foreach($b in $SdkBuildTools){
    $src = Join-Path $androidSdk $b
    if(Test-Path $src){ Write-Host "Including build-tools: $b"; Copy-Item -Path $src -Destination $sdkStaging -Recurse -Force }
    else { Write-Warning "Build-tools not found: $src" }
  }
}

# Copy project android/ directory (includes gradlew)
$androidProject = Join-Path $repoRoot 'android'
if(Test-Path $androidProject){ Write-Host "Copying android/ project"; Copy-Item -Path $androidProject -Destination $staging -Recurse -Force }
else { Write-Warning "android/ directory not found in project root." }

# Optionally include node_modules (very large)
if($IncludeNodeModules){
  $nm = Join-Path $repoRoot 'node_modules'
  if(Test-Path $nm){ Write-Host "Including node_modules (this may be large)..."; Copy-Item -Path $nm -Destination $staging -Recurse -Force }
  else { Write-Warning "node_modules not found; run 'npm ci' or 'yarn install' first." }
}

# Create archives
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$archive = Join-Path $OutputDir "expo-offline-$timestamp.zip"
Write-Host "Creating archive: $archive"
Compress-Archive -Path (Join-Path $staging '*') -DestinationPath $archive -Force

Write-Host "Package complete. Copy the archive to your offline machine and run the restore script there."
Write-Host "Output: $archive"

# Clean staging (optional)
Remove-Item $staging -Recurse -Force

Exit 0
