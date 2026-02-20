import { useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../context/AppState';
import './LandingPage.css';

const TC_HEIGHT_PX = 10000;
const SECRET_OFFSET_PX = 6000;

export default function LandingPage() {
  const navigate = useNavigate();
  const { dispatch } = useAppState();
  const tcRef = useRef(null);
  const secretDetected = useRef(false);

  const onTCScroll = useCallback(() => {
    if (secretDetected.current) return;
    const el = tcRef.current;
    if (!el) return;
    const scrollTop = el.scrollTop;
    if (scrollTop >= SECRET_OFFSET_PX - 200) {
      secretDetected.current = true;
      dispatch({ type: 'SET_TC_SECRET_FOUND', payload: true });
    }
  }, [dispatch]);

  const handleAgree = () => {
    dispatch({ type: 'SET_AGREED_TO_TC', payload: true });
    navigate('/form');
  };

  const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. `.repeat(80);

  return (
    <div className="landing">
      <div className="landing-watermark">DOKUMEN SANGAT TIDAK RAHASIA</div>
      <header className="landing-header">
        <div className="landing-logo">🦅</div>
        <h1>Portal Resmi Bantuan Eksistensi</h1>
        <p className="landing-subtitle">Negara Konoha — Kementerian Formulir & Antrean</p>
      </header>

      <div className="landing-disclaimer">
        Portal ini tidak mengumpulkan data pribadi karena kami juga tidak peduli. Semua data bersifat anonym dan fiktif.
      </div>

      <div className="landing-tc-wrapper">
        <p className="landing-tc-title">Persyaratan dan Ketentuan (harap dibaca hingga selesai)</p>
        <div
          ref={tcRef}
          className="landing-tc-scroll"
          onScroll={onTCScroll}
          style={{ height: '60vh', overflow: 'auto' }}
        >
          <div className="landing-tc-inner" style={{ height: TC_HEIGHT_PX }}>
            <section style={{ padding: '1rem 2rem' }}>
              <h2>1. Umum</h2>
              <p>{lorem}</p>
            </section>
            <section style={{ padding: '1rem 2rem', marginTop: 200 }}>
              <h2>2. Hak dan Kewajiban</h2>
              <p>{lorem}</p>
            </section>
            <section style={{ padding: '1rem 2rem', marginTop: 200 }}>
              <h2>3. Ketentuan Khusus</h2>
              <p>{lorem}</p>
            </section>
            <section
              className="landing-tc-secret"
              style={{
                position: 'absolute',
                top: SECRET_OFFSET_PX,
                left: '2rem',
                right: '2rem',
                padding: '1rem',
                background: 'rgba(198, 168, 75, 0.15)',
                borderLeft: '4px solid var(--emas-birokrasi)',
              }}
            >
              <strong>Jika Anda membaca kalimat ini, ketik &quot;SAYA BACA&quot; di field nomor 7.</strong>
            </section>
            <section style={{ padding: '1rem 2rem', marginTop: 2400 }}>
              <h2>4. Penutup</h2>
              <p>{lorem}</p>
            </section>
          </div>
        </div>
        <button type="button" className="landing-btn" onClick={handleAgree}>
          Saya setuju dan akan mengisi formulir
        </button>
      </div>

      <footer className="landing-footer">
        Kalau Bisa Dipersulit, Kenapa Harus Dipermudah? — Kementerian Formulir & Antrean, Negara Konoha
      </footer>
    </div>
  );
}
