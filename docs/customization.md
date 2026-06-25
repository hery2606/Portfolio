# Panduan Kustomisasi

MotionFolio dibangun agar Anda dapat mengubah hampir semua hal tentang **konten** dan **tampilan** tanpa menyentuh kode tata letak (layout) atau animasi. Panduan ini menjelaskan setiap area yang dapat disesuaikan.

> Tip: templat starter yang dilengkapi komentar lengkap untuk data utama berada di [`src/data/examplePortfolioData.js`](../src/data/examplePortfolioData.js). Salin file tersebut ke `src/data/portfolioData.js` untuk memulai dari awal, lalu isi dengan detail informasi Anda.

## 1. Informasi Pribadi

Edit [`src/data/portfolioData.js`](../src/data/portfolioData.js). Objek `profile` menyimpan identitas Anda:

```js
profile: {
  name: "Nama Anda",
  role: "Peran / Headline Anda",
  bio: "Satu atau dua kalimat tentang diri Anda.",
  location: "Kota, Negara",
  email: "anda@example.com",
  socials: {
    github: "https://github.com/username-anda",
    linkedin: "https://linkedin.com/in/username-anda",
  },
},
```

Data ini dirender di berbagai bagian situs (hero, about, footer) dan juga dikirimkan ke asisten AI, jadi pastikan data ini akurat.

## 2. Proyek

Proyek memiliki hingga tiga lapisan. Pastikan **`slug`** tetap identik di ketiganya agar galeri, perintah terminal `cat <slug>`, dan asisten AI tetap sinkron.

1. **Kartu galeri** — [`src/data/projectMeta.js`](../src/data/projectMeta.js):
   ```js
   {
     id: 1,
     slug: "proyek-saya",
     title: "Proyek Saya",
     category: "Aplikasi Web",
     color: "bg-lime-400",   // Kelas Tailwind untuk warna aksen kartu
     img: "https://.../gambar.png",
   }
   ```
2. **Detail studi kasus** — [`src/data/projectDetailsData.js`](../src/data/projectDetailsData.js): informasi lengkap (tagline, tahun, stack, fitur, dampak, tautan) yang digunakan oleh halaman detail dan perintah `cat <slug>`.
3. **Komponen detail kustom (opsional)** — tambahkan komponen di bawah folder [`src/projectDetails/`](../src/projectDetails/) dan daftarkan di `src/projectDetails/projectRegistry.js` untuk membuat halaman detail kustom.

### Menambahkan Proyek Baru

1. Tambahkan entri kartu di `projectMeta.js`.
2. Tambahkan entri detail yang cocok (dengan `slug` yang sama) di `projectDetailsData.js`.
3. (Opsional) Buat + daftarkan komponen detail kustom Anda.

## 3. Keahlian (Skills)

Edit `techStack` di [`src/data/portfolioData.js`](../src/data/portfolioData.js). Setiap item memiliki `name` dan `category`; asisten AI mengelompokkan keahlian berdasarkan `category`:

```js
techStack: [
  { name: "React", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
],
```

Spesialisasi tingkat tinggi berada di array `capabilities` pada file yang sama.

## 4. Pengalaman

Edit array `experience` di [`src/data/portfolioData.js`](../src/data/portfolioData.js):

```js
experience: [
  {
    title: "Nama Peran — Nama Perusahaan",
    period: "Jan 2024 - Sekarang",
    description: [
      "Apa yang Anda lakukan, dengan hasil konkret.",
      "Poin dampak pekerjaan lainnya.",
    ],
  },
],
```

## 5. Tema / Warna

- **Font dan tema Tailwind:** [`tailwind.config.js`](../tailwind.config.js) (`fontFamily`, `extend.animation`, dll.).
- **Gaya global, variabel CSS, dan animasi keyframe:** [`src/index.css`](../src/index.css). Warna seleksi teks, keyframe blob/orb hero, animasi marquee, dan blok `prefers-reduced-motion` semuanya berada di sini.
- **Warna per elemen:** sebagian besar aksen menggunakan kelas utilitas Tailwind langsung pada komponen (misalnya kolom `color` pada kartu galeri, atau aksen `lime-400`).

Situs ini dibangun dengan estetika kontras tinggi hitam/lime — Anda dapat mengubah warna aksen dengan menukar kelas utilitas warna Tailwind dan warna `::selection` di `index.css`.

