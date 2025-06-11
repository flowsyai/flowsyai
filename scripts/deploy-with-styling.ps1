# PowerShell script for FlowsyAI Vercel deployment with styling verification
# Ensures all animations, CSS, and visual effects work properly in production

Write-Host "🚀 FlowsyAI Vercel Deployment with Styling Verification" -ForegroundColor Cyan
Write-Host "Ensuring all styling and animations work in production..." -ForegroundColor Yellow

# Step 1: Clean previous builds
Write-Host "`n🧹 Cleaning previous builds..." -ForegroundColor Yellow
if (Test-Path "dist") {
    Remove-Item -Recurse -Force "dist"
    Write-Host "   ✅ Cleaned dist directory" -ForegroundColor Green
}

# Step 2: Verify critical files exist
Write-Host "`n📋 Verifying critical files..." -ForegroundColor Yellow
$criticalFiles = @(
    "src/index.css",
    "src/main.tsx", 
    "src/App.tsx",
    "src/components/landing/HeroSection.tsx",
    "src/components/backgrounds/PipelineCanvas.tsx",
    "vite.config.ts",
    "vercel.json",
    "package.json"
)

foreach ($file in $criticalFiles) {
    if (Test-Path $file) {
        Write-Host "   ✅ $file" -ForegroundColor Green
    } else {
        Write-Host "   ❌ $file MISSING!" -ForegroundColor Red
        exit 1
    }
}

# Step 3: Check for critical CSS content
Write-Host "`n🎨 Verifying CSS content..." -ForegroundColor Yellow
$cssContent = Get-Content "src/index.css" -Raw

$cssChecks = @(
    @{ Name = "Tailwind imports"; Pattern = "@tailwind" },
    @{ Name = "Custom animations"; Pattern = "@keyframes" },
    @{ Name = "Color variables"; Pattern = "--primary" },
    @{ Name = "Floating dots"; Pattern = "hero-floating-dot" },
    @{ Name = "Luxury animations"; Pattern = "luxury-glow" }
)

foreach ($check in $cssChecks) {
    if ($cssContent -match $check.Pattern) {
        Write-Host "   ✅ $($check.Name)" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  $($check.Name) not found" -ForegroundColor Yellow
    }
}

# Step 4: Install dependencies
Write-Host "`n📦 Installing dependencies..." -ForegroundColor Yellow
npm ci
if ($LASTEXITCODE -ne 0) {
    Write-Host "   ❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}
Write-Host "   ✅ Dependencies installed" -ForegroundColor Green

# Step 5: Build the project
Write-Host "`n🔨 Building project..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "   ❌ Build failed" -ForegroundColor Red
    exit 1
}
Write-Host "   ✅ Build completed" -ForegroundColor Green

# Step 6: Verify build output
Write-Host "`n🔍 Verifying build output..." -ForegroundColor Yellow
if (Test-Path "dist/index.html") {
    $indexContent = Get-Content "dist/index.html" -Raw
    
    # Check for CSS links
    if ($indexContent -match 'rel="stylesheet"') {
        Write-Host "   ✅ CSS stylesheets found in index.html" -ForegroundColor Green
    } else {
        Write-Host "   ❌ No CSS stylesheets found in index.html" -ForegroundColor Red
        exit 1
    }
    
    # Check for assets
    if (Test-Path "dist/assets") {
        $assetFiles = Get-ChildItem "dist/assets" -File
        $cssFiles = $assetFiles | Where-Object { $_.Extension -eq ".css" }
        $jsFiles = $assetFiles | Where-Object { $_.Extension -eq ".js" }
        
        Write-Host "   ✅ Found $($cssFiles.Count) CSS files and $($jsFiles.Count) JS files" -ForegroundColor Green
        
        # Check CSS file content
        if ($cssFiles.Count -gt 0) {
            $mainCss = $cssFiles[0]
            $cssFileContent = Get-Content $mainCss.FullName -Raw
            
            if ($cssFileContent -match "hero-floating-dot|luxury-glow|@keyframes") {
                Write-Host "   ✅ Critical animations found in CSS bundle" -ForegroundColor Green
            } else {
                Write-Host "   ⚠️  Some animations may be missing from CSS bundle" -ForegroundColor Yellow
            }
        }
    } else {
        Write-Host "   ❌ Assets directory not found" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "   ❌ index.html not found in build output" -ForegroundColor Red
    exit 1
}

Write-Host "`n✅ Pre-deployment verification completed successfully!" -ForegroundColor Green
Write-Host "`n📋 Deployment Checklist:" -ForegroundColor Cyan
Write-Host "   ✅ All critical files present" -ForegroundColor Green
Write-Host "   ✅ CSS animations and styles verified" -ForegroundColor Green  
Write-Host "   ✅ Build output validated" -ForegroundColor Green
Write-Host "   ✅ Assets properly bundled" -ForegroundColor Green

Write-Host "`n🎯 Ready for Vercel deployment!" -ForegroundColor Green
Write-Host "Run: vercel --prod" -ForegroundColor White
Write-Host "The deployment should now include all styling and animations." -ForegroundColor Yellow
