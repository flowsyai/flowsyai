# PowerShell script pentru debugging Vercel deployment
# Autor: FlowsyAI Team

Write-Host "🔍 FlowsyAI Vercel Debugging Tool" -ForegroundColor Cyan

# Verifică configurația Vercel
Write-Host "`n📋 Checking Vercel configuration..." -ForegroundColor Yellow
if (Test-Path "vercel.json") {
    Write-Host "✅ vercel.json found" -ForegroundColor Green
    $vercelConfig = Get-Content "vercel.json" | ConvertFrom-Json
    Write-Host "   Framework: $($vercelConfig.framework)" -ForegroundColor Cyan
    Write-Host "   Output Directory: $($vercelConfig.outputDirectory)" -ForegroundColor Cyan
} else {
    Write-Host "❌ vercel.json not found" -ForegroundColor Red
}

# Verifică build output
Write-Host "`n🏗️ Checking build output..." -ForegroundColor Yellow
if (Test-Path "dist") {
    $distFiles = Get-ChildItem -Path "dist" -Recurse
    $jsFiles = $distFiles | Where-Object { $_.Extension -eq ".js" }
    $cssFiles = $distFiles | Where-Object { $_.Extension -eq ".css" }
    
    Write-Host "✅ dist directory found" -ForegroundColor Green
    Write-Host "   Total files: $($distFiles.Count)" -ForegroundColor Cyan
    Write-Host "   JS files: $($jsFiles.Count)" -ForegroundColor Cyan
    Write-Host "   CSS files: $($cssFiles.Count)" -ForegroundColor Cyan
    
    # Verifică index.html
    if (Test-Path "dist/index.html") {
        $indexContent = Get-Content "dist/index.html" -Raw
        $jsReferences = [regex]::Matches($indexContent, 'src="([^"]*\.js)"')
        Write-Host "   JS references in index.html: $($jsReferences.Count)" -ForegroundColor Cyan
        
        foreach ($match in $jsReferences) {
            $jsPath = $match.Groups[1].Value
            $fullPath = "dist$jsPath"
            if (Test-Path $fullPath) {
                Write-Host "   ✅ $jsPath exists" -ForegroundColor Green
            } else {
                Write-Host "   ❌ $jsPath missing" -ForegroundColor Red
            }
        }
    }
} else {
    Write-Host "❌ dist directory not found. Run 'npm run build' first." -ForegroundColor Red
}

# Verifică package.json scripts
Write-Host "`n📦 Checking package.json scripts..." -ForegroundColor Yellow
if (Test-Path "package.json") {
    $packageJson = Get-Content "package.json" | ConvertFrom-Json
    $scripts = $packageJson.scripts
    
    $requiredScripts = @("build", "preview", "dev")
    foreach ($script in $requiredScripts) {
        if ($scripts.$script) {
            Write-Host "   ✅ $script script: $($scripts.$script)" -ForegroundColor Green
        } else {
            Write-Host "   ❌ $script script missing" -ForegroundColor Red
        }
    }
}

# Verifică dependențele critice
Write-Host "`n🔗 Checking critical dependencies..." -ForegroundColor Yellow
$criticalDeps = @("react", "react-dom", "vite", "@vitejs/plugin-react-swc")
$packageJson = Get-Content "package.json" | ConvertFrom-Json

foreach ($dep in $criticalDeps) {
    if ($packageJson.dependencies.$dep -or $packageJson.devDependencies.$dep) {
        $version = $packageJson.dependencies.$dep ?? $packageJson.devDependencies.$dep
        Write-Host "   ✅ $dep: $version" -ForegroundColor Green
    } else {
        Write-Host "   ❌ $dep missing" -ForegroundColor Red
    }
}

# Verifică Vite config
Write-Host "`n⚙️ Checking Vite configuration..." -ForegroundColor Yellow
if (Test-Path "vite.config.ts") {
    Write-Host "✅ vite.config.ts found" -ForegroundColor Green
    $viteConfig = Get-Content "vite.config.ts" -Raw
    
    if ($viteConfig -match 'base:\s*[''"]([^''"]*)[''"]') {
        Write-Host "   Base path: $($matches[1])" -ForegroundColor Cyan
    }
    
    if ($viteConfig -match 'outDir:\s*[''"]([^''"]*)[''"]') {
        Write-Host "   Output directory: $($matches[1])" -ForegroundColor Cyan
    }
} else {
    Write-Host "❌ vite.config.ts not found" -ForegroundColor Red
}

# Sugestii pentru debugging
Write-Host "`n💡 Debugging suggestions:" -ForegroundColor Yellow
Write-Host "   1. Check Vercel deployment logs: vercel logs" -ForegroundColor Cyan
Write-Host "   2. Test local build: npm run build && npm run preview" -ForegroundColor Cyan
Write-Host "   3. Check browser console for MIME type errors" -ForegroundColor Cyan
Write-Host "   4. Verify asset paths in Network tab" -ForegroundColor Cyan
Write-Host "   5. Test direct asset URLs: https://your-domain/assets/file.js" -ForegroundColor Cyan

Write-Host "`n🔧 Quick fixes to try:" -ForegroundColor Yellow
Write-Host "   1. Clear Vercel cache: vercel --prod --force" -ForegroundColor Cyan
Write-Host "   2. Redeploy: vercel --prod" -ForegroundColor Cyan
Write-Host "   3. Check vercel.json routes configuration" -ForegroundColor Cyan

Write-Host "`n✅ Debugging check completed!" -ForegroundColor Green
