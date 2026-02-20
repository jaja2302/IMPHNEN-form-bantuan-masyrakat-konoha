import { useAppState } from '../../context/AppState';
import RunawayCheckbox from '../RunawayCheckbox';

export default function Q10_Checkbox({ onNext, onPrev, step, totalSteps }) {
  const { dispatch, answers } = useAppState();
  const handleNext = () => {
    if (answers['q10']) onNext();
  };
  return (
    <RunawayCheckbox
      onNext={handleNext}
      onPrev={onPrev}
      step={step}
      totalSteps={totalSteps}
      onCheck={() => dispatch({ type: 'SET_ANSWER', payload: { id: 'q10', value: true } })}
    />
  );
}
