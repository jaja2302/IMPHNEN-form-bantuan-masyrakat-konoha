import { useState } from 'react';
import { getRandomGaslight } from '../utils/gaslighting';
import { incrementFailCount, blockUser } from '../utils/storage';
import { useAppState } from '../context/AppState';
import QuestionLayout from './questions/QuestionLayout';
import './CaptchaEstetik.css';

const ITEMS = [
  { id: 'senja', label: 'Senja' },
  { id: 'hujan', label: 'Hujan' },
  { id: 'kursi', label: 'Kursi kosong' },
  { id: 'mantan', label: 'Mantan' },
  { id: 'mie', label: 'Mie instan' },
  { id: 'pohon', label: 'Pohon' },
  { id: 'kucing', label: 'Kucing' },
  { id: 'buku', label: 'Buku' },
  { id: 'kopi', label: 'Kopi' },
];

const CORRECT_ID = 'mie';

export default function CaptchaEstetik({ onNext, onPrev, step, totalSteps }) {
  const { dispatch } = useAppState();
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState('');

  const handleNext = () => {
    if (selected !== CORRECT_ID) {
      const failCount = incrementFailCount();
      if (failCount >= 3) {
        blockUser();
        dispatch({ type: 'SET_BLOCKED', payload: true });
        window.location.href = '/cooldown';
        return;
      }
      dispatch({ type: 'SET_FAIL_COUNT', payload: failCount });
      setError(getRandomGaslight());
      return;
    }
    dispatch({ type: 'SET_ANSWER', payload: { id: 'q17', value: selected } });
    setError('');
    onNext();
  };

  return (
    <QuestionLayout title="Pilih gambar yang mengandung rasa rindu." onPrev={onPrev} onNext={handleNext} step={step} totalSteps={totalSteps} error={error}>
      <div className="captcha-grid">
        {ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`captcha-item ${selected === item.id ? 'selected' : ''}`}
            onClick={() => setSelected(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </QuestionLayout>
  );
}
