import { useEffect, useCallback } from 'react';

const BASE_ROTATION = 2;
const SCROLL_INCREMENT = 0.5;
const MAX_ROTATION = 8;

export function useFormVertigo(currentStep, dispatch, formRotation) {
  const handleScroll = useCallback(() => {
    if (currentStep < 15) return;
    const next = Math.min(MAX_ROTATION, (formRotation ?? 0) + SCROLL_INCREMENT);
    dispatch?.({ type: 'SET_FORM_ROTATION', payload: next });
  }, [currentStep, formRotation, dispatch]);

  useEffect(() => {
    if (currentStep >= 15) {
      const base = BASE_ROTATION;
      dispatch?.({ type: 'SET_FORM_ROTATION', payload: base });
    }
  }, [currentStep, dispatch]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return formRotation ?? 0;
}
