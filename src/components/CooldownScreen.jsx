import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBlockUntil, isBlocked, applyBandingPenalty, extendBlockByOneHour } from '../utils/storage';
import './CooldownScreen.css';

export default function CooldownScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isBlocked()) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    const onBeforeUnload = () => {
      if (isBlocked()) extendBlockByOneHour();
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, []);

  const until = getBlockUntil();
  const message = until
    ? `Pemerintah sedang sibuk mempertimbangkan keberadaan Anda. Harap coba lagi setelah ${until.toLocaleString('id-ID')}.`
    : '';

  const handleBanding = () => {
    applyBandingPenalty();
    alert('Banding Anda telah diterima dan langsung ditolak. Masa tunggu diperpanjang sebagai tanda terima kasih.');
  };

  return (
    <div className="cooldown">
      <div className="cooldown-watermark">DOKUMEN SANGAT TIDAK RAHASIA</div>
      <div className="cooldown-card">
        <h1>Akses Dibatasi</h1>
        <p className="cooldown-message">{message}</p>
        <p className="cooldown-sub">Ketidaksabaran Anda telah dicatat dalam arsip negara.</p>
        <button type="button" className="cooldown-banding" onClick={handleBanding}>
          Ajukan Banding
        </button>
        <p className="cooldown-warn">(Mengklik tombol di atas akan memperpanjang masa tunggu menjadi 7 hari.)</p>
      </div>
    </div>
  );
}
