# Kebijakan Keamanan

## Versi yang didukung

MotionFolio adalah proyek starter tahap awal. Perbaikan keamanan diterapkan pada cabang `main` terbaru dan rilis terbaru.

| Versi   | Didukung  |
| ------- | --------- |
| 0.1.x   | ✅        |

## API Key Frontend Terekspos ke Browser

Ini adalah catatan keamanan paling penting untuk proyek ini.

MotionFolio adalah **aplikasi single-page client-side** yang dibangun dengan Vite. Vite menyisipkan (inline) setiap variabel lingkungan yang berawalan `VITE_` (dan, dalam proyek ini, `REACT_APP_`) ke dalam **bundle JavaScript produksi**. Artinya:

- **Setiap kunci di file `.env` Anda akan dikirim ke browser** dan dapat dibaca oleh siapa saja yang membuka situs web Anda (melalui DevTools atau dengan membaca kode JS yang di-bundle).
- Panggilan langsung Cerebras di `src/services/cerebras.js` hanya untuk **tujuan demo**. Ini aman untuk pengembangan lokal dan demo cepat, tetapi **tidak aman untuk produksi** dengan API key pribadi/berbayar Anda.

### Jangan Mengekspos API Key di Kode Frontend

- Jangan pernah mengirimkan (commit) API key asli ke repositori Git Anda.
- Jangan pernah mengandalkan variabel `VITE_*` / `REACT_APP_*` untuk "menyembunyikan" rahasia — variabel tersebut tidak rahasia di sisi klien.
- Pastikan file `.env` tidak masuk ke version control (file ini sudah di-git-ignore secara default).

### Gunakan Proxy Server-Side / Serverless untuk API Key AI Provider

Untuk tahap produksi, pindahkan panggilan AI provider ke belakang backend yang Anda kontrol agar API key tetap menjadi **rahasia di sisi server (server-side secret)**:

```text
Browser (frontend)  ->  Rute API Serverless Anda  ->  AI Provider (Cerebras, dll)
                        (menyimpan secret key)
```

Fungsi serverless akan membaca kunci dari variabel lingkungan server-only (tanpa awalan `VITE_`/`REACT_APP_`), memanggil penyedia AI, dan mengalirkan (stream) respons kembali ke browser. Frontend kemudian memanggil endpoint Anda sendiri alih-alih memanggil penyedia secara langsung.

Lihat [docs/ai-terminal.md](docs/ai-terminal.md) untuk arsitektur yang direkomendasikan dan contoh proxy.

### Tips Pengerasan (Hardening) Lainnya

- Tambahkan pembatasan tingkat permintaan (rate limiting) dan perlindungan penyalahgunaan dasar pada setiap endpoint proxy yang Anda deploy.
- Batasi asal yang diizinkan (CORS) pada proxy Anda hanya ke domain Anda sendiri.
- Lakukan rotasi (ganti) pada kunci apa pun yang mungkin tidak sengaja ter-commit atau dikirimkan dalam bundle klien.
- Tetapkan batas pengeluaran / batas penggunaan di akun penyedia AI Anda.

## Melaporkan Kerentanan

Jika Anda menemukan kerentanan keamanan, mohon laporkan secara bertanggung jawab:

1. **Pilihan Utama:** buka GitHub issue di https://github.com/hery2606/Portfolio/issues. Untuk laporan sensitif, mohon hindari menyertakan detail eksploitasi di issue publik dan mintalah saluran kontak pribadi terlebih dahulu.
2. **Kontak Maintainer:** Anda juga dapat menghubungi maintainer melalui detail kontak yang tercantum pada situs web live / profil repositori.

Mohon sertakan:

- Deskripsi yang jelas tentang masalah dan dampaknya.
- Langkah-langkah untuk mereproduksi (bukti konsep / proof of concept jika memungkinkan).
- Versi/commit yang terdampak.

Kami akan mengonfirmasi laporan Anda, menyelidiki, dan berupaya memberikan perbaikan atau mitigasi secepat mungkin yang wajar untuk proyek komunitas. Mohon berikan kami waktu yang cukup untuk mengatasi masalah tersebut sebelum melakukan pengungkapan publik.
