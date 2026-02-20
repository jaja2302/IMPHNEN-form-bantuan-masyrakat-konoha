import { useAppState } from '../../context/AppState';
import QuestionLayout from './QuestionLayout';

export default function Q15_NamaGuruSD({ onNext, onPrev, step, totalSteps }) {
  const { answers, dispatch } = useAppState();
  const value = answers['q15'] ?? '';

  const handleNext = () => {
    dispatch({ type: 'SET_ANSWER', payload: { id: 'q15', value } });
    onNext();
  };

  return (
    <QuestionLayout title="Nama guru SD Anda" onPrev={onPrev} onNext={handleNext} step={step} totalSteps={totalSteps}>
      <input
        type="text"
        value={value}
        onChange={(e) => dispatch({ type: 'SET_ANSWER', payload: { id: 'q15', value: e.target.value } })}
        placeholder="Nama guru"
        className="question-input"
      />
      {value && <p className="question-feedback negative">Salah. Beliau tidak mengenal Anda.</p>}
    </QuestionLayout>
  );
}
