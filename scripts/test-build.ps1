# PowerShell script pentru testarea build-ului local
# Autor: FlowsyAI Team

Write-Host "🔍 Testing FlowsyAI Build Process..." -ForegroundColor Cyan

# Verifică dacă suntem în directorul corect
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found. Please run from project root." -ForegroundColor Red
    exit 1
}

# Curăță build-ul anterior
Write-Host "🧹 Cleaning previous build..." -ForegroundColor Yellow
if (Test-Path "dist") {
    Remove-Item -Recurse -Force "dist"
    Write-Host "   ✅ Removed dist directory" -ForegroundColor Green
}

# Verifică fișierele critice
Write-Host "`n📋 Checking critical files..." -ForegroundColor Yellow

$criticalFiles = @("index.html", "src/main.tsx", "vite.config.ts", "vercel.json")
foreach ($file in $criticalFiles) {
    if (Test-Path $file) {
        Write-Host "   ✅ $file exists" -ForegroundColor Green
    } else {
        Write-Host "   ❌ $file missing" -ForegroundColor Red
    }
}

# Verifică conținutul index.html
Write-Host "`n🔍 Checking index.html content..." -ForegroundColor Yellow
$indexContent = Get-Content "index.html" -Raw
if ($indexContent -match 'src="/src/main\.tsx"') {
    Write-Host "   ✅ Found main.tsx reference in index.html" -ForegroundColor Green
} else {
    Write-Host "   ❌ main.tsx reference not found in index.html" -ForegroundColor Red
}

# Testează build-ul
Write-Host "`n🏗️ Testing build process..." -ForegroundColor Yellow
$buildResult = npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✅ Build successful!" -ForegroundColor Green
    
    # Verifică output-ul
    if (Test-Path "dist/index.html") {
        Write-Host "   ✅ dist/index.html generated" -ForegroundColor Green
        
        # Verifică conținutul dist/index.html
        $distIndexContent = Get-Content "dist/index.html" -Raw
        if ($distIndexContent -match 'src="/assets/.*\.js"') {
            Write-Host "   ✅ Assets correctly referenced in dist/index.html" -ForegroundColor Green
        } else {
            Write-Host "   ⚠️ Assets references might be incorrect" -ForegroundColor Yellow
        }
        
        # Contorizează fișierele generate
        $jsFiles = Get-ChildItem -Path "dist/assets" -Filter "*.js" | Measure-Object
        $cssFiles = Get-ChildItem -Path "dist/assets" -Filter "*.css" | Measure-Object
        
        Write-Host "   📊 Generated files:" -ForegroundColor Cyan
        Write-Host "      - JavaScript: $($jsFiles.Count) files" -ForegroundColor Cyan
        Write-Host "      - CSS: $($cssFiles.Count) files" -ForegroundColor Cyan
        
    } else {
        Write-Host "   ❌ dist/index.html not generated" -ForegroundColor Red
    }
} else {
    Write-Host "   ❌ Build failed!" -ForegroundColor Red
    Write-Host "   Check the error messages above for details." -ForegroundColor Yellow
}

# Verifică configurația Vercel
Write-Host "`n⚙️ Checking Vercel configuration..." -ForegroundColor Yellow
if (Test-Path "vercel.json") {
    $vercelConfig = Get-Content "vercel.json" | ConvertFrom-Json
    Write-Host "   ✅ vercel.json found" -ForegroundColor Green
    Write-Host "   📋 Build command: $($vercelConfig.buildCommand)" -ForegroundColor Cyan
    Write-Host "   📋 Output directory: $($vercelConfig.outputDirectory)" -ForegroundColor Cyan
} else {
    Write-Host "   ❌ vercel.json not found" -ForegroundColor Red
}

Write-Host "`n🎯 Build test completed!" -ForegroundColor Green
Write-Host "If build was successful, you can proceed with Vercel deployment." -ForegroundColor Cyan
