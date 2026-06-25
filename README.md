# MotionFolio

> Starter portofolio teranimasi open-source untuk developer modern.

MotionFolio adalah starter portofolio teranimasi open-source yang dibangun dengan React, Vite, Tailwind CSS, GSAP, Lenis, dan asisten terminal opsional bertenaga AI. Ini membantu pengembang membangun situs web portofolio kreatif lebih cepat menggunakan pola gerakan (motion) yang dapat digunakan kembali, data konten terpusat, halaman studi kasus proyek, efek scroll halus (smooth scrolling), dan bagian (section) yang dapat disesuaikan.

Alih-alih mulai dari halaman kosong, Anda dapat melakukan fork proyek ini, mengedit beberapa file data, menukar aset gambar, dan meluncurkan portofolio teranimasi yang rapi.

## Fitur

- **React + Vite** untuk server pengembangan yang sangat cepat dan build produksi yang dioptimalkan.
- **Tailwind CSS** penataan berbasis utilitas (utility-first) dengan plugin tipografi.
- **Animasi GSAP** untuk transisi masuk (entrance), gerakan gulir (scroll), dan mikro-interaksi.
- **ScrollTrigger** untuk linimasa berbasis gulir dan elemen yang dipasang tetap (pinned sections).
- **Lenis smooth scrolling** terintegrasi secara mulus dengan GSAP/ScrollTrigger.
- **Pola animasi siap pakai** terpusat di `src/utils/gsapAnimate.jsx`.
- **Data portofolio terpusat** sehingga pembaruan konten tidak pernah menyentuh kode tata letak.
- **Halaman studi kasus proyek** dengan kartu galeri, rute detail, dan tampilan modal.
- **Asisten terminal AI (opsional)** dengan perintah lokal (`help`, `ls`, `cat <slug>`, dll.) serta obrolan bertenaga LLM opsional.
- **Desain responsif** yang optimal di perangkat seluler (mobile), tablet, dan desktop.
- **Animasi ramah aksesibilitas**: menghormati pengaturan preferensi pengurangan gerakan OS (`prefers-reduced-motion`) pada CSS dan JS (Lenis, efek paralaks hero, galeri, dan pembantu GSAP secara otomatis mengurangi atau menonaktifkan gerakan saat diminta).

## Tech Stack

- React 19
- Vite
- Tailwind CSS (+ `@tailwindcss/typography`)
- GSAP + ScrollTrigger
- Lenis
- React Router
- react-markdown, lucide-react, react-icons

## Prasyarat

- Node.js 22 atau yang lebih baru
- npm 10 atau yang lebih baru

## Instalasi

### 1. Clone repositori

```bash
git clone https://github.com/hery2606/Portfolio.git
cd Portfolio
```

### 2. Instal dependensi

```bash
npm install
```

### 3. Jalankan server pengembangan

```bash
npm run dev
```

Buka URL yang ditampilkan oleh Vite (biasanya `http://localhost:5173`).

### 4. Build untuk produksi

```bash
npm run build
```

Hasil build akan ditulis ke folder `build/`.

### 5. Preview hasil build produksi

```bash
npm run preview
```

### 6. Pemeriksaan sebelum deployment

```bash
npm run check
```

Ini akan menjalankan build produksi dan mengaudit dependensi produksi.

### Script yang Tersedia

- `npm run dev` — menjalankan server pengembangan.
- `npm run start` — alias untuk `npm run dev`.
- `npm run build` — membuat build produksi di folder `build/`.
- `npm run preview` — melihat pratinjau hasil build lokal.
- `npm run check` — melakukan build sekaligus mengaudit dependensi produksi.

## Variabel Lingkungan (Environment Variables)

Asisten terminal AI bersifat **opsional**. Perintah terminal lokal (`help`, `ls`, `cat <slug>`, `neofetch`, `date`, `whoami`, dll.) akan selalu berfungsi tanpa memerlukan API key apa pun. Obrolan AI hanya aktif jika API key tersedia.

Buat file `.env` di root proyek:

```env
VITE_CEREBRAS_API_KEY=kunci_api_anda_di_sini
```

Sistem juga mendukung prefix lama untuk kompatibilitas ke belakang:

```env
REACT_APP_CEREBRAS_API_KEY=kunci_api_anda_di_sini
```

> ⚠️ **Peringatan Keamanan — baca ini sebelum melakukan deployment.**
> Vite menyisipkan setiap variabel lingkungan berawalan `VITE_*` (dan di sini, `REACT_APP_*`) ke dalam **bundle sisi klien (client bundle)**. Kunci apa pun yang Anda taruh di `.env` akan ikut terkirim ke browser dan dapat dibaca oleh publik. Panggilan API langsung dari frontend di `src/services/cerebras.js` hanya digunakan untuk **tujuan demo**. Untuk produksi, rute panggilan AI harus melalui server-side / serverless proxy yang menyimpan kunci tersebut dengan aman sebagai rahasia server (server secret).
> Lihat [`docs/ai-terminal.md`](docs/ai-terminal.md) dan [`SECURITY.md`](SECURITY.md).

Catatan:
- Tanpa API key → perintah lokal tetap berjalan; obrolan AI hanya akan dinonaktifkan.
- Respons obrolan AI akan aktif segera setelah salah satu API key di atas terdeteksi.

## Panduan Kustomisasi

Anda dapat mengubah sebagian besar konten portofolio tanpa menyentuh tata letak atau kode animasi. Panduan lengkap tersedia di [`docs/customization.md`](docs/customization.md). Referensi cepat:

