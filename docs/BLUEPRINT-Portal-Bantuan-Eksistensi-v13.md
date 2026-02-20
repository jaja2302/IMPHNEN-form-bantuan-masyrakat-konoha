# 📑 Blue-Print Proyek: Portal Resmi Bantuan Eksistensi

**Versi:** 13.0.0 (Negara Konoha — Edisi Revisi Menyeluruh)  
**Stack:** Vite + React (JSX) — Single Page Application  
**Tujuan:** Satire Birokrasi, Uji Kesabaran, & Filter Manusia 5% Terpilih.  
**Motto Footer:** *"Kalau Bisa Dipersulit, Kenapa Harus Dipermudah?"*

---

## 🎯 1. Konsep Utama

**Tema:** Sistem yang terlihat formal dan terpercaya, tapi memiliki logika absurd dan jebakan tersembunyi di setiap sudut.

**Vibe Visual:**
- Tampilan bersih, biru tua / abu-abu / emas — mirip portal pemerintah sungguhan.
- Font serif untuk heading (kesan resmi), sans-serif untuk body.
- Logo garuda versi parodi (burung bingung memegang stempel).
- Watermark transparan: *"DOKUMEN SANGAT TIDAK RAHASIA"*.

**Misi User:** Berhasil mengisi 20 soal + melewati semua jebakan → masuk Hall of Fame.

**Tingkat Kesulitan:** Hanya ~5% user yang bisa lolos.

---

## 🧠 2. Mekanisme Sistem "Gila"

### 2.1 Anti-Ambis (IP Block)
- Gagal validasi **3x** → IP user diblokir.
- Pesan: *"Pemerintah sedang sibuk mempertimbangkan keberadaan Anda. Harap coba lagi dalam 3×24 jam."*
- Implementasi: `localStorage` counter + timestamp.

### 2.2 Denda Refresh
- Setiap kali user refresh saat masa hukuman → timer cooldown **+1 jam**.
- Pesan: *"Ketidaksabaran Anda telah dicatat dalam arsip negara."*

### 2.3 No-Sensitive Data
- Tidak meminta KTP / NIK / foto wajah.
- Semua data bersifat **anonim dan fiktif**.
- Disclaimer di atas form: *"Portal ini tidak mengumpulkan data pribadi karena kami juga tidak peduli."*

### 2.4 Timer Tersembunyi
- Beberapa field harus diisi **< 10 detik** atau form reset ke soal nomor 1.
- Tidak ada indikasi timer — user harus "merasakan" urgensinya.

### 2.5 The Final Gatekeeper
- Tombol submit hanya aktif setelah kursor **diam di atasnya selama 60 detik**.
- Jika kursor bergerak sedikit pun → reset timer.
- Pesan saat hover: *"Uji ketenangan sedang berlangsung... jangan bergerak."*

---

## 🆕 3. Mekanisme Baru (v13)

### 3.1 🐭 Mouse Loyalty Test
- Jika kursor **keluar dari area form** (mouseout pada window) → popup:
  *"Anda terdeteksi melirik website lain. Kesetiaan Anda sedang dievaluasi."*
- Keluar **3x** → form di-reset total.
- Counter ditampilkan kecil di pojok: *"Pelanggaran Loyalitas: 1/3"*

### 3.2 ⌨️ Patriotic Typing Speed
- Jika user mengetik **> 5 karakter/detik** → field dikunci 10 detik.
- Pesan: *"Kecepatan mengetik Anda mencurigakan. Anda bot atau mata-mata negara tetangga?"*
- Implementasi: track `keydown` timestamps, hitung rate per detik.

### 3.3 📊 Existential Progress Bar
- Progress bar di atas form, tapi:
  - Kadang **mundur** sendiri 5-10%.
  - Stuck di **99%** selama 30 detik.
  - Loncat dari 40% ke 12% dengan pesan: *"Antrean Anda digeser oleh pejabat."*
- Angka persen tidak selalu sinkron dengan jumlah soal selesai.

### 3.4 🔊 Sound Design Mental
- **Error** → suara stempel "DITOLAK" (thunk keras).
- **Field berhasil** → suara ketikan mesin tik jadul.
- **Submit final** → paduan suara epic 2 detik → cut ke suara jangkrik.
- **Cooldown** → musik hold call center, monoton, lo-fi.
- Implementasi: Tone.js atau file audio pendek (base64 embedded).

