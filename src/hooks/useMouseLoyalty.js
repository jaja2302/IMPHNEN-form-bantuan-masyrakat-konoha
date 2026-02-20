import { useEffect, useCallback } from 'react';

const MAX_STRIKES = 3;

export function useMouseLoyalty(onStrike, onReset, loyaltyStrikes, dispatch) {
  const handleMouseOut = useCallback((e) => {
    if (e.relatedTarget !== null) return;
    onStrike?.();
    const next = (loyaltyStrikes ?? 0) + 1;
    dispatch?.({ type: 'SET_LOYALTY_STRIKES', payload: next });
    if (next >= MAX_STRIKES) {
      onReset?.();
    }
  }, [onStrike, onReset, loyaltyStrikes, dispatch]);

  useEffect(() => {
    window.addEventListener('mouseout', handleMouseOut);
    return () => window.removeEventListener('mouseout', handleMouseOut);
  }, [handleMouseOut]);

  return { strikes: loyaltyStrikes ?? 0, maxStrikes: MAX_STRIKES };
}
