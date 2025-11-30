export const Env = {
  // Configuration
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  appHostUrl: process.env.NEXT_PUBLIC_APP_HOST_URL,
  appIdentifier: process.env.NEXT_PUBLIC_APP_IDENTIFIER,
  appMode: process.env.NEXT_PUBLIC_APP_MODE,

  // Flag
  isDevelopment: process.env.NEXT_PUBLIC_APP_MODE === 'development',
  isStaging: process.env.NEXT_PUBLIC_APP_MODE === 'staging',
  isProduction: process.env.NEXT_PUBLIC_APP_MODE === 'production',
  isEnableRBAC: process.env.NEXT_PUBLIC_ENABLE_RBAC,
};
