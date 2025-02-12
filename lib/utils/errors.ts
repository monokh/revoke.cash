import { stringify } from 'viem';

export const isUserRejectionError = (message?: string): boolean => {
  const lowercaseMessage = message?.toLowerCase();
  if (lowercaseMessage?.includes('user denied')) return true;
  if (lowercaseMessage?.includes('user rejected')) return true;
  return false;
};

export const isRevertedError = (message?: string): boolean => {
  const lowercaseMessage = message?.toLowerCase();
  if (lowercaseMessage?.includes('revert')) return true;
  return false;
};

export const isLogResponseSizeError = (message?: string) => {
  const lowercaseMessage = message?.toLowerCase();
  if (lowercaseMessage?.includes('query returned more than 10000 results')) return true;
  if (lowercaseMessage?.includes('log response size exceeded')) return true;
  if (lowercaseMessage?.includes('query timeout exceeded')) return true;
  return false;
};

export const isRateLimitError = (message?: string) => {
  const lowercaseMessage = message?.toLowerCase();
  if (lowercaseMessage?.includes('max rate limit reached')) return true;
  if (lowercaseMessage?.includes('request failed with status code 429')) return true;
  if (lowercaseMessage?.includes('429 too many requests')) return true;
  return false;
};

export const isNetworkError = (message?: string) => {
  const lowercaseMessage = message?.toLowerCase();
  if (lowercaseMessage?.includes('http request failed')) return true;
  return false;
};

export const parseErrorMessage = (error: any): string => {
  const errorMessage =
    error?.error?.message ??
    error?.data?.message ??
    error?.response?.data?.message ??
    error?.details ??
    error?.shortMessage ??
    error?.message ??
    error;

  if (typeof errorMessage === 'object') {
    try {
      return stringify(errorMessage);
    } catch {
      return String(errorMessage);
    }
  }

  return String(errorMessage);
};
