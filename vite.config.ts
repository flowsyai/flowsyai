import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '::',
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      external: [],
      output: {
        // Manual chunking strategy to optimize bundle size
        manualChunks: id => {
          // Vendor libraries
          if (id.includes('node_modules')) {
            // React ecosystem (including all React-dependent libraries to prevent dependency issues)
            if (
              id.includes('react') ||
              id.includes('react-dom') ||
              id.includes('react-router') ||
              id.includes('framer-motion') ||
              id.includes('@radix-ui') ||
              id.includes('react-hook-form') ||
              id.includes('react-intersection-observer') ||
              id.includes('react-resizable-panels') ||
              id.includes('react-day-picker') ||
              id.includes('react-use-measure') ||
              id.includes('react-transition-group')
            ) {
              return 'react-vendor';
            }

            // 3D and visualization libraries (largest chunks)
            if (
              id.includes('three') ||
              id.includes('@react-three') ||
              id.includes('three-stdlib')
            ) {
              return 'three-vendor';
            }

            // Chart libraries
            if (id.includes('recharts') || id.includes('d3-')) {
              return 'charts-vendor';
            }

            // Utility libraries
            if (id.includes('lodash') || id.includes('date-fns') || id.includes('classcat')) {
              return 'utils-vendor';
            }

            // Supabase and auth
            if (id.includes('supabase') || id.includes('@supabase')) {
              return 'supabase-vendor';
            }

            // Lucide icons
            if (id.includes('lucide-react')) {
              return 'icons-vendor';
            }

            // Other large vendor libraries
            if (id.includes('tsparticles') || id.includes('@tsparticles')) {
              return 'particles-vendor';
            }

            // Remaining vendor code
            return 'vendor';
          }

          // Application code chunking
          if (id.includes('/landing/') || id.includes('Index.tsx')) {
            return 'landing';
          }
          if (id.includes('Workflow') || id.includes('workflow')) {
            return 'workflow';
          }
          if (id.includes('Agent') || id.includes('agent') || id.includes('AI')) {
            return 'ai-features';
          }
          if (id.includes('Dashboard') || id.includes('Analytics') || id.includes('dashboard')) {
            return 'dashboard';
          }
          if (
            id.includes('Crystal') ||
            id.includes('3D') ||
            id.includes('Canvas') ||
            id.includes('AR')
          ) {
            return 'visualization';
          }
          if (
            id.includes('Auth') ||
            id.includes('auth') ||
            id.includes('Login') ||
            id.includes('Profile')
          ) {
            return 'auth';
          }
          if (
            id.includes('crypto') ||
            id.includes('Token') ||
            id.includes('Solana') ||
            id.includes('Wallet')
          ) {
            return 'crypto';
          }
          if (id.includes('Settings') || id.includes('Config') || id.includes('Billing')) {
            return 'settings';
          }
          if (id.includes('Documentation') || id.includes('Help') || id.includes('Tutorial')) {
            return 'docs';
          }
          if (id.includes('Community') || id.includes('Social') || id.includes('Collaboration')) {
            return 'community';
          }
        }
      }
    },
    chunkSizeWarningLimit: 500
  }
});
