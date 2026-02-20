export function generateCertificateHTML(entry) {
  const name = entry?.name || 'Peserta';
  const regNo = entry?.regNo || Math.random().toString(36).slice(2, 10).toUpperCase();
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Sertifikat Ketahanan Mental</title>
  <style>
    body { font-family: 'Times New Roman', serif; padding: 40px; max-width: 600px; margin: 0 auto; }
    .border { border: 4px double #c6a84b; padding: 30px; }
    h1 { text-align: center; font-size: 1.4rem; margin-bottom: 0; }
    h2 { text-align: center; font-size: 1rem; margin-top: 0.25rem; }
    .name { text-align: center; font-size: 1.2rem; font-weight: bold; margin: 1.5rem 0; }
    ul { margin: 1rem 0; }
    .footer { text-align: center; font-size: 0.85rem; margin-top: 1.5rem; }
    .reg { margin-top: 1rem; font-size: 0.8rem; color: #666; }
  </style>
</head>
<body>
  <div class="border">
    <h1>SERTIFIKAT KETAHANAN MENTAL</h1>
    <h2>Negara Konoha</h2>
    <p style="text-align:center;">═══════════════════════════════════════</p>
    <p>Dengan ini menyatakan bahwa:</p>
    <div class="name">${name}</div>
    <p>Telah berhasil menyelesaikan Portal Bantuan Eksistensi dan dinyatakan memiliki:</p>
    <ul>
      <li>Kesabaran di atas rata-rata nasional</li>
      <li>Terlalu banyak waktu luang</li>
      <li>Ketahanan mental yang dipertanyakan</li>
    </ul>
    <p><strong>Status: DISETUJUI UNTUK DIPERTIMBANGKAN</strong></p>
    <p>"Selamat! Anda punya terlalu banyak waktu luang." — Kepala Dinas Imajinasi</p>
    <p style="text-align:center;">═══════════════════════════════════════</p>
    <div class="reg">Nomor Registrasi: ${regNo}<br>Berlaku sampai: Entah kapan.</div>
  </div>
</body>
</html>`;
}

export function openCertificatePrint(entry) {
  const html = generateCertificateHTML(entry);
  const win = window.open('', '_blank');
  win.document.write(html);
  win.document.close();
  win.focus();
  setTimeout(() => {
    win.print();
  }, 500);
}
