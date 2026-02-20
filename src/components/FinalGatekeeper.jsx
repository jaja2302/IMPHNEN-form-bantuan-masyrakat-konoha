import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../context/AppState';
import { saveToLeaderboard } from '../utils/storage';
import './FinalGatekeeper.css';

const HOVER_MS = 60000;

function removeVowels(s) {
  return (s || '').replace(/[aeiouAEIOU]/g, '');
}

function randomNIP18() {
  let n = '';
  for (let i = 0; i < 18; i++) n += Math.floor(Math.random() * 10);
  return n;
}

function getKelas(timeMs) {
  const min = timeMs / 60000;
  if (min < 5) return 'S';
  if (min > 30) return 'B';
  return 'A';
}

export default function FinalGatekeeper() {
  const navigate = useNavigate();
  const { dispatch, answers, startTime } = useAppState();
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
    const name = answers['q01'] || '';
    const timeMs = startTime ? Date.now() - startTime : 0;
    const entry = {
      username: removeVowels(name),
      name,
      nip: randomNIP18(),
      timeMs,
      kelas: getKelas(timeMs),
      status: 'Disetujui untuk dipertimbangkan di periode kepemimpinan berikutnya.',
    };
    saveToLeaderboard(entry);
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
      <p className="final-gatekeeper-touch">
        <button type="button" className="final-gatekeeper-touch-btn" onClick={handleRealSubmit}>
          Saya pakai perangkat sentuh — lanjut
        </button>
      </p>
    </div>
  );
}
