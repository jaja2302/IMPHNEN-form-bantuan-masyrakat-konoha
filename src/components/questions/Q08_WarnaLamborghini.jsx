import { useState } from 'react';
import { useAppState } from '../../context/AppState';
import { incrementFailCount, blockUser } from '../../utils/storage';
import { getRandomGaslight } from '../../utils/gaslighting';
import { validateQ08Lamborghini } from '../../utils/validators';
import QuestionLayout from './QuestionLayout';

export default function Q08_WarnaLamborghini({ onNext, onPrev, step, totalSteps }) {
  const { answers, dispatch } = useAppState();
  const value = answers['q08'] ?? '';
  const [error, setError] = useState('');

  const handleNext = () => {
    const result = validateQ08Lamborghini(value);
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
    dispatch({ type: 'SET_ANSWER', payload: { id: 'q08', value } });
    setError('');
    onNext();
  };

  return (
    <QuestionLayout title="Warna Lamborghini Anda (wajib diisi meskipun belum punya)" onPrev={onPrev} onNext={handleNext} step={step} totalSteps={totalSteps} error={error}>
      <input
        type="text"
        value={value}
        onChange={(e) => dispatch({ type: 'SET_ANSWER', payload: { id: 'q08', value: e.target.value } })}
        placeholder="Contoh: Belum punya"
        className="question-input"
      />
    </QuestionLayout>
  );
}
