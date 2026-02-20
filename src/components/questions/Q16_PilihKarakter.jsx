import { useAppState } from '../../context/AppState';
import QuestionLayout from './QuestionLayout';

export default function Q16_PilihKarakter({ onNext, onPrev, step, totalSteps }) {
  const { answers, dispatch } = useAppState();
  const value = answers['q16'] ?? '';

  const handleNext = () => {
    if (!value) return;
    dispatch({ type: 'SET_ANSWER', payload: { id: 'q16', value } });
    dispatch({ type: 'SET_CHARACTER_CLASS', payload: value });
    onNext();
  };

  return (
    <QuestionLayout title="Pilih karakter (Mage = form transparan, Warrior = bold + caps)" onPrev={onPrev} onNext={handleNext} step={step} totalSteps={totalSteps}>
      <div className="question-options">
        <label className="question-radio">
          <input
            type="radio"
            name="q16"
            checked={value === 'mage'}
            onChange={() => dispatch({ type: 'SET_ANSWER', payload: { id: 'q16', value: 'mage' } })}
          />
          <span>Mage</span>
        </label>
        <label className="question-radio">
          <input
            type="radio"
            name="q16"
            checked={value === 'warrior'}
            onChange={() => dispatch({ type: 'SET_ANSWER', payload: { id: 'q16', value: 'warrior' } })}
          />
          <span>Warrior</span>
        </label>
      </div>
    </QuestionLayout>
  );
}
