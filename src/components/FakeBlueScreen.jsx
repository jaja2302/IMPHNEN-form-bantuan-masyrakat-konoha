import { useEffect } from 'react';
import './FakeBlueScreen.css';

export default function FakeBlueScreen() {
  useEffect(() => {
    const t = setTimeout(() => {}, 5000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fake-bsod">
      <div className="fake-bsod-content">
        <p className="fake-bsod-title">GOVERNMENT_PORTAL_EXCEPTION 0x00000BIROKRASI</p>
        <p>Kesalahan fatal terdeteksi pada formulir Anda.</p>
        <p>Kesalahan ini 100% ada di pihak Anda, bukan kami.</p>
        <p className="fake-bsod-progress">Mengumpulkan info kesalahan Anda... (██████░░░░) 60%</p>
      </div>
    </div>
  );
}
