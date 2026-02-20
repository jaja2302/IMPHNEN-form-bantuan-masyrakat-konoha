import { useState } from 'react';
import { useAppState } from '../../context/AppState';
import QuestionLayout from './QuestionLayout';

export default function Q20_ConfirmTheConfirm({ onNext, onPrev, step, totalSteps }) {
  const { answers, dispatch } = useAppState();
  const value = answers['q20'] ?? '';
  const [error, setError] = useState('');

  const handleNext = () => {
    if (value !== answers['q18']) {
      setError('Satu kesalahan terdeteksi. Mengembalikan ke soal 19.');
      dispatch({ type: 'SET_STEP', payload: 19 });
      return;
    }
    dispatch({ type: 'SET_ANSWER', payload: { id: 'q20', value } });
    setError('');
    onNext();
  };

  return (
    <QuestionLayout title="Konfirmasi terakhir — ketik ulang password tanpa melihat (teks transparan)" onPrev={onPrev} onNext={handleNext} step={step} totalSteps={totalSteps} error={error}>
      <input
        type="password"
        value={value}
        onChange={(e) => dispatch({ type: 'SET_ANSWER', payload: { id: 'q20', value: e.target.value } })}
        placeholder="Ketik ulang password — teks tidak terlihat"
        className="question-input"
        style={{ color: 'var(--putih-bersih)', backgroundColor: 'var(--putih-bersih)', caretColor: 'var(--biru-pemerintah)' }}
      />
    </QuestionLayout>
  );
}
