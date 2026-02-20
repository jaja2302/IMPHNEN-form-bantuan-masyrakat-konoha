import { useAppState } from '../../context/AppState';
import QuestionLayout from './QuestionLayout';

const OPTIONS = ['Mimpi Semalam', 'Grup WA Hoax', 'Bisikan Gaib', 'Perintah Atasan'];

export default function Q09_SumberInformasi({ onNext, onPrev, step, totalSteps }) {
  const { answers, dispatch } = useAppState();
  const value = answers['q09'] ?? '';

  const handleNext = () => {
    if (!value) return;
    onNext();
  };

  return (
    <QuestionLayout title="Sumber Informasi" onPrev={onPrev} onNext={handleNext} step={step} totalSteps={totalSteps}>
      <select
        value={value}
        onChange={(e) => dispatch({ type: 'SET_ANSWER', payload: { id: 'q09', value: e.target.value } })}
        className="question-select"
      >
        <option value="">— Pilih —</option>
        {OPTIONS.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </QuestionLayout>
  );
}