### 3.5 🌀 Form Vertigo
- Mulai dari soal ke-15, seluruh form container **miring 2 derajat** (`transform: rotate(2deg)`).
- Setiap scroll → tambah 0.5 derajat (max 8 derajat).
- Pesan kecil di pojok: *"Jika Anda merasa pusing, itu normal. Birokrasi memang begitu."*

### 3.6 👁️ Surveillance Mode
- Setiap 30-60 detik (random), popup muncul:
  - *"👁️ Petugas sedang mengawasi sesi Anda..."*
  - *"📡 Aktivitas Anda sedang direkam untuk keperluan audit imajiner."*
  - *"🔍 Departemen Kecurigaan telah menerima laporan tentang Anda."*
- Loading dots animasi 3-5 detik → hilang sendiri. Tidak melakukan apa-apa.

### 3.7 🎰 Roulette Field (Soal Bonus Acak)
- Satu soal random muncul di posisi acak (antara soal 5-18), berubah setiap session:
  - *"Sebutkan nama ikan favorit presiden."*
  - *"Berapa jumlah ubin di rumah Anda?"*
  - *"Tuliskan bunyi klakson motor Anda dalam huruf."*
  - *"Siapa yang menang jika semut berkelahi dengan capung?"*
- Apapun jawabannya diterima, tapi dengan komentar pasif-agresif.

### 3.8 📋 Terms & Conditions dari Neraka
- Sebelum mulai form: scroll agreement **sepanjang 10.000px**.
- Di tengah-tengah (sekitar pixel ke-6.000) ada kalimat tersembunyi:
  *"Jika Anda membaca kalimat ini, ketik 'SAYA BACA' di field nomor 7."*
- Jika user tidak mengetik itu di soal 7 → form **ditolak di akhir** tanpa penjelasan jelas.

### 3.9 ⏪ Reverse Psychology Submit
- Klik tombol "SUBMIT" pertama kali → *"Apakah Anda yakin?"*
- Klik "Ya" → *"Yakin yakin?"*
- Klik "Ya" → *"Kami tidak percaya Anda yakin."* → Form di-reset.
- **Tombol yang benar** ternyata teks kecil abu-abu di pojok bawah: *"Tidak, saya menyerah"*

### 3.10 💀 Fake Blue Screen
- Di soal ke-18, layar tiba-tiba berubah **biru BSOD** selama 5 detik:
  ```
  GOVERNMENT_PORTAL_EXCEPTION 0x00000BIROKRASI
  
  Kesalahan fatal terdeteksi pada formulir Anda.
  Kesalahan ini 100% ada di pihak Anda, bukan kami.
  
  Mengumpulkan info kesalahan Anda... (██████░░░░) 60%
  ```
- Hilang setelah 5 detik, form tetap aman. Murni bikin panik.

---

## 📝 4. Struktur 20 Soal Pendaftaran

