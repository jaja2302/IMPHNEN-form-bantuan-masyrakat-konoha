import { useState, useRef } from 'react';
import QuestionLayout from './questions/QuestionLayout';
import './RunawayCheckbox.css';

export default function RunawayCheckbox({ onNext, onPrev, step, totalSteps, onCheck }) {
  const [checked, setChecked] = useState(false);
  const [pos, setPos] = useState({ x: 120, y: 80 });
  const boxRef = useRef(null);

  const handleCheck = () => {
    setChecked(true);
    onCheck?.();
  };

  const handleMouseMove = (e) => {
    if (checked) return;
    const rect = boxRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist < 80) {
      const nx = pos.x + (Math.random() - 0.5) * 60;
      const ny = pos.y + (Math.random() - 0.5) * 60;
      setPos({
        x: Math.max(10, Math.min(280, nx)),
        y: Math.max(10, Math.min(120, ny)),
      });
    }
  };

  return (
    <div onMouseMove={handleMouseMove} className="runaway-wrapper">
      <QuestionLayout title="Centang persetujuan (tangkap kotak yang lari)" onPrev={onPrev} onNext={checked ? onNext : () => {}} step={step} totalSteps={totalSteps}>
        <div className="runaway-area">
          <div
            ref={boxRef}
            className="runaway-box"
            style={{ left: pos.x, top: pos.y }}
            onClick={handleCheck}
            onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
            role="button"
            tabIndex={0}
            aria-label="Centang persetujuan"
          >
            {checked ? '✓' : '☐'}
          </div>
        </div>
      </QuestionLayout>
    </div>
  );
}
