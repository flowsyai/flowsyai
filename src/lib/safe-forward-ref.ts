import * as React from 'react';

/**
 * Safe forwardRef utility that provides a fallback when React.forwardRef is undefined
 * This prevents the "Cannot read properties of undefined (reading 'forwardRef')" error
 * that can occur in certain build environments or when React is not properly loaded.
 */
export const safeForwardRef = React?.forwardRef || ((render: any) => render);

/**
 * Type-safe wrapper for React.forwardRef with error handling
 */
export function createSafeForwardRef<T, P = {}>(
  render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
) {
  try {
    return safeForwardRef<T, P>(render);
  } catch (error) {
    console.warn('forwardRef error, falling back to regular component:', error);
    return render as any;
  }
}

export default safeForwardRef;
