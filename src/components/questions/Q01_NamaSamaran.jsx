import { useState } from 'react';
import { useAppState } from '../../context/AppState';
import { incrementFailCount, blockUser } from '../../utils/storage';
import { getRandomGaslight } from '../../utils/gaslighting';
import { validateQ01NoVowel } from '../../utils/validators';
import QuestionLayout from './QuestionLayout';

export default function Q01_NamaSamaran({ onNext, onPrev, step, totalSteps }) {
  const { answers, dispatch } = useAppState();
  const value = answers['q01'] ?? '';
  const [error, setError] = useState('');

  const handleNext = () => {
    const result = validateQ01NoVowel(value);
    if (!result.ok) {
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
    dispatch({ type: 'SET_ANSWER', payload: { id: 'q01', value } });
    setError('');
    onNext();
  };

  return (
    <QuestionLayout title="Nama Samaran (tanpa huruf vokal A, I, U, E, O)" onPrev={onPrev} onNext={handleNext} step={step} totalSteps={totalSteps} error={error}>
      <input
        type="text"
        value={value}
        onChange={(e) => dispatch({ type: 'SET_ANSWER', payload: { id: 'q01', value: e.target.value } })}
        placeholder="Contoh: Bambang → Bmbng"
        className="question-input"
      />
    </QuestionLayout>
  );
}
