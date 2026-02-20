import { useNavigate } from 'react-router-dom';
import './FinalGatekeeper.css';

export default function FinalGatekeeper({ onSuccess }) {
  const navigate = useNavigate();

  const handleRealSubmit = () => {
    navigate('/hall-of-fame');
  };

  return (
    <div className="final-gatekeeper">
      <h2>Langkah Terakhir</h2>
      <p>Klik tombol di bawah untuk mengirim formulir.</p>
      <button type="button" className="final-gatekeeper-submit" onClick={handleRealSubmit}>
        Tidak, saya menyerah
      </button>
    </div>
  );
}
