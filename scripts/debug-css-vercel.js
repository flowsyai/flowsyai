#!/usr/bin/env node

/**
 * Comprehensive CSS Debugging Tool for Vercel Deployment
 * Diagnoses and fixes CSS loading issues in production
 */

import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const PRODUCTION_URL = 'https://aiflow-robialexz-robialexzs-projects.vercel.app';
const LOCAL_DIST_PATH = path.join(__dirname, '../dist');

class CSSDebugger {
  constructor() {
    this.results = {
      cssAccessibility: {},
      cssContent: {},
      htmlAnalysis: {},
      comparison: {},
      recommendations: [],
    };
  }

  async runFullDiagnostic() {
    console.log('🔍 Starting comprehensive CSS debugging for FlowsyAI on Vercel...\n');

    try {
      // Step 1: Verify CSS Loading Status
      await this.verifyCSSLoading();

      // Step 2: Analyze CSS Content
      await this.analyzeCSSContent();

      // Step 3: Compare Local vs Production
      await this.compareLocalVsProduction();

      // Step 4: Diagnose Root Cause
      await this.diagnoseRootCause();

      // Step 5: Provide Fix Recommendations
      this.generateRecommendations();

      // Generate comprehensive report
      this.generateReport();
    } catch (error) {
      console.error('❌ CSS Debugging failed:', error);
    }
  }

  async verifyCSSLoading() {
    console.log('📋 Step 1: Verifying CSS Loading Status...');

    try {
      // Get the main HTML page to extract CSS references
      const htmlResponse = await fetch(PRODUCTION_URL);
      const htmlContent = await htmlResponse.text();

      // Extract CSS file references
      const cssMatches = htmlContent.match(/href="([^"]*\.css[^"]*)"/g);

      if (!cssMatches) {
        console.log('❌ No CSS files found in HTML');
        this.results.cssAccessibility.found = false;
        return;
      }

      console.log(`✅ Found ${cssMatches.length} CSS reference(s) in HTML`);

      for (const match of cssMatches) {
        const cssPath = match.match(/href="([^"]*)"/)[1];
        const fullCSSUrl = cssPath.startsWith('http') ? cssPath : `${PRODUCTION_URL}${cssPath}`;

        console.log(`🔍 Testing CSS file: ${fullCSSUrl}`);

        try {
          const cssResponse = await fetch(fullCSSUrl);
          const cssContent = await cssResponse.text();

          this.results.cssAccessibility[cssPath] = {
            url: fullCSSUrl,
            status: cssResponse.status,
            statusText: cssResponse.statusText,
            contentType: cssResponse.headers.get('content-type'),
            contentLength: cssContent.length,
            accessible: cssResponse.ok,
            content: cssContent.substring(0, 1000), // First 1000 chars for analysis
          };

          if (cssResponse.ok) {
            console.log(`✅ CSS accessible: ${cssResponse.status} ${cssResponse.statusText}`);
            console.log(`📏 Content-Type: ${cssResponse.headers.get('content-type')}`);
            console.log(`📦 Size: ${(cssContent.length / 1024).toFixed(2)} KB`);
          } else {
            console.log(`❌ CSS not accessible: ${cssResponse.status} ${cssResponse.statusText}`);
          }
        } catch (error) {
          console.log(`❌ Error fetching CSS: ${error.message}`);
          this.results.cssAccessibility[cssPath] = {
            url: fullCSSUrl,
            error: error.message,
            accessible: false,
          };
        }
      }
    } catch (error) {
      console.log(`❌ Error verifying CSS loading: ${error.message}`);
    }