- **Profil, pengalaman, tech stack, proyek, pencapaian, kapabilitas:** `src/data/portfolioData.js`
- **Contoh/placeholder konten portofolio** untuk disalin: `src/data/examplePortfolioData.js`
- **Metadata kartu galeri proyek:** `src/data/projectMeta.js`
- **Detail studi kasus proyek (digunakan oleh `cat <slug>` dan halaman detail):** `src/data/projectDetailsData.js`
- **Bagian yang dapat dinavigasi (navbar + chat):** `src/data/sectionRegistry.js`
- **Rute detail kustom per proyek:** `src/projectDetails/projectRegistry.js`
- **Tema/warna dan font:** `tailwind.config.js` dan `src/index.css`
- **Animasi yang dapat digunakan kembali:** `src/utils/gsapAnimate.jsx`
- **Perintah terminal:** `COMMANDS` di `src/components/chat/ChatWidget.jsx`
- **Perilaku/kepribadian asisten AI:** `src/services/aiContext.js` dan `src/services/cerebras.js`

### Menambahkan Proyek Baru

1. Tambahkan metadata kartu di `src/data/projectMeta.js`.
2. Tambahkan data detail yang cocok dengan `slug` yang sama di `src/data/projectDetailsData.js`.
3. (Opsional) Buat komponen detail kustom di folder `src/projectDetails/`.
4. Daftarkan komponen tersebut di `src/projectDetails/projectRegistry.js`.

### Menambahkan Bagian Baru (New Section)

1. Tambahkan bagian tersebut ke dalam `src/data/sectionRegistry.js`.
2. Pastikan komponen yang dirender memiliki `elementId` yang sesuai.
3. Widget obrolan terminal dan rute intent AI akan mendeteksinya secara otomatis.

## Struktur Proyek

```text
.
├── index.html
├── public/                 # aset statis (gambar, favicon, manifest, cv.pdf)
├── docs/                   # dokumen kustomisasi, terminal AI, dan roadmap
├── src/
│   ├── components/         # komponen bagian UI dan widget
│   │   └── projects/       # galeri proyek + modal detail
│   ├── data/               # data konten terpusat + data contoh
│   ├── hooks/              # custom React hooks (misalnya, Lenis)
│   ├── pages/              # halaman tingkat rute (Home)
│   ├── projectDetails/     # komponen studi kasus kustom + registri
│   ├── services/           # konteks AI, klien Cerebras, router intent
│   └── utils/              # pembantu animasi bersama & rumus easing
├── tailwind.config.js
├── vite.config.js
└── build/                  # output produksi (dihasilkan setelah build)
```

## Peta Jalan (Roadmap)

Lihat [`docs/roadmap.md`](docs/roadmap.md) untuk daftar lengkapnya. Sorotan utama:

- Menambahkan mode templat dengan tombol pilihan data contoh.
- Menambahkan beberapa preset tema warna.
- Meningkatkan cakupan deteksi `prefers-reduced-motion`.
- Mengekstrak hooks animasi yang dapat digunakan kembali.
- Menambahkan lebih banyak contoh bagian (section) portofolio.
- Menyediakan contoh serverless proxy untuk terminal AI.
- Menyertakan daftar periksa audit aksesibilitas.
- Menyertakan panduan optimalisasi performa.

## Kontribusi

Kontribusi sangat kami harapkan! Silakan baca [`CONTRIBUTING.md`](CONTRIBUTING.md) untuk detail penyiapan, gaya penulisan kode, penamaan branch, dan panduan pull request, serta ikuti [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md) kami.

Kontribusi pertama yang baik:
- Menambahkan preset tema baru.
- Menambahkan pola animasi baru yang reusable.
- Meningkatkan aksesibilitas atau cakupan `prefers-reduced-motion`.
- Menyertakan contoh serverless proxy untuk asisten AI.

## Keamanan (Security)

Variabel lingkungan `VITE_*` / `REACT_APP_*` **terekspos secara bebas ke browser**. Jangan pernah menaruh API key rahasia/berbayar secara langsung di kode frontend untuk tahap produksi — selalu gunakan proxy server-side atau serverless. Untuk melaporkan kerentanan atau panduan lengkapnya, baca [`SECURITY.md`](SECURITY.md).

## Deployment

Deploy folder `build/` hasil kompilasi ke layanan hosting statis apa pun (Vercel, Netlify, Cloudflare Pages, GitHub Pages, dll.). Karena aplikasi ini adalah Single Page Application (SPA), pastikan untuk mengonfigurasi aturan penulisan ulang/fallback rute agar mengarah ke `index.html`. Jika tidak, tautan langsung ke halaman studi kasus akan menghasilkan halaman error 404 saat dimuat langsung.

## Pemecahan Masalah (Troubleshooting)

- **AI tidak merespons:** periksa `.env`, pastikan API key sudah diatur dengan benar, kemudian restart server pengembangan Anda.
- **Perintah terminal lokal berjalan tetapi AI gagal:** biasanya disebabkan oleh API key yang salah/tidak valid, batas penggunaan (rate limit), atau gangguan koneksi jaringan.
- **Hasil build tidak ditemukan:** hasil build tersimpan di folder `build/`, bukan `dist/`.
- **Statistik GitHub kosong:** biasanya karena batas tingkat permintaan API publik GitHub terlampaui.

## Lisensi

Dilisensikan di bawah [Lisensi MIT](LICENSE). Hak Cipta (c) 2026 Heri Arista.
