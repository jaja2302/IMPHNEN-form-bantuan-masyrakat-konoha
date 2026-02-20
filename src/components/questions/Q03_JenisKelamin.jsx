import { useAppState } from '../../context/AppState';
import QuestionLayout from './QuestionLayout';

const OPTIONS = [
  { id: 'obeng', label: 'Obeng' },
  { id: 'lipstik', label: 'Lipstik' },
  { id: 'panci', label: 'Panci' },
];

export default function Q03_JenisKelamin({ onNext, onPrev, step, totalSteps }) {
  const { answers, dispatch } = useAppState();
  const value = answers['q03'] ?? '';

  const handleNext = () => {
    if (!value) return;
    onNext();
  };

  return (
    <QuestionLayout title="Jenis Kelamin — Pilih foto benda yang mewakili" onPrev={onPrev} onNext={handleNext} step={step} totalSteps={totalSteps}>
      <div className="question-options">
        {OPTIONS.map((opt) => (
          <label key={opt.id} className="question-radio">
            <input
              type="radio"
              name="q03"
              checked={value === opt.id}
              onChange={() => dispatch({ type: 'SET_ANSWER', payload: { id: 'q03', value: opt.id } })}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </QuestionLayout>
  );
}
