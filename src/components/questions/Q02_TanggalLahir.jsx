import { useState, useEffect } from 'react';
import { useAppState } from '../../context/AppState';
import { incrementFailCount, blockUser } from '../../utils/storage';
import { getRandomGaslight } from '../../utils/gaslighting';
import { validateQ02Date } from '../../utils/validators';
import QuestionLayout from './QuestionLayout';
import './Q02_TanggalLahir.css';

function parseDate(value) {
  if (!value) return { dd: 1, mm: 1, yyyy: 1990 };
  const parts = String(value).trim().split(/[/-]/);
  if (parts.length !== 3) return { dd: 1, mm: 1, yyyy: 1990 };
  const dd = Math.max(1, Math.min(31, parseInt(parts[0], 10) || 1));
  const mm = Math.max(1, Math.min(12, parseInt(parts[1], 10) || 1));
  const yyyy = Math.max(1900, Math.min(2100, parseInt(parts[2], 10) || 1990));
  return { dd, mm, yyyy };
}

function toValue(dd, mm, yyyy) {
  const d = String(dd).padStart(2, '0');
  const m = String(mm).padStart(2, '0');
  return `${d}/${m}/${yyyy}`;
}

export default function Q02_TanggalLahir({ onNext, onPrev, step, totalSteps }) {
  const { answers, dispatch } = useAppState();
  const raw = answers['q02'] ?? '';
  const [error, setError] = useState('');
  const [dd, setDd] = useState(() => parseDate(raw).dd);
  const [mm, setMm] = useState(() => parseDate(raw).mm);
  const [yyyy, setYyyy] = useState(() => parseDate(raw).yyyy);

  useEffect(() => {
    const p = parseDate(raw);
    setDd(p.dd);
    setMm(p.mm);
    setYyyy(p.yyyy);
  }, [raw]);

  const apply = (newDd, newMm, newYyyy) => {
    const d = newDd ?? dd;
    const m = newMm ?? mm;
    const y = newYyyy ?? yyyy;
    if (newDd != null) setDd(d);
    if (newMm != null) setMm(m);
    if (newYyyy != null) setYyyy(y);
    dispatch({ type: 'SET_ANSWER', payload: { id: 'q02', value: toValue(d, m, y) } });
  };

  const handleNext = () => {
    const value = toValue(dd, mm, yyyy);
    const result = validateQ02Date(value);
    if (!result.ok) {
      const failCount = incrementFailCount();
      if (failCount >= 3) {
        blockUser();
        dispatch({ type: 'SET_BLOCKED', payload: true });
        window.location.href = '/cooldown';
        return;
      }
      dispatch({ type: 'SET_FAIL_COUNT', payload: failCount });
      setError(result.msg || getRandomGaslight());
      return;
    }
    dispatch({ type: 'SET_ANSWER', payload: { id: 'q02', value } });
    setError('');
    onNext();
  };

  const Stepper = ({ label, value, min, max, onUp, onDown }) => (
    <div className="q02-stepper">
      <span className="q02-stepper-label">{label}</span>
      <div className="q02-stepper-controls">
        <button type="button" className="q02-btn" onClick={onDown} aria-label={`Kurangi ${label}`}>−</button>
        <span className="q02-stepper-value">{String(value).padStart(label === 'YYYY' ? 4 : 2, '0')}</span>
        <button type="button" className="q02-btn" onClick={onUp} aria-label={`Tambah ${label}`}>+</button>
      </div>
    </div>
  );

  return (
    <QuestionLayout title="Tanggal Lahir — atur dengan tombol +/− (DD/MM/YYYY)" onPrev={onPrev} onNext={handleNext} step={step} totalSteps={totalSteps} error={error}>
      <div className="q02-date-steppers">
        <Stepper label="DD" value={dd} min={1} max={31} onDown={() => apply(Math.max(1, dd - 1), null, null)} onUp={() => apply(Math.min(31, dd + 1), null, null)} />
        <Stepper label="MM" value={mm} min={1} max={12} onDown={() => apply(null, Math.max(1, mm - 1), null)} onUp={() => apply(null, Math.min(12, mm + 1), null)} />
        <Stepper label="YYYY" value={yyyy} min={1900} max={2010} onDown={() => apply(null, null, Math.max(1900, yyyy - 1))} onUp={() => apply(null, null, Math.min(2010, yyyy + 1))} />
      </div>
      <p className="q02-preview">{toValue(dd, mm, yyyy)}</p>
    </QuestionLayout>
  );
}
