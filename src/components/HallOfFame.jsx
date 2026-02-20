import { useNavigate } from 'react-router-dom';
import { getLastEntry, getLeaderboard } from '../utils/storage';
import { openCertificatePrint } from '../utils/certificate';
import './HallOfFame.css';

export default function HallOfFame() {
  const navigate = useNavigate();
  const entry = getLastEntry();
  const lb = getLeaderboard();
  const topTimes = lb?.topTimes ?? [];
  const firstClear = lb?.firstClear;

  const getGelar = (e) => {
    if (!e) return '';
    const min = e.timeMs / 60000;
    if (min < 5) return 'Speedrunner Birokrasi';
    if (min > 30) return 'Korban Birokrasi Bersertifikat';
    if (firstClear && e === firstClear) return 'Pahlawan Kesabaran Tanpa Tanda Jasa';
    return 'Aparatur Sipil Imajinasi (ASI)';
  };

  const formatTime = (ms) => {
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    return `${m} menit ${s} detik`;
  };

  return (
    <div className="hof">
      <div className="hof-watermark">DISETUJUI (MUNGKIN)</div>
      <div className="hof-card">
        <h1>Hall of Fame</h1>
        <p className="hof-subtitle">Selamat! Anda termasuk 5% yang berhasil.</p>

        {entry && (
          <div className="hof-result">
            <h2>Data Anda</h2>
            <table className="hof-table">
              <tbody>
                <tr><td>Username</td><td>{entry.username || '—'}</td></tr>
                <tr><td>Gelar Resmi</td><td>Aparatur Sipil Imajinasi (ASI)</td></tr>
                <tr><td>NIP</td><td>{entry.nip}</td></tr>
                <tr><td>Status Bantuan</td><td>{entry.status}</td></tr>
                <tr><td>Kelas Kesabaran</td><td>{entry.kelas}</td></tr>
                <tr><td>Gelar Spesial</td><td>{getGelar(entry)}</td></tr>
              </tbody>
            </table>
          </div>
        )}

        <div className="hof-leaderboard">
          <h2>Waktu Pengisian Tercepat — Top 10</h2>
          <ol className="hof-list">
            {topTimes.slice(0, 10).map((e, i) => (
              <li key={i}>{e.username} — {formatTime(e.timeMs)}</li>
            ))}
          </ol>
        </div>

        <div className="hof-actions">
          <button type="button" className="hof-cert" onClick={() => openCertificatePrint({ ...entry, regNo: Math.random().toString(36).slice(2, 10).toUpperCase() })}>
            Unduh / Cetak Sertifikat
          </button>
          <button type="button" className="hof-back" onClick={() => navigate('/')}>
            Kembali ke awal
          </button>
        </div>
      </div>
    </div>
  );
}
