const GENERAL_MESSAGES = [
  'Mohon maaf, tanda tangan digital Anda kurang ikhlas.',
  'Data Anda sedang diverifikasi oleh petugas yang sedang cuti.',
  'Sistem mendeteksi keraguan dalam jawaban Anda.',
  'Permintaan Anda telah masuk antrean nomor 47.291.',
  'Formulir Anda dinilai kurang bersyukur.',
];

const COOLDOWN_MESSAGES = [
  'Server sedang istirahat makan siang (12:00–16:00). Silakan coba di jam lembur.',
  'Ketidaksabaran Anda telah dicatat dalam arsip negara.',
  'Server mengalami krisis eksistensial. Mohon tunggu.',
];

export function getRandomGaslight() {
  return GENERAL_MESSAGES[Math.floor(Math.random() * GENERAL_MESSAGES.length)];
}

export function getRandomCooldownMessage() {
  return COOLDOWN_MESSAGES[Math.floor(Math.random() * COOLDOWN_MESSAGES.length)];
}
