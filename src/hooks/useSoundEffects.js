import { useCallback, useRef } from 'react';

export function useSoundEffects(soundEnabled) {
  const ctx = useRef(null);

  const play = useCallback((type) => {
    if (!soundEnabled) return;
    try {
      if (!ctx.current) ctx.current = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = ctx.current.createOscillator();
      const gain = ctx.current.createGain();
      oscillator.connect(gain);
      gain.connect(ctx.current.destination);
      gain.gain.value = 0.1;
      if (type === 'error') {
        oscillator.frequency.value = 150;
        oscillator.type = 'square';
      } else if (type === 'ok') {
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
      }
      oscillator.start(ctx.current.currentTime);
      oscillator.stop(ctx.current.currentTime + 0.1);
    } catch (_) {}
  }, [soundEnabled]);

  return { playError: () => play('error'), playOk: () => play('ok') };
}
