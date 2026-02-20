import { useEffect } from 'react';
import { useAppState } from '../context/AppState';
import ProgressBarChaos from './ProgressBarChaos';
import QuestionRouter from './questions/QuestionRouter';
import './FormContainer.css';

const TOTAL_STEPS = 20;

export default function FormContainer() {
  const { currentStep, dispatch, formRotation, characterClass, startTime } = useAppState();

  useEffect(() => {
    if (!startTime) {
      dispatch({ type: 'SET_START_TIME', payload: Date.now() });
    }
  }, [startTime, dispatch]);

  const style = {
    transform: formRotation ? `rotate(${formRotation}deg)` : undefined,
    opacity: characterClass === 'mage' ? 0.4 : undefined,
    fontWeight: characterClass === 'warrior' ? 'bold' : undefined,
    textTransform: characterClass === 'warrior' ? 'uppercase' : undefined,
  };

  return (
    <div className="form-container-wrapper">
      <ProgressBarChaos currentStep={currentStep} totalSteps={TOTAL_STEPS} />
      <div className="form-container" style={style}>
        <div className="form-reg-no">No. Reg: {Math.random().toString(36).slice(2, 10).toUpperCase()}</div>
        <QuestionRouter
          step={currentStep}
          totalSteps={TOTAL_STEPS}
          onNext={() => dispatch({ type: 'SET_STEP', payload: Math.min(currentStep + 1, TOTAL_STEPS) })}
          onPrev={() => dispatch({ type: 'SET_STEP', payload: Math.max(currentStep - 1, 1) })}
        />
      </div>
    </div>
  );
}
