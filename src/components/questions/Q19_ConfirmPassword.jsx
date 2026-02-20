import { useState } from 'react';
import { useAppState } from '../../context/AppState';
import { incrementFailCount, blockUser } from '../../utils/storage';
import { getRandomGaslight } from '../../utils/gaslighting';
import { validateQ19MatchPassword } from '../../utils/validators';
import QuestionLayout from './QuestionLayout';

export default function Q19_ConfirmPassword({ onNext, onPrev, step, totalSteps }) {
  const { answers, dispatch } = useAppState();
  const value = answers['q19'] ?? '';
  const [error, setError] = useState('');

  const handleNext = () => {
    const result = validateQ19MatchPassword(value, answers['q18']);
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
    dispatch({ type: 'SET_ANSWER', payload: { id: 'q19', value } });
    setError('');
    onNext();
  };

  return (
    <QuestionLayout title="Konfirmasi password (ketik ulang, copy-paste dinonaktifkan)" onPrev={onPrev} onNext={handleNext} step={step} totalSteps={totalSteps} error={error}>
      <input
        type="password"
        value={value}
        onPaste={(e) => e.preventDefault()}
        onChange={(e) => dispatch({ type: 'SET_ANSWER', payload: { id: 'q19', value: e.target.value } })}
        placeholder="Ketik ulang password"
        className="question-input"
        style={{ fontFamily: 'var(--font-mono)' }}
      />
    </QuestionLayout>
  );
}
