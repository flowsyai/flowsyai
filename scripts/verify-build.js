#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Verifying build output for FlowsyAI...');

const distDir = path.join(__dirname, '..', 'dist');

if (!fs.existsSync(distDir)) {
  console.error('❌ Build directory not found!');
  process.exit(1);
}

// Check for index.html
const indexPath = path.join(distDir, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error('❌ index.html not found in build!');
  process.exit(1);
}

// Read index.html and check for CSS links
const indexContent = fs.readFileSync(indexPath, 'utf8');

// Check for CSS files
const cssRegex = /<link[^>]*rel="stylesheet"[^>]*>/g;
const cssMatches = indexContent.match(cssRegex);

if (!cssMatches || cssMatches.length === 0) {
  console.error('❌ No CSS stylesheets found in index.html!');
  console.log('Index.html content preview:');
  console.log(indexContent.substring(0, 1000));
  process.exit(1);
}

console.log(`✅ Found ${cssMatches.length} CSS stylesheet(s) in index.html`);

// Check for assets directory
const assetsDir = path.join(distDir, 'assets');
if (!fs.existsSync(assetsDir)) {
  console.error('❌ Assets directory not found!');
  process.exit(1);
}

// Check for CSS files in assets
const assetFiles = fs.readdirSync(assetsDir);
const cssFiles = assetFiles.filter(file => file.endsWith('.css'));

if (cssFiles.length === 0) {
  console.error('❌ No CSS files found in assets directory!');
  console.log('Assets directory contents:', assetFiles);
  process.exit(1);
}

console.log(`✅ Found ${cssFiles.length} CSS file(s) in assets directory:`);
cssFiles.forEach(file => {
  const filePath = path.join(assetsDir, file);
  const stats = fs.statSync(filePath);
  console.log(`   - ${file} (${Math.round(stats.size / 1024)}KB)`);

  // Check if CSS file contains our critical styles
  const cssContent = fs.readFileSync(filePath, 'utf8');

  const criticalChecks = [
    { name: 'Tailwind base styles', pattern: /--tw-/ },
    { name: 'Custom animations', pattern: /@keyframes/ },
    { name: 'Color variables', pattern: /--primary|--background|--foreground/ },
    { name: 'Floating dots', pattern: /hero-floating-dot/ },
    { name: 'Luxury animations', pattern: /luxury-glow|luxury-shimmer/ },
  ];

  criticalChecks.forEach(check => {
    if (check.pattern.test(cssContent)) {
      console.log(`   ✅ ${check.name} found`);
    } else {
      console.log(`   ⚠️  ${check.name} not found`);
    }
  });
});

// Check for JS files
const jsFiles = assetFiles.filter(file => file.endsWith('.js'));
console.log(`✅ Found ${jsFiles.length} JavaScript file(s) in assets directory`);

// Check for video files
const videoFiles = assetFiles.filter(file => file.endsWith('.mp4') || file.endsWith('.webm'));
if (videoFiles.length > 0) {
  console.log(`✅ Found ${videoFiles.length} video file(s) in assets directory`);
}

// Check for critical dependencies in JS files
const mainJsFile = jsFiles.find(file => file.includes('index') || file.includes('main'));
if (mainJsFile) {
  const jsPath = path.join(assetsDir, mainJsFile);
  const jsContent = fs.readFileSync(jsPath, 'utf8');

  const dependencyChecks = [
    { name: 'Framer Motion', pattern: /framer-motion|motion/ },
    { name: 'React', pattern: /react/ },
    { name: 'Tailwind', pattern: /tailwind/ },
  ];

  console.log(`\n🔍 Checking main JS file (${mainJsFile}):`);
  dependencyChecks.forEach(check => {
    if (check.pattern.test(jsContent)) {
      console.log(`   ✅ ${check.name} found`);
    } else {
      console.log(`   ⚠️  ${check.name} not found`);
    }
  });
}

console.log('\n🎉 Build verification completed successfully!');
console.log('\n📋 Build Summary:');
console.log(`   - CSS files: ${cssFiles.length}`);
console.log(`   - JS files: ${jsFiles.length}`);
console.log(`   - Video files: ${videoFiles.length}`);
console.log(`   - Total assets: ${assetFiles.length}`);

const totalSize = assetFiles.reduce((total, file) => {
  const filePath = path.join(assetsDir, file);
  const stats = fs.statSync(filePath);
  return total + stats.size;
}, 0);

console.log(`   - Total size: ${Math.round((totalSize / 1024 / 1024) * 100) / 100}MB`);
