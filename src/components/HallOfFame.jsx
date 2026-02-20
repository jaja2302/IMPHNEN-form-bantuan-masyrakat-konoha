import { useNavigate } from 'react-router-dom';
import './HallOfFame.css';

export default function HallOfFame() {
  const navigate = useNavigate();

  return (
    <div className="hof">
      <div className="hof-watermark">DISETUJUI (MUNGKIN)</div>
      <div className="hof-card">
        <h1>Hall of Fame</h1>
        <p>Selamat! Anda termasuk 5% yang berhasil.</p>
        <p className="hof-placeholder">(Data pemenang dan sertifikat akan ditampilkan di sini setelah Fase 4.)</p>
        <button type="button" className="hof-back" onClick={() => navigate('/')}>
          Kembali ke awal
        </button>
      </div>
    </div>
  );
}
