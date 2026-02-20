import { useState } from 'react';
import { useAppState } from '../../context/AppState';
import { incrementFailCount, blockUser } from '../../utils/storage';
import { getRandomGaslight } from '../../utils/gaslighting';
import { validateQ07Stars, validateQ07SecretText } from '../../utils/validators';
import QuestionLayout from './QuestionLayout';

export default function Q07_KepuasanNegara({ onNext, onPrev, step, totalSteps }) {
  const { answers, dispatch, tcSecretFound } = useAppState();
  const stars = answers['q07_stars'] ?? '';
  const secretText = answers['q07_secret'] ?? '';
  const [error, setError] = useState('');

  const handleNext = () => {
    const r1 = validateQ07Stars(stars, tcSecretFound);
    if (!r1.ok) {
      const failCount = incrementFailCount();
      if (failCount >= 3) {
        blockUser();
        dispatch({ type: 'SET_BLOCKED', payload: true });
        window.location.href = '/cooldown';
        return;
      }
      dispatch({ type: 'SET_FAIL_COUNT', payload: failCount });
      setError(r1.msg || getRandomGaslight());
      return;
    }
    const r2 = validateQ07SecretText(secretText, tcSecretFound);
    if (!r2.ok) {
      const failCount = incrementFailCount();
      if (failCount >= 3) {
        blockUser();
        dispatch({ type: 'SET_BLOCKED', payload: true });
        window.location.href = '/cooldown';
        return;
      }
      dispatch({ type: 'SET_FAIL_COUNT', payload: failCount });
      setError(r2.msg || getRandomGaslight());
      return;
    }
    dispatch({ type: 'SET_ANSWER', payload: { id: 'q07_stars', value: stars } });
    dispatch({ type: 'SET_ANSWER', payload: { id: 'q07_secret', value: secretText } });
    setError('');
    onNext();
  };

  return (
    <QuestionLayout title="Kepuasan terhadap Negara (1–5 bintang). Hanya 3 yang diterima. Jika Anda baca T&C, ketik SAYA BACA di bawah." onPrev={onPrev} onNext={handleNext} step={step} totalSteps={totalSteps} error={error}>
      <div className="question-options" style={{ marginBottom: '1rem' }}>
        {[1, 2, 3, 4, 5].map((n) => (
          <label key={n} className="question-radio">
            <input
              type="radio"
              name="q07_stars"
              checked={stars === String(n)}
              onChange={() => dispatch({ type: 'SET_ANSWER', payload: { id: 'q07_stars', value: String(n) } })}
            />
            <span>{'⭐'.repeat(n)}</span>
          </label>
        ))}
      </div>
      <input
        type="text"
        value={secretText}
        onChange={(e) => dispatch({ type: 'SET_ANSWER', payload: { id: 'q07_secret', value: e.target.value } })}
        placeholder="Ketik SAYA BACA jika Anda baca kalimat tersembunyi di T&C"
        className="question-input"
      />
    </QuestionLayout>
  );
}
