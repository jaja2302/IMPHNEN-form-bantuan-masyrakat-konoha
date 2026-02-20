# Portal Bantuan Eksistensi — Negara Konoha

Aplikasi web satire birokrasi: form pendaftaran dengan 20 soal absurd dan berbagai mekanisme "ujian kesabaran". Dibangun dengan **Vite + React (JSX)**.

**Motto:** *"Kalau Bisa Dipersulit, Kenapa Harus Dipermudah?"*

## Cara Menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:5173

Build produksi:

```bash
npm run build
npm run preview
```

## Fitur Utama

- **Landing & T&C:** Halaman awal bergaya portal resmi, syarat dan ketentuan scroll panjang dengan kalimat tersembunyi.
- **20 Soal:** Validasi absurd (nama tanpa vokal, tanggal format “salah”, slider sweet spot 42–69, checkbox lari, captcha “rasa rindu”, password dengan simbol aneh, dll.).
- **Mekanisme tambahan:** Blokir setelah 3x gagal validasi, denda refresh saat cooldown, mouse loyalty (keluar jendela 3x = reset), progress bar yang kadang mundur/stuck, form miring dari soal 15, surveillance popup acak, BSOD palsu di soal 18, tombol submit harus diam 60 detik + jebakan reverse psychology.
- **Hall of Fame:** Data pemenang, leaderboard waktu tercepat, sertifikat (cetak/PDF).

## Struktur

- `src/App.jsx` — Routing (Landing, Form, Cooldown, Hall of Fame).
- `src/context/AppState.jsx` — State global (step, answers, blokir, loyalty, dll.).
- `src/components/` — Landing, FormContainer, 20 soal, RunawayCheckbox, CaptchaEstetik, FakeBlueScreen, SurveillancePopup, ProgressBarChaos, FinalGatekeeper, CooldownScreen, HallOfFame.
- `src/hooks/` — useMouseLoyalty, useTypingSpeed, useFormVertigo, useHiddenTimer, useSoundEffects.
- `src/utils/` — storage (localStorage), validators, gaslighting, rouletteQuestions, certificate.

## Catatan

- Portal ini **satire**; tidak mengumpulkan data sensitif (no KTP/NIK/foto).
- Beberapa mekanisme (mouse loyalty, hover 60 detik) kurang cocok untuk touch; di mobile bisa di-skip atau diganti long-press.
- Data blokir, cooldown, dan leaderboard disimpan di `localStorage`.

---

*Kementerian Formulir & Antrean, Negara Konoha*
