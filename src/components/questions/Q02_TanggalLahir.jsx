import { useState } from 'react';
import { useAppState } from '../../context/AppState';
import { incrementFailCount, blockUser } from '../../utils/storage';
import { getRandomGaslight } from '../../utils/gaslighting';
import { validateQ02Date } from '../../utils/validators';
import QuestionLayout from './QuestionLayout';

export default function Q02_TanggalLahir({ onNext, onPrev, step, totalSteps }) {
  const { answers, dispatch } = useAppState();
  const value = answers['q02'] ?? '';
  const [error, setError] = useState('');

  const handleNext = () => {
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

  return (
    <QuestionLayout title="Tanggal Lahir (format: DD/MM/YYYY)" onPrev={onPrev} onNext={handleNext} step={step} totalSteps={totalSteps} error={error}>
      <input
        type="text"
        value={value}
        onChange={(e) => dispatch({ type: 'SET_ANSWER', payload: { id: 'q02', value: e.target.value } })}
        placeholder="DD/MM/YYYY"
        className="question-input"
      />
    </QuestionLayout>
  );
}