| No | Field | Trick / Validasi Absurd |
|----|-------|------------------------|
| 1 | **Nama Samaran** | Vokal-less: Gak boleh ada huruf vokal (A/I/U/E/O). Contoh: Bambang → Bmbng. |
| 2 | **Tanggal Lahir** | Format MM/DD/YYYY. Jika user patuh → *"Format terlalu kebarat-baratan."* Yang benar: DD/MM/YYYY tapi tidak diberitahu. |
| 3 | **Jenis Kelamin** | Upload foto **benda** yang mewakili gender. Misal: Obeng / Lipstik / Panci. (Simulasi: pilih dari galeri absurd.) |
| 4 | **Status Sosial** | Dropdown: "Rakyat Jelata", "NPC", "Sultan (Maintenance)", "Error 404: Status Not Found". |
| 5 | **Tingkat Kebutuhan** | Slider 0–100. Jika 100 → *"Anda terlalu serakah."* Jika 0 → *"Lalu ngapain daftar?"* Sweet spot: 42–69. |
| 6 | **Jumlah Tab Browser** | Harus angka **genap**. Ganjil → *"Sistem butuh keseimbangan. Buka/tutup 1 tab lagi."* |
| 7 | **Kepuasan terhadap Negara** | Skala 1–5 bintang. ⭐5 = *"Penjilat terdeteksi."* ⭐1 = *"Pembangkang terdeteksi."* ⭐3 = satu-satunya yang diterima. JUGA: harus berisi "SAYA BACA" jika user baca T&C (lihat 3.8). |
| 8 | **Warna Lamborghini Anda** | Wajib diisi meskipun gak punya. Jawaban benar: *"Belum punya"*. Jawaban lain → *"Anda tidak butuh bantuan."* |
| 9 | **Sumber Informasi** | Pilihan: "Mimpi Semalam", "Grup WA Hoax", "Bisikan Gaib", "Perintah Atasan". |
| 10 | **Checkbox Persetujuan** | Kotak checklist **lari-lari** menghindar saat kursor mendekat. Harus "ditangkap" dengan klik presisi. |
| 11 | **Username Medsos** | Dilarang pakai simbol `@`. Error: *"Jangan mention orang sembarangan."* Juga dilarang angka → *"Anda bukan robot, kan?"* |
| 12 | **Cita-cita Waktu Kecil** | Jika isi "Kaya" → *"Terlalu realistis, mohon berimajinasi."* Jika isi "Astronot" → *"Budget tidak mencukupi."* |
| 13 | **Menu Makan Siang** | Jika isi "Mie Instan" → *"Semangat ya pejuang bantuan! 💪"* Jika isi steak/sushi → *"Anda yakin butuh bantuan?"* |
| 14 | **Persen Kesabaran** | Jika > 90% → sistem kasih **Loading Palsu 15 detik** untuk ngetes. Jika < 10% → *"Kami kagum Anda sampai sini."* |
| 15 | **Nama Guru SD** | Apapun isinya → *"Salah. Beliau tidak mengenal Anda."* (Tapi bisa lanjut.) |
| 16 | **Pilih Karakter** | **Mage** → form jadi semi-transparan (opacity 0.4). **Warrior** → font jadi bold semua + CAPSLOCK. Efek berlaku sampai akhir. |
| 17 | **Captcha Estetik** | *"Pilih gambar yang mengandung rasa rindu."* Grid 9 gambar: senja, hujan, kursi kosong, mantan, mie instan, dll. Jawaban benar: **mie instan** (karena rindu masa kecil). |
| 18 | **Password** | Harus mengandung: 1 simbol khusus (Ω, ∆, atau ☆), 1 angka, dan **minimal 1 curhatan pribadi** (min 20 karakter). ⚠️ BSOD palsu muncul saat mulai ketik (lihat 3.10). |
| 19 | **Confirm Password** | Copy-paste **di-disable**. Harus ketik ulang manual karakter per karakter. |
| 20 | **Confirm the Confirm** | Field **transparan** (text color = background color). User harus ngetik tanpa melihat apa yang muncul. Satu typo = reset ke soal 19. |

---

## 🚩 5. Pesan Error & Gaslighting

Sistem secara random memilih dari pool pesan berikut:

**Gagal Validasi Umum:**
- *"Mohon maaf, tanda tangan digital Anda kurang ikhlas."*
- *"Data Anda sedang diverifikasi oleh petugas yang sedang cuti."*
- *"Sistem mendeteksi keraguan dalam jawaban Anda."*
- *"Permintaan Anda telah masuk antrean nomor 47.291."*
- *"Formulir Anda dinilai kurang bersyukur."*

**Cooldown / Blokir:**
- *"Server sedang istirahat makan siang (12:00–16:00). Silakan coba di jam lembur."*
- *"Ketidaksabaran Anda telah dicatat dalam arsip negara."*
- *"Server mengalami krisis eksistensial. Mohon tunggu."*

**Tombol Banding:**
- Muncul setelah blokir, tapi mengkliknya → **menambah masa blokir jadi 7 hari**.
- Pesan: *"Banding Anda telah diterima dan langsung ditolak. Masa tunggu diperpanjang sebagai tanda terima kasih."*

---

## 🏆 6. Ending: Hall of Fame (The 5% Elite)

Jika user berhasil melewati semua rintangan:

### Layar Kemenangan
- Confetti animasi + suara paduan suara 2 detik → jangkrik.
- Background: emas gradien dengan watermark stempel "DISETUJUI (MUNGKIN)".

