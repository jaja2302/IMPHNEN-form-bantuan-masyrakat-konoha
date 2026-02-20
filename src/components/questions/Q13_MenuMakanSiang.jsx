import { useAppState } from '../../context/AppState';
import QuestionLayout from './QuestionLayout';

export default function Q13_MenuMakanSiang({ onNext, onPrev, step, totalSteps }) {
  const { answers, dispatch } = useAppState();
  const value = answers['q13'] ?? '';

  const handleNext = () => {
    if (!value) return;
    onNext();
  };

  const v = (value || '').toLowerCase();
  const isMie = v.includes('mie') || v.includes('instant');
  const isSteakSushi = v.includes('steak') || v.includes('sushi');

  return (
    <QuestionLayout title="Menu makan siang hari ini" onPrev={onPrev} onNext={handleNext} step={step} totalSteps={totalSteps}>
      <input
        type="text"
        value={value}
        onChange={(e) => dispatch({ type: 'SET_ANSWER', payload: { id: 'q13', value: e.target.value } })}
        placeholder="Contoh: Mie Instan, Nasi Goreng..."
        className="question-input"
      />
      {isMie && <p className="question-feedback positive">Semangat ya pejuang bantuan! 💪</p>}
      {isSteakSushi && <p className="question-feedback negative">Anda yakin butuh bantuan?</p>}
    </QuestionLayout>
  );
}