    console.log('');
  }

  async analyzeCSSContent() {
    console.log('📋 Step 2: Analyzing CSS Content...');

    // Check local CSS file first
    const localCSSFiles = fs
      .readdirSync(path.join(LOCAL_DIST_PATH, 'assets'))
      .filter(file => file.endsWith('.css'));

    if (localCSSFiles.length === 0) {
      console.log('❌ No CSS files found in local dist/assets');
      return;
    }

    const localCSSFile = localCSSFiles[0];
    const localCSSPath = path.join(LOCAL_DIST_PATH, 'assets', localCSSFile);
    const localCSSContent = fs.readFileSync(localCSSPath, 'utf8');

    console.log(
      `📁 Local CSS file: ${localCSSFile} (${(localCSSContent.length / 1024).toFixed(2)} KB)`
    );

    // Analyze CSS content for key components
    const checks = {
      tailwindBase: /@tailwind base|\.bg-primary|\.text-primary/.test(localCSSContent),
      customAnimations: /luxury-glow|animate-luxury|@keyframes/.test(localCSSContent),
      colorVariables: /--primary:|--gold:|--background:/.test(localCSSContent),
      floatingDots: /hero-floating-dot|floating-dot/.test(localCSSContent),
      luxuryEffects: /luxury-shimmer|luxury-pulse|premium-card/.test(localCSSContent),
      responsiveDesign: /@media|sm:|md:|lg:/.test(localCSSContent),
    };

    this.results.cssContent.local = {
      file: localCSSFile,
      size: localCSSContent.length,
      checks,
    };

    console.log('🔍 CSS Content Analysis:');
    Object.entries(checks).forEach(([check, passed]) => {
      console.log(`  ${passed ? '✅' : '❌'} ${check}: ${passed ? 'Found' : 'Missing'}`);
    });

    // Compare with production CSS if available
    const productionCSS = Object.values(this.results.cssAccessibility).find(
      css => css.accessible && css.content
    );

    if (productionCSS) {
      const prodChecks = {
        tailwindBase: /@tailwind base|\.bg-primary|\.text-primary/.test(productionCSS.content),
        customAnimations: /luxury-glow|animate-luxury|@keyframes/.test(productionCSS.content),
        colorVariables: /--primary:|--gold:|--background:/.test(productionCSS.content),
        floatingDots: /hero-floating-dot|floating-dot/.test(productionCSS.content),
        luxuryEffects: /luxury-shimmer|luxury-pulse|premium-card/.test(productionCSS.content),
      };

      this.results.cssContent.production = {
        size: productionCSS.contentLength,
        checks: prodChecks,
      };

      console.log('\n🌐 Production CSS Analysis:');
      Object.entries(prodChecks).forEach(([check, passed]) => {
        console.log(`  ${passed ? '✅' : '❌'} ${check}: ${passed ? 'Found' : 'Missing'}`);
      });
    }

    console.log('');
  }

  async compareLocalVsProduction() {
    console.log('📋 Step 3: Comparing Local vs Production...');

    // Read local HTML
    const localHTMLPath = path.join(LOCAL_DIST_PATH, 'index.html');
    const localHTML = fs.readFileSync(localHTMLPath, 'utf8');

    // Get production HTML
    const prodResponse = await fetch(PRODUCTION_URL);
    const prodHTML = await prodResponse.text();

    // Compare CSS references
    const localCSSRefs = localHTML.match(/href="([^"]*\.css[^"]*)"/g) || [];
    const prodCSSRefs = prodHTML.match(/href="([^"]*\.css[^"]*)"/g) || [];

    console.log(`📁 Local CSS references: ${localCSSRefs.length}`);
    console.log(`🌐 Production CSS references: ${prodCSSRefs.length}`);

    localCSSRefs.forEach(ref => console.log(`  Local: ${ref}`));
    prodCSSRefs.forEach(ref => console.log(`  Prod:  ${ref}`));

    this.results.comparison = {
      localCSSRefs,
      prodCSSRefs,
      referencesMatch: JSON.stringify(localCSSRefs) === JSON.stringify(prodCSSRefs),
    };

    console.log('');
  }

  async diagnoseRootCause() {
    console.log('📋 Step 4: Diagnosing Root Cause...');

    // Check for common issues
    const issues = [];

    // Check if CSS files are accessible
    const accessibleCSS = Object.values(this.results.cssAccessibility).filter(
      css => css.accessible
    );

    if (accessibleCSS.length === 0) {
      issues.push('CSS files are not accessible from production URL');
    }

    // Check content type
    const wrongContentType = Object.values(this.results.cssAccessibility).find(
      css => css.contentType && !css.contentType.includes('text/css')
    );

    if (wrongContentType) {
      issues.push(`CSS served with wrong content-type: ${wrongContentType.contentType}`);
    }

    // Check if CSS is empty or too small
    const smallCSS = Object.values(this.results.cssAccessibility).find(
      css => css.contentLength < 1000
    );

    if (smallCSS) {
      issues.push('CSS file appears to be empty or too small');
    }

    this.results.issues = issues;

    if (issues.length > 0) {
      console.log('❌ Issues found:');
      issues.forEach(issue => console.log(`  - ${issue}`));
    } else {
      console.log('✅ No obvious issues detected');
    }

    console.log('');
  }

  generateRecommendations() {
    console.log('📋 Step 5: Generating Fix Recommendations...');

    const recommendations = [];

    if (this.results.issues && this.results.issues.length > 0) {
      recommendations.push('IMMEDIATE FIXES NEEDED:');

      if (this.results.issues.some(i => i.includes('not accessible'))) {
        recommendations.push('- Rebuild and redeploy to fix CSS asset paths');
        recommendations.push('- Check Vite build configuration for CSS handling');
      }

      if (this.results.issues.some(i => i.includes('content-type'))) {
        recommendations.push('- Add proper MIME type configuration in vercel.json');
      }

      if (this.results.issues.some(i => i.includes('empty'))) {
        recommendations.push('- Check CSS bundling process in Vite configuration');
        recommendations.push('- Verify Tailwind CSS is properly configured');
      }
    }

    // Always add these recommendations
    recommendations.push('GENERAL IMPROVEMENTS:');
    recommendations.push('- Add CSS preload hints for better performance');
    recommendations.push('- Verify critical CSS is inlined in HTML head');
    recommendations.push('- Test with browser dev tools for CSS loading');

    this.results.recommendations = recommendations;

    recommendations.forEach(rec => console.log(rec));
    console.log('');
  }

  generateReport() {
    console.log('📊 COMPREHENSIVE CSS DEBUGGING REPORT');
    console.log('=====================================\n');

    console.log('🎯 SUMMARY:');
    const accessibleCount = Object.values(this.results.cssAccessibility).filter(
      css => css.accessible
    ).length;
    const totalCount = Object.keys(this.results.cssAccessibility).length;

    console.log(`CSS Files Accessible: ${accessibleCount}/${totalCount}`);
    console.log(`Issues Found: ${this.results.issues?.length || 0}`);
    console.log(`Status: ${this.results.issues?.length > 0 ? '❌ NEEDS FIXING' : '✅ HEALTHY'}\n`);

    // Save detailed report to file
    const reportPath = path.join(__dirname, 'css-debug-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
    console.log(`📄 Detailed report saved to: ${reportPath}`);
  }
}

// Run the CSS debugger
const cssDebugger = new CSSDebugger();
cssDebugger.runFullDiagnostic().catch(console.error);
