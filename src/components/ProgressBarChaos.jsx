import { useState, useEffect, useRef } from 'react';
import './ProgressBarChaos.css';

export default function ProgressBarChaos({ currentStep, totalSteps }) {
  const realPercent = totalSteps ? Math.round((currentStep / totalSteps) * 100) : 0;
  const [displayPercent, setDisplayPercent] = useState(realPercent);
  const [message, setMessage] = useState('');
  const stuckAt99 = useRef(false);
  const chaosTimer = useRef(null);

  useEffect(() => {
    if (stuckAt99.current && realPercent >= 99) return;
    if (realPercent >= 99 && !stuckAt99.current) {
      stuckAt99.current = true;
      setDisplayPercent(99);
      chaosTimer.current = setTimeout(() => {
        setDisplayPercent(100);
        stuckAt99.current = false;
      }, 30000);
      return () => clearTimeout(chaosTimer.current);
    }
    if (Math.random() < 0.25 && realPercent > 20 && realPercent < 80) {
      const drop = 5 + Math.floor(Math.random() * 6);
      setDisplayPercent(Math.max(0, realPercent - drop));
      setMessage('Antrean Anda digeser oleh pejabat.');
      const t = setTimeout(() => setMessage(''), 3000);
      return () => clearTimeout(t);
    }
    if (Math.random() < 0.2) {
      setDisplayPercent(Math.max(0, realPercent - Math.floor(Math.random() * 10)));
    } else {
      setDisplayPercent(realPercent);
    }
  }, [currentStep, realPercent]);

  return (
    <div className="progress-bar-chaos">
      <div className="progress-bar-chaos-fill" style={{ width: `${displayPercent}%` }} />
      <span className="progress-bar-chaos-label">{displayPercent}%</span>
      {message && <span className="progress-bar-chaos-msg">{message}</span>}
    </div>
  );
}