### Data Ditampilkan
| Field | Value |
|-------|-------|
| Username | Versi tanpa vokal dari Nama Samaran |
| Gelar Resmi | **Aparatur Sipil Imajinasi (ASI)** |
| NIP | Random 18 digit |
| Status Bantuan | *"Disetujui untuk dipertimbangkan di periode kepemimpinan berikutnya."* |
| Kelas Kesabaran | S / A / B (berdasarkan waktu pengisian) |

### Leaderboard
- **Waktu Pengisian Tercepat** — Top 10.
- **Jumlah Rage-Quit Terbanyak** — Hall of Shame.
- **Gelar Spesial:**
  - ⏱️ < 5 menit → *"Speedrunner Birokrasi"*
  - 😤 > 30 menit → *"Korban Birokrasi Bersertifikat"*
  - 🏅 Pertama kali lolos → *"Pahlawan Kesabaran Tanpa Tanda Jasa"*

### Sertifikat Unduh
- Tombol "Unduh Sertifikat" → file PDF/gambar berisi:
  ```
  ═══════════════════════════════════════
         SERTIFIKAT KETAHANAN MENTAL
              Negara Konoha
  ═══════════════════════════════════════
  
  Dengan ini menyatakan bahwa:
  
         [ Nama Samaran User ]
  
  Telah berhasil menyelesaikan Portal Bantuan
  Eksistensi dan dinyatakan memiliki:
  
  ✓ Kesabaran di atas rata-rata nasional
  ✓ Terlalu banyak waktu luang
  ✓ Ketahanan mental yang dipertanyakan
  
  Status: DISETUJUI UNTUK DIPERTIMBANGKAN
  
  "Selamat! Anda punya terlalu banyak
   waktu luang." — Kepala Dinas Imajinasi
  
  ═══════════════════════════════════════
  Nomor Registrasi: [random]
  Berlaku sampai: Entah kapan.
  ═══════════════════════════════════════
  ```

---

## 🛠️ 7. Tech Stack & Struktur File

```
portal-bantuan-eksistensi/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── favicon.ico          # Ikon stempel
├── src/
│   ├── main.jsx              # Entry point
│   ├── App.jsx               # Root component + routing
│   ├── styles/
│   │   └── globals.css       # CSS variables, fonts, base styles
│   ├── components/
│   │   ├── LandingPage.jsx           # Halaman awal + T&C neraka
│   │   ├── FormContainer.jsx         # Wrapper form + progress bar
│   │   ├── questions/
│   │   │   ├── Q01_NamaSamaran.jsx
│   │   │   ├── Q02_TanggalLahir.jsx
│   │   │   ├── ...                   # Q03 - Q20
│   │   │   └── QuestionRouter.jsx    # Render soal berdasarkan step
│   │   ├── RunawayCheckbox.jsx       # Checkbox yang lari-lari
│   │   ├── CaptchaEstetik.jsx        # Grid gambar rindu
│   │   ├── FakeBlueScreen.jsx        # BSOD overlay
│   │   ├── SurveillancePopup.jsx     # Popup pengawasan random
│   │   ├── ProgressBarChaos.jsx      # Progress bar yang bohong
│   │   ├── FinalGatekeeper.jsx       # Tombol submit 60 detik
│   │   ├── HallOfFame.jsx            # Leaderboard + sertifikat
│   │   └── CooldownScreen.jsx        # Layar blokir IP
│   ├── hooks/
│   │   ├── useMouseLoyalty.js        # Deteksi kursor keluar
│   │   ├── useTypingSpeed.js         # Monitor kecepatan ketik
│   │   ├── useFormVertigo.js         # Rotasi form progresif
│   │   ├── useHiddenTimer.js         # Timer tersembunyi per field
│   │   └── useSoundEffects.js        # Tone.js / audio management
│   ├── utils/
│   │   ├── gaslighting.js            # Pool pesan error random
│   │   ├── rouletteQuestions.js      # Soal acak
│   │   ├── validators.js             # Logika validasi tiap soal
│   │   └── storage.js                # localStorage helper (IP block, dll)
│   └── assets/
│       ├── captcha-images/           # 9 gambar untuk captcha estetik
│       └── sounds/                   # Sound effect files
└── README.md
```

---

## 🎨 8. Panduan Visual

