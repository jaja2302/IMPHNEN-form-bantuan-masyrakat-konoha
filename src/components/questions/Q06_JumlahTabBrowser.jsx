import { useState } from 'react';
import { useAppState } from '../../context/AppState';
import { incrementFailCount, blockUser } from '../../utils/storage';
import { getRandomGaslight } from '../../utils/gaslighting';
import { validateQ06EvenTabs } from '../../utils/validators';
import QuestionLayout from './QuestionLayout';

export default function Q06_JumlahTabBrowser({ onNext, onPrev, step, totalSteps }) {
  const { answers, dispatch } = useAppState();
  const value = answers['q06'] ?? '';
  const [error, setError] = useState('');

  const handleNext = () => {
    const result = validateQ06EvenTabs(value);
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
    dispatch({ type: 'SET_ANSWER', payload: { id: 'q06', value } });
    setError('');
    onNext();
  };

  return (
    <QuestionLayout title="Jumlah tab browser yang sedang terbuka (harus genap)" onPrev={onPrev} onNext={handleNext} step={step} totalSteps={totalSteps} error={error}>
      <input
        type="number"
        min="0"
        value={value}
        onChange={(e) => dispatch({ type: 'SET_ANSWER', payload: { id: 'q06', value: e.target.value } })}
        placeholder="Contoh: 2, 4, 6..."
        className="question-input"
      />
    </QuestionLayout>
  );
}
