/**
 * Standardized Error Codes
 * Matches backend error code system
 */

// Authentication Errors (401XX)
export const AUTH_ERROR_CODES = {
  UNAUTHORIZED: 40101,
  INVALID_TOKEN: 40102,
  TOKEN_EXPIRED: 40103,
};

// Subscription Errors (403XX)
export const SUBSCRIPTION_ERROR_CODES = {
  NO_SUBSCRIPTION: 40301,
  NO_SUBSCRIPTION_OR_TRIAL: 40302,
  TRIAL_EXPIRED: 40303,
  SUBSCRIPTION_EXPIRED: 40304,
  TRIAL_NOT_ALLOWED: 40305,
  SUBSCRIPTION_INACTIVE: 40306,
};

// Not Found Errors (404XX)
export const NOT_FOUND_ERROR_CODES = {
  USER_NOT_FOUND: 40401,
  RESOURCE_NOT_FOUND: 40402,
};

// Bad Request Errors (400XX)
export const BAD_REQUEST_ERROR_CODES = {
  INVALID_USER_ID: 40001,
  INVALID_INPUT: 40002,
};

// Server Errors (500XX)
export const SERVER_ERROR_CODES = {
  INTERNAL_ERROR: 50001,
};

/**
 * Get subscription status from error code
 */
export const getSubscriptionStatusFromErrorCode = (errorCode) => {
  switch (errorCode) {
    case SUBSCRIPTION_ERROR_CODES.NO_SUBSCRIPTION:
    case SUBSCRIPTION_ERROR_CODES.NO_SUBSCRIPTION_OR_TRIAL:
      return "NO_SUBSCRIPTION";
    case SUBSCRIPTION_ERROR_CODES.TRIAL_EXPIRED:
      return "TRIAL_EXPIRED";
    case SUBSCRIPTION_ERROR_CODES.SUBSCRIPTION_EXPIRED:
    case SUBSCRIPTION_ERROR_CODES.SUBSCRIPTION_INACTIVE:
      return "SUBSCRIPTION_EXPIRED";
    case SUBSCRIPTION_ERROR_CODES.TRIAL_NOT_ALLOWED:
      return "TRIAL_NOT_ALLOWED";
    default:
      return null;
  }
};

/**
 * Check if error code is subscription-related
 */
export const isSubscriptionError = (errorCode) => {
  return Object.values(SUBSCRIPTION_ERROR_CODES).includes(errorCode);
};

/**
 * Check if error code is authentication-related
 */
export const isAuthError = (errorCode) => {
  return Object.values(AUTH_ERROR_CODES).includes(errorCode);
};
