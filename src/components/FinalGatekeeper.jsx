import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../context/AppState';
import './FinalGatekeeper.css';

const HOVER_MS = 60000;

export default function FinalGatekeeper() {
  const navigate = useNavigate();
  const { dispatch } = useAppState();
  const [confirmStep, setConfirmStep] = useState(0);
  const [hoverProgress, setHoverProgress] = useState(0);
  const hoverStart = useRef(null);
  const hoverInterval = useRef(null);

  const handleFakeSubmit = () => {
    if (confirmStep === 0) {
      setConfirmStep(1);
      return;
    }
    if (confirmStep === 1) {
      setConfirmStep(2);
      return;
    }
    if (confirmStep === 2) {
      dispatch({ type: 'RESET_FORM' });
      setConfirmStep(0);
      window.location.href = '/form';
    }
  };

  const handleRealSubmit = () => {
    navigate('/hall-of-fame');
  };

  const handleMouseEnter = () => {
    hoverStart.current = Date.now();
    hoverInterval.current = setInterval(() => {
      const elapsed = Date.now() - hoverStart.current;
      setHoverProgress(Math.min(100, (elapsed / HOVER_MS) * 100));
      if (elapsed >= HOVER_MS) {
        clearInterval(hoverInterval.current);
      }
    }, 200);
  };

  const handleMouseLeave = () => {
    if (hoverInterval.current) clearInterval(hoverInterval.current);
    hoverStart.current = null;
    setHoverProgress(0);
  };

  const canSubmit = hoverProgress >= 100;

  return (
    <div className="final-gatekeeper">
      <h2>Langkah Terakhir</h2>
      {confirmStep === 0 && (
        <>
          <p>Klik tombol SUBMIT untuk mengirim formulir.</p>
          <button type="button" className="final-gatekeeper-fake" onClick={handleFakeSubmit}>
            SUBMIT
          </button>
        </>
      )}
      {confirmStep === 1 && (
        <>
          <p>Apakah Anda yakin?</p>
          <button type="button" className="final-gatekeeper-fake" onClick={handleFakeSubmit}>
            Ya
          </button>
        </>
      )}
      {confirmStep === 2 && (
        <>
          <p>Yakin yakin?</p>
          <button type="button" className="final-gatekeeper-fake" onClick={handleFakeSubmit}>
            Ya
          </button>
        </>
      )}
      <p className="final-gatekeeper-hint">Uji ketenangan sedang berlangsung... jangan bergerak.</p>
      <button
        type="button"
        className="final-gatekeeper-submit"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={canSubmit ? handleRealSubmit : undefined}
        disabled={!canSubmit}
        title={canSubmit ? 'Klik untuk kirim' : 'Diam di atas tombol 60 detik'}
      >
        {canSubmit ? 'Tidak, saya menyerah' : `Tidak, saya menyerah (${Math.round(hoverProgress)}%)`}
      </button>
    </div>
  );
}
