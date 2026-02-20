import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../context/AppState';
import { getRandomRouletteQuestion, getRandomRoulettePosition } from '../utils/rouletteQuestions';
import { useMouseLoyalty } from '../hooks/useMouseLoyalty';
import { useFormVertigo } from '../hooks/useFormVertigo';
import ProgressBarChaos from './ProgressBarChaos';
import QuestionRouter from './questions/QuestionRouter';
import SurveillancePopup from './SurveillancePopup';
import './FormContainer.css';

const TOTAL_STEPS = 21;

export default function FormContainer() {
  const navigate = useNavigate();
  const { currentStep, dispatch, formRotation, characterClass, startTime, roulettePosition, loyaltyStrikes, registrationNo } = useAppState();
  const [loyaltyPopup, setLoyaltyPopup] = useState(false);

  useEffect(() => {
    if (registrationNo == null) {
      dispatch({ type: 'SET_REGISTRATION_NO', payload: Math.random().toString(36).slice(2, 10).toUpperCase() });
    }
  }, [registrationNo, dispatch]);

  useFormVertigo(currentStep, dispatch, formRotation);

  const handleLoyaltyReset = useCallback(() => {
    dispatch({ type: 'RESET_FORM' });
    dispatch({ type: 'SET_LOYALTY_STRIKES', payload: 0 });
    navigate('/form', { replace: true });
    window.location.reload();
  }, [dispatch, navigate]);

  useMouseLoyalty(
    () => setLoyaltyPopup(true),
    handleLoyaltyReset,
    loyaltyStrikes,
    dispatch
  );

  useEffect(() => {
    if (!startTime) {
      dispatch({ type: 'SET_START_TIME', payload: Date.now() });
    }
  }, [startTime, dispatch]);

  useEffect(() => {
    if (roulettePosition === null) {
      dispatch({
        type: 'SET_ROULETTE',
        payload: {
          position: getRandomRoulettePosition(),
          question: getRandomRouletteQuestion(),
        },
      });
    }
  }, [roulettePosition, dispatch]);

  const style = {
    transform: formRotation ? `rotate(${formRotation}deg)` : undefined,
    opacity: characterClass === 'mage' ? 0.4 : undefined,
    fontWeight: characterClass === 'warrior' ? 'bold' : undefined,
    textTransform: characterClass === 'warrior' ? 'uppercase' : undefined,
  };

  return (
    <div className="form-container-wrapper">
      {loyaltyStrikes > 0 && (
        <div className="loyalty-counter">
          Pelanggaran Loyalitas: {loyaltyStrikes}/3
        </div>
      )}
      {loyaltyPopup && (
        <div className="loyalty-popup" role="alert">
          <p>Anda terdeteksi melirik website lain. Kesetiaan Anda sedang dievaluasi.</p>
          <button type="button" onClick={() => setLoyaltyPopup(false)}>Tutup</button>
        </div>
      )}
      <SurveillancePopup active={currentStep >= 1 && currentStep <= 20} />
      <ProgressBarChaos currentStep={currentStep} totalSteps={TOTAL_STEPS} />
      <div className="form-container" style={style}>
        <div className="form-reg-no">No. Reg: {registrationNo || '—'}</div>
        {currentStep >= 15 && formRotation > 0 && (
          <p className="form-vertigo-msg">Jika Anda merasa pusing, itu normal. Birokrasi memang begitu.</p>
        )}
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
