import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './SurveillancePopup.css';

const MESSAGES = [
  '👁️ Petugas sedang mengawasi sesi Anda...',
  '📡 Aktivitas Anda sedang direkam untuk keperluan audit imajiner.',
  '🔍 Departemen Kecurigaan telah menerima laporan tentang Anda.',
];

const MIN_INTERVAL_MS = 30000;
const MAX_INTERVAL_MS = 60000;
const SHOW_DURATION_MS = 3000 + Math.random() * 2000;

export default function SurveillancePopup({ active }) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!active) return;
    let hideId;
    let nextId;
    const show = () => {
      setMessage(MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
      setVisible(true);
      hideId = setTimeout(() => {
        setVisible(false);
        nextId = setTimeout(show, MIN_INTERVAL_MS + Math.random() * (MAX_INTERVAL_MS - MIN_INTERVAL_MS));
      }, SHOW_DURATION_MS);
    };
    nextId = setTimeout(show, MIN_INTERVAL_MS + Math.random() * (MAX_INTERVAL_MS - MIN_INTERVAL_MS));
    return () => {
      clearTimeout(nextId);
      clearTimeout(hideId);
    };
  }, [active]);

  if (!visible) return null;

  return createPortal(
    <div className="surveillance-popup">
      <p className="surveillance-message">{message}</p>
      <div className="surveillance-dots">
        <span /> <span /> <span />
      </div>
    </div>,
    document.body
  );
}
