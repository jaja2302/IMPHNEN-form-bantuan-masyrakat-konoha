import { useEffect, useRef, useCallback } from 'react';

const DEADLINE_MS = 10000;
const STEPS_WITH_TIMER = [3, 7, 11, 15, 19];

export function useHiddenTimer(step, onExpire) {
  const deadline = useRef(null);
  const timer = useRef(null);

  const start = useCallback(() => {
    if (!STEPS_WITH_TIMER.includes(step)) return;
    deadline.current = Date.now() + DEADLINE_MS;
    timer.current = setTimeout(() => {
      onExpire?.();
    }, DEADLINE_MS);
  }, [step, onExpire]);

  const cancel = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  useEffect(() => {
    return cancel;
  }, [cancel, step]);

  return { start, cancel };
}
