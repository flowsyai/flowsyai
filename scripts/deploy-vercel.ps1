# PowerShell script pentru deployment FlowsyAI pe Vercel
# Autor: FlowsyAI Team
# Data: 2025

Write-Host "🚀 Starting FlowsyAI Vercel Deployment..." -ForegroundColor Green

# Verifică dacă suntem în directorul corect
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found. Please run from project root." -ForegroundColor Red
    exit 1
}

# Verifică dacă Vercel CLI este instalat
try {
    $vercelVersion = vercel --version
    Write-Host "✅ Vercel CLI found: $vercelVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Vercel CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g vercel
}

# Curăță cache-ul și node_modules
Write-Host "🧹 Cleaning cache and dependencies..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force "node_modules"
}
if (Test-Path "dist") {
    Remove-Item -Recurse -Force "dist"
}
if (Test-Path ".vite") {
    Remove-Item -Recurse -Force ".vite"
}

# Reinstalează dependențele
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

# Rulează testele
Write-Host "🧪 Running tests..." -ForegroundColor Yellow
npm run test:run
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Tests failed. Aborting deployment." -ForegroundColor Red
    exit 1
}

# Verifică linting
Write-Host "🔍 Checking code quality..." -ForegroundColor Yellow
npm run lint
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️ Linting issues found. Continuing anyway..." -ForegroundColor Yellow
}

# Build aplicația
Write-Host "🏗️ Building application..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed. Aborting deployment." -ForegroundColor Red
    exit 1
}

# Verifică mărimea bundle-urilor
Write-Host "📊 Checking bundle sizes..." -ForegroundColor Yellow
$distSize = (Get-ChildItem -Path "dist" -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
Write-Host "📦 Total dist size: $([math]::Round($distSize, 2)) MB" -ForegroundColor Cyan

# Deploy pe Vercel
Write-Host "🚀 Deploying to Vercel..." -ForegroundColor Green
vercel --prod --yes

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Deployment successful!" -ForegroundColor Green
    Write-Host "🌐 Your app should be live at your Vercel domain" -ForegroundColor Cyan
    
    # Deschide browser-ul cu site-ul
    $response = Read-Host "Open browser to view deployment? (y/n)"
    if ($response -eq "y" -or $response -eq "Y") {
        vercel --prod | Select-String -Pattern "https://" | ForEach-Object {
            Start-Process $_.Matches[0].Value
        }
    }
} else {
    Write-Host "❌ Deployment failed. Check Vercel logs for details." -ForegroundColor Red
    Write-Host "💡 Try running 'vercel logs' for more information" -ForegroundColor Yellow
    exit 1
}

Write-Host "🎉 Deployment process completed!" -ForegroundColor Green
