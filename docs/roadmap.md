# Peta Jalan (Roadmap)

Ini adalah daftar rencana peningkatan untuk MotionFolio yang diperbarui secara dinamis. Daftar ini juga berfungsi sebagai backlog untuk GitHub issues yang siap dikerjakan. Kontribusi sangat diharapkan — lihat [`CONTRIBUTING.md`](../CONTRIBUTING.md). Setiap item di bawah ini dapat dibuka sebagai issue menggunakan [templat permintaan fitur](../.github/ISSUE_TEMPLATE/feature_request.md).

## Rencana (Planned)

### Menambahkan mode templat dengan data contoh (sample data)
Menambahkan sakelar (seperti flag env atau switch import) sehingga aplikasi dapat dirender menggunakan data generik [`examplePortfolioData.js`](../src/data/examplePortfolioData.js) alih-alih konten asli Anda. Ini memudahkan pratinjau starter dan pengembangan tanpa mengekspos data pribadi.
- Kriteria Penerimaan: Satu sakelar dapat mengubah situs web live antara data asli dan data contoh.

### Menambahkan beberapa preset tema warna
Menyediakan beberapa pilihan warna/font siap pakai (misalnya "lime/black", "midnight", "paper") yang dapat dipilih dari satu tempat (konfigurasi Tailwind + variabel CSS di `src/index.css`).
- Kriteria Penerimaan: Mengubah satu nilai preset akan mengatur ulang gaya seluruh situs.

### Meningkatkan dukungan `prefers-reduced-motion`
Melakukan audit terhadap setiap animasi (pembantu GSAP, hero, marquee, galeri, kursor, preloader) dan memastikan masing-masing memiliki jalur alternatif untuk reduced-motion. Dokumentasikan polanya.
- Kriteria Penerimaan: Ketika reduced-motion aktif di sistem operasi, tidak ada animasi besar/berulang yang tersisa.

### Mengekstrak hooks animasi yang dapat digunakan kembali
Melakukan refaktor pada pola GSAP/ScrollTrigger umum dari komponen menjadi hooks yang dapat disusun kembali (seperti `useReveal`, `useParallax`, `usePinnedSection`) berbasis `src/utils/gsapAnimate.jsx`.
- Kriteria Penerimaan: Minimal dua bagian mengadopsi hooks bersama tanpa perubahan perilaku tampilan.

### Menambahkan lebih banyak contoh bagian (section) portofolio
Menyediakan bagian opsional yang siap pakai (seperti testimoni, daftar blog/tulisan, layanan, harga) yang terhubung ke registri bagian.
- Kriteria Penerimaan: Bagian baru dapat diaktifkan hanya dengan menambahkan data + entri registri.

### Menambahkan contoh proxy serverless untuk terminal AI
Menyediakan proxy yang siap dideploy (fungsi Vercel/Netlify) sehingga kunci API AI tetap berada di sisi server dan terhubung ke frontend. Lihat desain di [`docs/ai-terminal.md`](ai-terminal.md).
- Kriteria Penerimaan: Contoh kerja di mana kunci API tidak pernah masuk ke bundle klien.

### Menambahkan daftar periksa audit aksesibilitas
Membuat daftar periksa (dan idealnya pemeriksaan otomatis) yang mencakup kontras warna, status fokus, navigasi keyboard, landmark semantik, teks alternatif (alt text), dan pengurangan gerakan.
- Kriteria Penerimaan: Daftar periksa yang terdokumentasi lengkap serta perbaikan untuk masalah apa pun yang ditemukan.

### Menambahkan panduan optimalisasi performa
Mendokumentasikan dan meningkatkan penanganan gambar, pemisahan kode/lazy-loading, pemuatan font, dan biaya animasi; menambahkan target Lighthouse.
- Kriteria Penerimaan: Panduan di folder `docs/` serta peningkatan waktu build/runtime yang terukur.

## Ide / Sedang Dipertimbangkan

- Migrasi ke TypeScript atau cakupan tipe berbasis JSDoc.
- CLI kecil atau skrip untuk membuat entri proyek baru secara otomatis.
- Dukungan i18n / konten multi-bahasa.
- Unit/visual tests untuk animasi kritis dan perilaku routing.

## Selesai (Done)

- ✅ Rilis awal open-source (`0.1.0`) — lihat [`CHANGELOG.md`](../CHANGELOG.md).
