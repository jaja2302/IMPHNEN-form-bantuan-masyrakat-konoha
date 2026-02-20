import { useState } from 'react';
import { useAppState } from '../../context/AppState';
import { incrementFailCount, blockUser } from '../../utils/storage';
import { getRandomGaslight } from '../../utils/gaslighting';
import { validateQ05Slider } from '../../utils/validators';
import QuestionLayout from './QuestionLayout';

export default function Q05_TingkatKebutuhan({ onNext, onPrev, step, totalSteps }) {
  const { answers, dispatch } = useAppState();
  const value = answers['q05'] ?? 50;
  const [error, setError] = useState('');

  const handleNext = () => {
    const result = validateQ05Slider(Number(value));
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
    dispatch({ type: 'SET_ANSWER', payload: { id: 'q05', value: Number(value) } });
    setError('');
    onNext();
  };

  return (
    <QuestionLayout title="Tingkat Kebutuhan (0–100). Sweet spot: 42–69" onPrev={onPrev} onNext={handleNext} step={step} totalSteps={totalSteps} error={error}>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => dispatch({ type: 'SET_ANSWER', payload: { id: 'q05', value: e.target.value } })}
        className="question-slider"
      />
      <span className="question-slider-value">{value}</span>
    </QuestionLayout>
  );
}
