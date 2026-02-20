import { useAppState } from '../../context/AppState';
import { getRandomRouletteComment } from '../../utils/rouletteQuestions';
import QuestionLayout from './QuestionLayout';

export default function RouletteQuestion({ question, onNext, onPrev }) {
  const { answers, dispatch } = useAppState();
  const key = `roulette_${question?.slice(0, 8)}`;
  const value = answers[key] ?? '';
  const comment = getRandomRouletteComment();

  const handleNext = () => {
    dispatch({ type: 'SET_ANSWER', payload: { id: key, value } });
    onNext();
  };

  return (
    <QuestionLayout title={question} onPrev={onPrev} onNext={handleNext} step="Bonus" totalSteps={20}>
      <input
        type="text"
        value={value}
        onChange={(e) => dispatch({ type: 'SET_ANSWER', payload: { id: key, value: e.target.value } })}
        placeholder="Jawaban Anda..."
        className="question-input"
      />
      <p className="question-feedback negative">{comment}</p>
    </QuestionLayout>
  );
}
