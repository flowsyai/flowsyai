import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { toast } from '@/hooks/use-toast';

// Add error handling for debugging
console.log('🚀 FlowsyAI main.tsx starting...');

try {
  // Mount React app immediately
  console.log('🔄 Mounting React app...');
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Root element not found');
  }

  const root = createRoot(rootElement);
  root.render(<App />);
  console.log('✅ React app mounted successfully');

  // Initialize additional services after app is mounted
  setTimeout(() => {
    // Initialize Sentry for production error tracking
    import('./lib/sentry').then(({ initializeSentry }) => {
      initializeSentry();
      console.log('✅ Sentry initialized');
    }).catch(error => {
      console.warn('⚠️ Sentry initialization failed:', error);
    });

    // Initialize Service Worker for caching and offline support
    import('./lib/serviceWorker').then(({ registerSW }) => {
      registerSW({
        onSuccess: () => {
          console.log('App is ready for offline use');
        },
        onUpdate: () => {
          toast({
            title: 'App Update Available',
            description: 'A new version is available. Refresh to update.',
            duration: 10000,
          });
        },
        onOfflineReady: () => {
          toast({
            title: 'Ready for Offline',
            description: 'App is cached and ready to work offline.',
            duration: 5000,
          });
        },
      });
      console.log('✅ Service Worker registered');
    }).catch(error => {
      console.warn('⚠️ Service Worker registration failed:', error);
    });
  }, 1000);

} catch (error) {
  console.error('❌ Critical error in main.tsx:', error);

  // Fallback: show error message in the root div
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; font-family: Arial, sans-serif;">
        <h1 style="color: red;">FlowsyAI Loading Error</h1>
        <p>There was an error loading the application:</p>
        <pre style="background: #f5f5f5; padding: 10px; border-radius: 4px;">${error.message}</pre>
        <p>Please check the browser console for more details.</p>
      </div>
    `;
  }
}
