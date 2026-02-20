import { useAppState } from '../../context/AppState';
import QuestionLayout from './QuestionLayout';

const OPTIONS = ['Rakyat Jelata', 'NPC', 'Sultan (Maintenance)', 'Error 404: Status Not Found'];

export default function Q04_StatusSosial({ onNext, onPrev, step, totalSteps }) {
  const { answers, dispatch } = useAppState();
  const value = answers['q04'] ?? '';

  const handleNext = () => {
    if (!value) return;
    onNext();
  };

  return (
    <QuestionLayout title="Status Sosial" onPrev={onPrev} onNext={handleNext} step={step} totalSteps={totalSteps}>
      <select
        value={value}
        onChange={(e) => dispatch({ type: 'SET_ANSWER', payload: { id: 'q04', value: e.target.value } })}
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