### Palet Warna
| Nama | Hex | Kegunaan |
|------|-----|----------|
| Biru Pemerintah | `#1a365d` | Header, sidebar, tombol utama |
| Biru Sedang | `#2b6cb0` | Hover states, link |
| Emas Birokrasi | `#c6a84b` | Aksen, border sertifikat, highlight |
| Merah Stempel | `#9b2c2c` | Error messages, pesan ditolak |
| Abu Formulir | `#f0f2f5` | Background utama |
| Putih Bersih | `#ffffff` | Card form |

### Tipografi
- **Heading:** Serif (misalnya Playfair Display / Merriweather) — kesan resmi.
- **Body:** Sans-serif (misalnya Source Sans Pro / Work Sans) — mudah dibaca.
- **Monospace:** Untuk field password & kode (Fira Code / JetBrains Mono).

### Elemen Dekoratif
- Watermark diagonal: *"DOKUMEN SANGAT TIDAK RAHASIA"*
- Nomor registrasi random di pojok kanan atas setiap halaman.
- Stempel merah "DITOLAK" yang muncul saat error (animasi stamp-down).
- Border emas ganda pada sertifikat Hall of Fame.

---

## ⚡ 9. State Management

```
AppState = {
  currentStep: 1..20,
  answers: { [questionId]: value },
  failCount: 0,            // Maks 3 sebelum blokir
  isBlocked: false,
  blockUntil: timestamp,
  refreshPenalty: 0,        // Jam tambahan
  loyaltyStrikes: 0,        // Mouse keluar (maks 3)
  characterClass: null,     // "mage" | "warrior"
  formRotation: 0,          // Derajat vertigo
  tcSecretFound: false,     // User baca T&C tersembunyi?
  startTime: timestamp,     // Untuk leaderboard
  soundEnabled: true,
}
```

---

## 📐 10. Flow Diagram

```
[Landing Page]
      │
      ▼
[Terms & Conditions (10.000px scroll)]
      │ ── (kalimat tersembunyi di tengah)
      ▼
[Form Soal 1-20]
      │
      ├── Setiap soal: validasi absurd
      ├── Random: surveillance popup
      ├── Random: roulette question muncul
      ├── Soal 15+: form mulai miring
      ├── Soal 18: BSOD palsu
      │
      ▼
[Final Gatekeeper - Tombol Diam 60 detik]
      │
      ├── Klik "Submit" → jebakan reverse psychology
      ├── Klik "Saya menyerah" → actually submit
      │
      ▼
[Hall of Fame / Sertifikat]
```

---

## 🗓️ 11. Milestone Development

| Fase | Durasi | Deliverable |
|------|--------|-------------|
| **Fase 1 — Fondasi** | 1-2 hari | Setup Vite, routing, landing page, T&C, struktur form |
| **Fase 2 — 20 Soal** | 2-3 hari | Semua komponen soal + validasi absurd |
| **Fase 3 — Mekanisme Gila** | 2-3 hari | Mouse loyalty, typing speed, vertigo, surveillance, BSOD, sound |
| **Fase 4 — Ending** | 1 hari | Hall of Fame, leaderboard (localStorage), sertifikat |
| **Fase 5 — Polish** | 1 hari | Animasi, responsive, testing jebakan, fine-tune timing |

**Total estimasi: ~7-10 hari** (solo developer santai).

---

## 💡 12. Catatan Penting

1. **Aksesibilitas Humor:** Portal ini **100% satire**. Tidak ada data sensitif yang dikumpulkan.
2. **Mobile Support:** Beberapa mekanisme (mouse loyalty, hover 60 detik) perlu adaptasi untuk touch device — bisa diganti dengan long-press atau gyroscope tilt.
3. **Persistensi:** Gunakan `localStorage` untuk IP block, cooldown, dan leaderboard. Bisa upgrade ke backend sederhana (Firebase/Supabase) kalau mau leaderboard global.
4. **Performance:** Sound effects bisa di-lazy-load. BSOD dan surveillance popup render via portal (React Portal) agar tidak ganggu DOM form.
5. **Share-ability:** Tambahkan tombol screenshot/share hasil Hall of Fame untuk viralitas.

---

> *"Data Anda kami kelola dengan prinsip: Kalau Bisa Dipersulit, Kenapa Harus Dipermudah?"*  
> — **Kementerian Formulir & Antrean, Negara Konoha**
