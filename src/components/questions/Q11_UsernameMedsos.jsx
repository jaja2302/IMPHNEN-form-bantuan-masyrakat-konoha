import { useState } from 'react';
import { useAppState } from '../../context/AppState';
import { incrementFailCount, blockUser } from '../../utils/storage';
import { getRandomGaslight } from '../../utils/gaslighting';
import { validateQ11NoAtNoNumber } from '../../utils/validators';
import QuestionLayout from './QuestionLayout';

export default function Q11_UsernameMedsos({ onNext, onPrev, step, totalSteps }) {
  const { answers, dispatch } = useAppState();
  const value = answers['q11'] ?? '';
  const [error, setError] = useState('');

  const handleNext = () => {
    const result = validateQ11NoAtNoNumber(value);
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
    dispatch({ type: 'SET_ANSWER', payload: { id: 'q11', value } });
    setError('');
    onNext();
  };

  return (
    <QuestionLayout title="Username media sosial (dilarang @ dan angka)" onPrev={onPrev} onNext={handleNext} step={step} totalSteps={totalSteps} error={error}>
      <input
        type="text"
        value={value}
        onChange={(e) => dispatch({ type: 'SET_ANSWER', payload: { id: 'q11', value: e.target.value } })}
        placeholder="Username tanpa @ dan angka"
        className="question-input"
      />
    </QuestionLayout>
  );
}
