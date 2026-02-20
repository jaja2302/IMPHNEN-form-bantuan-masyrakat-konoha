import { useState, useCallback, useRef } from 'react';

const MAX_CHARS_PER_SEC = 5;
const LOCK_DURATION_MS = 10000;

export function useTypingSpeed() {
  const [locked, setLocked] = useState(false);
  const timestamps = useRef([]);

  const recordKey = useCallback(() => {
    if (locked) return;
    const now = Date.now();
    timestamps.current.push(now);
    const windowStart = now - 1000;
    timestamps.current = timestamps.current.filter((t) => t >= windowStart);
    if (timestamps.current.length > MAX_CHARS_PER_SEC) {
      setLocked(true);
      setTimeout(() => setLocked(false), LOCK_DURATION_MS);
    }
  }, [locked]);

  return { locked, recordKey, lockMessage: 'Kecepatan mengetik Anda mencurigakan. Anda bot atau mata-mata negara tetangga?' };
}
