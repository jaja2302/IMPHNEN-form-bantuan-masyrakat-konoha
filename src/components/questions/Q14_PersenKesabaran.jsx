import { useState } from 'react';
import { useAppState } from '../../context/AppState';
import QuestionLayout from './QuestionLayout';

export default function Q14_PersenKesabaran({ onNext, onPrev, step, totalSteps }) {
  const { answers, dispatch } = useAppState();
  const value = answers['q14'] ?? 50;
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    const n = Number(value);
    if (n > 90) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        dispatch({ type: 'SET_ANSWER', payload: { id: 'q14', value: n } });
        onNext();
      }, 15000);
      return;
    }
    dispatch({ type: 'SET_ANSWER', payload: { id: 'q14', value: n } });
    onNext();
  };

  if (loading) {
    return (
      <div className="question-layout">
        <h2>Memverifikasi kesabaran...</h2>
        <p>Mohon tunggu, sistem sedang memproses.</p>
        <div className="question-loading-bar" />
      </div>
    );
  }

  return (
    <QuestionLayout title="Persen kesabaran Anda (0–100). Jika &gt;90% akan ada loading verifikasi." onPrev={onPrev} onNext={handleNext} step={step} totalSteps={totalSteps}>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => dispatch({ type: 'SET_ANSWER', payload: { id: 'q14', value: e.target.value } })}
        className="question-slider"
      />
      <span className="question-slider-value">{value}%</span>
      {Number(value) < 10 && <p className="question-feedback positive">Kami kagum Anda sampai sini.</p>}
    </QuestionLayout>
  );
}
