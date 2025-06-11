import { z } from 'zod';

// Environment schema validation
const envSchema = z.object({
  // App Configuration
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  VITE_APP_NAME: z.string().default('AI Flow'),
  VITE_APP_VERSION: z.string().default('1.0.0'),
  VITE_APP_URL: z.string().url().default('http://localhost:8080'),

  // Supabase Configuration (with fallback for demo)
  VITE_SUPABASE_URL: z.string().url().default('https://crtferpmhnrdvnaypgzo.supabase.co'),
  VITE_SUPABASE_ANON_KEY: z
    .string()
    .min(1)
    .default(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNydGZlcnBtaG5yZHZuYXlwZ3pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxODc3MzksImV4cCI6MjA2Mzc2MzczOX0.WGBfLo4UYTzHUCuHEa_MVWi0n7f1-U15Xlmw7XZben4'
    ),

  // API Configuration
  VITE_API_BASE_URL: z.string().url().optional(),
  VITE_API_TIMEOUT: z.string().transform(Number).default('30000'),

  // Feature Flags
  VITE_ENABLE_ANALYTICS: z.string().transform(Boolean).default('false'),
  VITE_ENABLE_ERROR_REPORTING: z.string().transform(Boolean).default('false'),
  VITE_ENABLE_PERFORMANCE_MONITORING: z.string().transform(Boolean).default('false'),

  // Logging Configuration
  VITE_LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  VITE_LOG_ENDPOINT: z.string().url().optional(),

  // Security Configuration
  VITE_CSP_NONCE: z.string().optional(),
  VITE_ALLOWED_ORIGINS: z.string().optional(),

  // Third-party Services
  VITE_SENTRY_DSN: z.string().optional(),
  VITE_GOOGLE_ANALYTICS_ID: z.string().optional(),
  VITE_HOTJAR_ID: z.string().optional(),

  // Development Configuration
  VITE_MOCK_API: z.string().transform(Boolean).default('false'),
  VITE_DEBUG_MODE: z.string().transform(Boolean).default('false'),
});

// Parse and validate environment variables
function parseEnv() {
  const env = {
    NODE_ENV: import.meta.env.MODE || 'development',
    VITE_APP_NAME: import.meta.env.VITE_APP_NAME,
    VITE_APP_VERSION: import.meta.env.VITE_APP_VERSION,
    VITE_APP_URL: import.meta.env.VITE_APP_URL,
    VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
    VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
    VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    VITE_API_TIMEOUT: import.meta.env.VITE_API_TIMEOUT,
    VITE_ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS,
    VITE_ENABLE_ERROR_REPORTING: import.meta.env.VITE_ENABLE_ERROR_REPORTING,
    VITE_ENABLE_PERFORMANCE_MONITORING: import.meta.env.VITE_ENABLE_PERFORMANCE_MONITORING,
    VITE_LOG_LEVEL: import.meta.env.VITE_LOG_LEVEL,
    VITE_LOG_ENDPOINT: import.meta.env.VITE_LOG_ENDPOINT,
    VITE_CSP_NONCE: import.meta.env.VITE_CSP_NONCE,
    VITE_ALLOWED_ORIGINS: import.meta.env.VITE_ALLOWED_ORIGINS,
    VITE_SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN,
    VITE_GOOGLE_ANALYTICS_ID: import.meta.env.VITE_GOOGLE_ANALYTICS_ID,
    VITE_HOTJAR_ID: import.meta.env.VITE_HOTJAR_ID,
    VITE_MOCK_API: import.meta.env.VITE_MOCK_API,
    VITE_DEBUG_MODE: import.meta.env.VITE_DEBUG_MODE,
  };

  try {
    return envSchema.parse(env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map(err => err.path.join('.')).join(', ');
      throw new Error(
        `❌ Invalid environment variables: ${missingVars}\n` +
          `Please check your .env file and ensure all required variables are set.\n` +
          `See .env.example for reference.`
      );
    }
    throw error;
  }
}

// Export validated environment variables
export const env = parseEnv();

// Environment utilities
export const isDevelopment = env.NODE_ENV === 'development';
export const isProduction = env.NODE_ENV === 'production';
export const isTest = env.NODE_ENV === 'test';

// Feature flag utilities
export const features = {
  analytics: env.VITE_ENABLE_ANALYTICS,
  errorReporting: env.VITE_ENABLE_ERROR_REPORTING,
  performanceMonitoring: env.VITE_ENABLE_PERFORMANCE_MONITORING,
  mockApi: env.VITE_MOCK_API,
  debugMode: env.VITE_DEBUG_MODE,
} as const;

// Configuration objects
export const apiConfig = {
  baseUrl: env.VITE_API_BASE_URL || env.VITE_SUPABASE_URL,
  timeout: env.VITE_API_TIMEOUT,
} as const;

export const supabaseConfig = {
  url: env.VITE_SUPABASE_URL,
  anonKey: env.VITE_SUPABASE_ANON_KEY,
} as const;

export const logConfig = {
  level: env.VITE_LOG_LEVEL,
  endpoint: env.VITE_LOG_ENDPOINT,
} as const;

export const securityConfig = {
  cspNonce: env.VITE_CSP_NONCE,
  allowedOrigins: env.VITE_ALLOWED_ORIGINS?.split(',') || [],
} as const;

export const analyticsConfig = {
  sentryDsn: env.VITE_SENTRY_DSN,
  googleAnalyticsId: env.VITE_GOOGLE_ANALYTICS_ID,
  hotjarId: env.VITE_HOTJAR_ID,
} as const;

// Runtime environment checks
export function validateEnvironment() {
  // In production, warn about missing variables but don't throw errors
  // This allows the app to work with fallback values
  const requiredInProduction = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'];

  if (isProduction) {
    const missing = requiredInProduction.filter(key => {
      const value = env[key as keyof typeof env];
      return !value || value === 'your_supabase_project_url' || value === 'your_supabase_anon_key';
    });

    if (missing.length > 0) {
      console.warn(`⚠️ Using fallback values for: ${missing.join(', ')}`);
      console.warn(
        'For production use, please set proper environment variables in Vercel dashboard'
      );
    }
  }

  // Validate URLs (but don't throw errors, just warn)
  try {
    new URL(env.VITE_SUPABASE_URL);
    new URL(env.VITE_APP_URL);
  } catch (error) {
    console.warn('⚠️ Invalid URL in environment variables, using fallbacks');
  }

  return true;
}

// Environment info for debugging
export function getEnvironmentInfo() {
  return {
    nodeEnv: env.NODE_ENV,
    appName: env.VITE_APP_NAME,
    appVersion: env.VITE_APP_VERSION,
    appUrl: env.VITE_APP_URL,
    features,
    timestamp: new Date().toISOString(),
  };
}

// Initialize environment validation
if (typeof window !== 'undefined') {
  try {
    validateEnvironment();
    if (isDevelopment) {
      console.info('✅ Environment validation passed', getEnvironmentInfo());
    }
  } catch (error) {
    console.error('❌ Environment validation failed:', error);
    // Don't throw in production to prevent app from breaking
    // Log the error but allow the app to continue
    if (isProduction) {
      console.warn('⚠️ Production environment validation failed, but continuing...');
    } else {
      throw error;
    }
  }
}
