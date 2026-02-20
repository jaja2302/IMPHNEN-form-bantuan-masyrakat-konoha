import { useState } from 'react';
import { useAppState } from '../../context/AppState';
import { incrementFailCount, blockUser } from '../../utils/storage';
import { getRandomGaslight } from '../../utils/gaslighting';
import { validateQ12CitaCita } from '../../utils/validators';
import QuestionLayout from './QuestionLayout';

export default function Q12_CitaCita({ onNext, onPrev, step, totalSteps }) {
  const { answers, dispatch } = useAppState();
  const value = answers['q12'] ?? '';
  const [error, setError] = useState('');

  const handleNext = () => {
    const result = validateQ12CitaCita(value);
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
    dispatch({ type: 'SET_ANSWER', payload: { id: 'q12', value } });
    setError('');
    onNext();
  };

  return (
    <QuestionLayout title="Cita-cita waktu kecil" onPrev={onPrev} onNext={handleNext} step={step} totalSteps={totalSteps} error={error}>
      <input
        type="text"
        value={value}
        onChange={(e) => dispatch({ type: 'SET_ANSWER', payload: { id: 'q12', value: e.target.value } })}
        placeholder="Jangan tulis Kaya atau Astronot"
        className="question-input"
      />
    </QuestionLayout>
  );
}
