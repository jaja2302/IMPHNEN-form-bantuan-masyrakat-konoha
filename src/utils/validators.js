export function validateQ01NoVowel(value) {
  if (!value || typeof value !== 'string') return { ok: false };
  const vokal = /[aeiouAEIOU]/;
  if (vokal.test(value)) return { ok: false };
  return { ok: true };
}

export function validateQ02Date(value) {
  if (!value) return { ok: false, msg: 'Format terlalu kebarat-baratan.' };
  const parts = String(value).trim().split(/[/-]/);
  if (parts.length !== 3) return { ok: false, msg: 'Format terlalu kebarat-baratan.' };
  const [a, b, c] = parts.map((p) => parseInt(p, 10));
  if (isNaN(a) || isNaN(b) || isNaN(c)) return { ok: false, msg: 'Format terlalu kebarat-baratan.' };
  const isDDMM = a >= 1 && a <= 31 && b >= 1 && b <= 12;
  const isMMDD = b >= 1 && b <= 31 && a >= 1 && a <= 12;
  if (isMMDD && !isDDMM) return { ok: false, msg: 'Format terlalu kebarat-baratan.' };
  return { ok: true };
}

export function validateQ07Stars(value, tcSecretFound) {
  const v = Number(value);
  if (v !== 3) {
    if (v === 5) return { ok: false, msg: 'Penjilat terdeteksi.' };
    if (v === 1) return { ok: false, msg: 'Pembangkang terdeteksi.' };
    return { ok: false, msg: 'Hanya nilai tengah yang dapat diterima.' };
  }
  return { ok: true };
}

export function validateQ07SecretText(value, tcSecretFound) {
  if (tcSecretFound && (!value || !String(value).toUpperCase().includes('SAYA BACA'))) {
    return { ok: false, msg: 'Anda tidak membaca syarat dan ketentuan dengan lengkap.' };
  }
  return { ok: true };
}

export function validateQ08Lamborghini(value) {
  const v = (value || '').trim().toLowerCase();
  if (v !== 'belum punya') return { ok: false, msg: 'Anda tidak butuh bantuan.' };
  return { ok: true };
}

export function validateQ05Slider(value) {
  const n = Number(value);
  if (n === 100) return { ok: false, msg: 'Anda terlalu serakah.' };
  if (n === 0) return { ok: false, msg: 'Lalu ngapain daftar?' };
  if (n < 42 || n > 69) return { ok: false, msg: 'Nilai di luar rentang yang dapat diterima.' };
  return { ok: true };
}

export function validateQ06EvenTabs(value) {
  const n = parseInt(value, 10);
  if (isNaN(n) || n % 2 !== 0) return { ok: false, msg: 'Sistem butuh keseimbangan. Buka/tutup 1 tab lagi.' };
  return { ok: true };
}

export function validateQ11NoAtNoNumber(value) {
  if (!value) return { ok: false };
  if (/@/.test(value)) return { ok: false, msg: 'Jangan mention orang sembarangan.' };
  if (/\d/.test(value)) return { ok: false, msg: 'Anda bukan robot, kan?' };
  return { ok: true };
}

export function validateQ12CitaCita(value) {
  const v = (value || '').trim().toLowerCase();
  if (v.includes('kaya')) return { ok: false, msg: 'Terlalu realistis, mohon berimajinasi.' };
  if (v.includes('astronot')) return { ok: false, msg: 'Budget tidak mencukupi.' };
  return { ok: true };
}

export function validateQ18Password(value) {
  if (!value || value.length < 20) return { ok: false, msg: 'Minimal 20 karakter termasuk curhatan pribadi.' };
  if (!/[Ω∆☆]/.test(value)) return { ok: false, msg: 'Harus mengandung salah satu simbol: Ω, ∆, atau ☆.' };
  if (!/\d/.test(value)) return { ok: false, msg: 'Harus mengandung angka.' };
  return { ok: true };
}

export function validateQ19MatchPassword(confirm, password) {
  if (confirm !== password) return { ok: false, msg: 'Password tidak cocok.' };
  return { ok: true };
}

export function validateQ20ConfirmTheConfirm(typed, expected) {
  if (typed !== expected) return { ok: false };
  return { ok: true };
}
