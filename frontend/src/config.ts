const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const appEnv = process.env.NEXT_PUBLIC_APP_ENV || 'development';
const stellarNetwork = process.env.NEXT_PUBLIC_STELLAR_NETWORK || 'testnet';

/**
 * Validate configuration at runtime.
 * Ensures critical environment variables are present and valid.
 */
function validateConfig() {
  const errors: string[] = [];

  if (!apiUrl) {
    errors.push('NEXT_PUBLIC_API_URL is required');
  } else if (appEnv === 'production' && apiUrl.includes('localhost')) {
    errors.push('NEXT_PUBLIC_API_URL cannot be localhost in production');
  }

  if (!['development', 'test', 'production'].includes(appEnv)) {
    errors.push(`Invalid NEXT_PUBLIC_APP_ENV: ${appEnv}`);
  }

  if (!['testnet', 'mainnet'].includes(stellarNetwork)) {
    errors.push(`Invalid NEXT_PUBLIC_STELLAR_NETWORK: ${stellarNetwork}`);
  }

  if (errors.length > 0) {
    throw new Error(`Configuration errors:\n- ${errors.join('\n- ')}`);
  }
}

// Perform validation on load
validateConfig();

export const config = {
  apiUrl,
  appEnv,
  stellarNetwork,
} as const;
