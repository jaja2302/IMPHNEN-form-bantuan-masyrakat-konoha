import { useState } from 'react';
import { useAppState } from '../../context/AppState';
import { incrementFailCount, blockUser } from '../../utils/storage';
import { getRandomGaslight } from '../../utils/gaslighting';
import { validateQ18Password } from '../../utils/validators';
import QuestionLayout from './QuestionLayout';
import FakeBlueScreen from '../FakeBlueScreen';

export default function Q18_Password({ onNext, onPrev, step, totalSteps }) {
  const { answers, dispatch } = useAppState();
  const value = answers['q18'] ?? '';
  const [error, setError] = useState('');
  const [bsodShown, setBsodShown] = useState(false);
  const [bsodVisible, setBsodVisible] = useState(false);

  const handleFocus = () => {
    if (!bsodShown) {
      setBsodShown(true);
      setBsodVisible(true);
      setTimeout(() => setBsodVisible(false), 5000);
    }
  };

  const handleNext = () => {
    const result = validateQ18Password(value);
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
    dispatch({ type: 'SET_ANSWER', payload: { id: 'q18', value } });
    setError('');
    onNext();
  };

  return (
    <>
      {bsodVisible && <FakeBlueScreen />}
      <QuestionLayout title="Password: 1 simbol (Ω, ∆, atau ☆), 1 angka, minimal 1 curhatan pribadi (≥20 karakter)" onPrev={onPrev} onNext={handleNext} step={step} totalSteps={totalSteps} error={error}>
        <input
          type="password"
          value={value}
          onFocus={handleFocus}
          onChange={(e) => dispatch({ type: 'SET_ANSWER', payload: { id: 'q18', value: e.target.value } })}
          placeholder="Password..."
          className="question-input"
          style={{ fontFamily: 'var(--font-mono)' }}
        />
      </QuestionLayout>
    </>
  );
}
