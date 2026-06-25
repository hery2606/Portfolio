# Berkontribusi pada MotionFolio

Terima kasih atas minat Anda untuk berkontribusi! MotionFolio adalah starter portofolio teranimasi open-source, dan kontribusi dalam berbagai skala sangat diterima — baik perbaikan bug, dokumentasi, pola animasi baru, preset tema, maupun peningkatan aksesibilitas.

Dengan berpartisipasi dalam proyek ini, Anda setuju untuk mematuhi [Kode Etik](CODE_OF_CONDUCT.md) kami.

## Prasyarat

- Node.js 22 atau yang lebih baru
- npm 10 atau yang lebih baru

## Instalasi

```bash
git clone https://github.com/hery2606/Portfolio.git
cd Portfolio
npm install
```

## Menjalankan secara Lokal

```bash
npm run dev
```

Vite akan menampilkan URL lokal (biasanya `http://localhost:5173`). Asisten terminal AI bersifat opsional — perintah lokal akan tetap berfungsi tanpa API key apa pun. Lihat bagian [Variabel Lingkungan](README.md#variabel-lingkungan) jika Anda ingin mengaktifkan obrolan AI.

Sebelum membuat pull request, pastikan build produksi berhasil tanpa error:

```bash
npm run build
```

## Membuat Branch

Gunakan nama branch yang singkat dan deskriptif dengan awalan tipe:

```bash
git checkout -b feat/theme-preset-midnight
git checkout -b fix/gallery-scroll-jump
git checkout -b docs/customization-typo
```

Awalan yang disarankan: `feat/`, `fix/`, `docs/`, `refactor/`, `chore/`, `a11y/`.

## Mengajukan Pull Request

1. Fork repositori dan buat branch Anda dari branch `main`.
2. Lakukan perubahan Anda dalam commit yang terfokus dan terpisah secara logis.
3. Jalankan `npm run build` dan pastikan tidak ada kesalahan (error).
4. Push branch Anda dan buka pull request ke branch `main`.
5. Isi templat pull request: jelaskan **apa** yang berubah, **mengapa**, dan **bagaimana Anda mengujinya**. Tambahkan tangkapan layar atau rekaman layar untuk perubahan UI/animasi.
6. Hubungkan dengan issue terkait (misalnya, `Closes #12`).

Jaga agar pull request tetap kecil dan terfokus. Perubahan besar dan tidak terkait lebih sulit ditinjau dan kemungkinan besar akan tertunda.

## Gaya Penulisan Kode (Coding Style)

- **Pemformatan:** proyek ini menggunakan [Prettier](https://prettier.io). Jalankan `npm run format` untuk memformat perubahan Anda, atau `npm run format:check` to memverifikasinya. Konfigurasi tersimpan di `.prettierrc.json`.
- **Bahasa:** JavaScript + JSX (React 19, komponen fungsi, dan hooks).
- **Indentasi:** sesuaikan dengan file di sekitarnya (codebase ini menggunakan spasi; lihat `.editorconfig`).
- **Komponen:** satu komponen per file; pisahkan logika tampilan dari data. Konten berada di `src/data/`, bukan di-hardcode di dalam komponen.
- **Animasi:** utamakan pembantu bersama (shared helpers) di `src/utils/gsapAnimate.jsx`. Selalu hormati `prefers-reduced-motion` (lindungi animasi dengan `window.matchMedia('(prefers-reduced-motion: reduce)')` atau andalkan pembantu yang sudah melakukannya secara otomatis).
- **Import:** gunakan import relatif yang konsisten dengan file yang ada.
- **Penamaan:** `camelCase` untuk variabel/fungsi, `PascalCase` untuk komponen, `SCREAMING_SNAKE_CASE` untuk data konstanta yang diekspor (misalnya, `PORTFOLIO_DATA`).
- **Tidak ada rahasia dalam kode:** jangan pernah melakukan commit API key. Variabel `VITE_*` / `REACT_APP_*` akan dimasukkan ke dalam klien — lihat [SECURITY.md](SECURITY.md).
- Jaga agar komentar tetap bermakna; jelaskan alasan "mengapa", bukan hal "apa" yang sudah jelas dari kode.

## Kontribusi Pertama yang Baik (Good First Contributions)

- Tambahkan preset tema baru (warna/font melalui `tailwind.config.js` + `src/index.css`).
- Tambahkan pola animasi baru yang dapat digunakan kembali ke `src/utils/gsapAnimate.jsx`.
- Tingkatkan aksesibilitas atau perluas cakupan `prefers-reduced-motion`.
- Tambahkan contoh proxy serverless untuk asisten AI (lihat [docs/ai-terminal.md](docs/ai-terminal.md)).
- Tingkatkan dokumentasi di folder `docs/` atau README.
- Tambahkan contoh bagian (section) portofolio baru.

## Melaporkan Bug dan Meminta Fitur

Gunakan templat issue:

- [Laporan Bug](.github/ISSUE_TEMPLATE/bug_report.md)
- [Permintaan Fitur](.github/ISSUE_TEMPLATE/feature_request.md)

Terima kasih telah membantu membuat MotionFolio menjadi lebih baik!