## 6. Animasi

Pembantu (helpers) GSAP yang dapat digunakan kembali berada di [`src/utils/gsapAnimate.jsx`](../src/utils/gsapAnimate.jsx). Utamakan pembantu ini dibanding menulis animasi ad-hoc agar perilakunya tetap konsisten.

- Animasi masuk/gulir menggunakan **GSAP + ScrollTrigger**.
- Efek gulir halus menggunakan **Lenis** (lihat [`src/hooks/useLenis.js`](../src/hooks/useLenis.js)).
- **Aksesibilitas:** animasi menghormati pengaturan `prefers-reduced-motion`. Pembantu bersama, hook Lenis, paralaks hero, dan galeri proyek semuanya memeriksa `window.matchMedia('(prefers-reduced-motion: reduce)')` untuk mengurangi atau menonaktifkan gerakan. Pertahankan perilaku ini saat menambahkan animasi baru.

## 7. Perintah Terminal

Perintah terminal lokal didefinisikan dalam objek `COMMANDS` (dan pembantu `handleCat`) di [`src/components/chat/ChatWidget.jsx`](../src/components/chat/ChatWidget.jsx). Perintah bawaan yang tersedia: `help`, `ls`, `cat <slug>`, `neofetch`, `date`, `whoami` (ditambah `history` dan `clear`).

Untuk menambahkan perintah baru, tambahkan kunci baru ke objek `COMMANDS`:

```js
const COMMANDS = {
  // ...
  socials: {
    desc: "Tampilkan tautan sosial media",
    run: () => {
      const s = PORTFOLIO_DATA.profile.socials;
      return `GitHub: ${s.github}\nLinkedIn: ${s.linkedin}`;
    },
  },
};
```

Perintah-perintah ini berjalan **sepenuhnya secara lokal** dan tidak memerlukan API key.

## 8. Penyedia Asisten AI (AI Assistant Provider)

Percakapan AI opsional didukung oleh Cerebras melalui [`src/services/cerebras.js`](../src/services/cerebras.js), dan persona/prompt sistem asisten disusun di [`src/services/aiContext.js`](../src/services/aiContext.js).

- **Persona / nada bicara / aturan:** edit `generateSystemPrompt()` di `aiContext.js`.
- **Penyedia / model / endpoint:** edit `cerebras.js` (model default adalah `gpt-oss-120b`, endpoint adalah URL chat-completions Cerebras).
- **API key:** atur `VITE_CEREBRAS_API_KEY` di file `.env` (variabel lama `REACT_APP_CEREBRAS_API_KEY` juga akan dibaca).

> ⚠️ Memanggil penyedia langsung dari browser akan mengekspos API key Anda ke bundle klien. Ini hanya untuk **tujuan demo**. Untuk tahap produksi, gunakan proxy serverless — lihat [`docs/ai-terminal.md`](ai-terminal.md) dan [`SECURITY.md`](../SECURITY.md).

Untuk beralih ke penyedia AI lain, arahkan panggilan di `cerebras.js` ke endpoint penyedia Anda dan sesuaikan parser permintaan/stream, atau (sangat disarankan) panggil endpoint proxy Anda sendiri.

## 9. Deployment

1. Kompilasi (Build):
   ```bash
   npm run build
   ```
2. Deploy folder `build/` yang dihasilkan ke host statis mana pun (Netlify, Vercel, Cloudflare Pages, GitHub Pages, dll.).
3. **Routing SPA:** konfigurasikan rewrite/fallback agar semua rute menyajikan `index.html`. Jika tidak, tautan langsung ke halaman detail proyek seperti `/projects/<slug>` akan menghasilkan error 404 saat dimuat langsung.
   - Netlify: tambahkan file `_redirects` berisi `/*  /index.html  200`.
   - Vercel: tambahkan rewrite dari `/(.*)` → `/index.html`.
4. Perbarui branding sebelum merilis: tag `<title>`, tag meta, URL canonical, dan data terstruktur di [`index.html`](../index.html), serta aset di `public/` (`favicon.svg`, `og-icon.png`, `manifest.json`, gambar profil, dan `cv.pdf`).
5. Jika Anda mengaktifkan asisten AI di tahap produksi, atur API key Anda sebagai rahasia **sisi server** di belakang proxy, alih-alih menggunakan variabel `VITE_*`.
