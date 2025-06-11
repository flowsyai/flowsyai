#!/usr/bin/env node

/**
 * Quick CSS verification for Vercel deployment
 */

import fetch from 'node-fetch';

const PRODUCTION_URL = 'https://aiflow-robialexz-robialexzs-projects.vercel.app';

async function quickCSSCheck() {
  console.log('🔍 Quick CSS Check for FlowsyAI on Vercel...\n');

  try {
    // Get the main HTML page
    console.log('📄 Fetching HTML page...');
    const htmlResponse = await fetch(PRODUCTION_URL);
    const htmlContent = await htmlResponse.text();

    console.log(`✅ HTML Status: ${htmlResponse.status} ${htmlResponse.statusText}`);
    console.log(`📏 HTML Size: ${(htmlContent.length / 1024).toFixed(2)} KB`);

    // Check for CSS references
    const cssMatches = htmlContent.match(/href="([^"]*\.css[^"]*)"/g);

    if (!cssMatches) {
      console.log('❌ No CSS files found in HTML');
      return;
    }

    console.log(`\n🎨 Found ${cssMatches.length} CSS reference(s):`);

    for (const match of cssMatches) {
      const cssPath = match.match(/href="([^"]*)"/)[1];
      const fullCSSUrl = cssPath.startsWith('http') ? cssPath : `${PRODUCTION_URL}${cssPath}`;

      console.log(`\n🔍 Testing: ${cssPath}`);

      try {
        const cssResponse = await fetch(fullCSSUrl);
        const cssContent = await cssResponse.text();

        console.log(`   Status: ${cssResponse.status} ${cssResponse.statusText}`);
        console.log(`   Size: ${(cssContent.length / 1024).toFixed(2)} KB`);
        console.log(`   Content-Type: ${cssResponse.headers.get('content-type')}`);

        // Quick content checks
        const hasAnimations = /luxury-glow|animate-luxury|@keyframes/.test(cssContent);
        const hasTailwind = /@tailwind|\.bg-primary|\.text-primary/.test(cssContent);
        const hasCustomStyles = /hero-floating-dot|pulsating-gradient/.test(cssContent);

        console.log(`   ✅ Animations: ${hasAnimations ? 'Found' : 'Missing'}`);
        console.log(`   ✅ Tailwind: ${hasTailwind ? 'Found' : 'Missing'}`);
        console.log(`   ✅ Custom Styles: ${hasCustomStyles ? 'Found' : 'Missing'}`);

        if (cssResponse.ok && hasAnimations && hasTailwind && hasCustomStyles) {
          console.log(`   🎉 CSS is HEALTHY!`);
        } else {
          console.log(`   ⚠️  CSS may have issues`);
        }
      } catch (error) {
        console.log(`   ❌ Error: ${error.message}`);
      }
    }

    // Check for FlowsyAI branding in HTML
    const hasFlowsyAI = /FlowsyAI/i.test(htmlContent);
    const hasLoading = /Loading/i.test(htmlContent);

    console.log(`\n📱 HTML Content Check:`);
    console.log(`   ✅ FlowsyAI Branding: ${hasFlowsyAI ? 'Found' : 'Missing'}`);
    console.log(`   ✅ Loading State: ${hasLoading ? 'Found' : 'Missing'}`);

    console.log(
      `\n🎯 OVERALL STATUS: ${cssMatches.length > 0 ? '✅ CSS LOADING' : '❌ CSS MISSING'}`
    );
  } catch (error) {
    console.error('❌ Quick CSS check failed:', error.message);
  }
}

quickCSSCheck().catch(console.error);
