# Catatan Perubahan (Changelog)

Semua perubahan penting pada proyek ini akan didokumentasikan dalam file ini.

Format catatan ini didasarkan pada [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
dan proyek ini mematuhi [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - Rilis Awal Open-Source

### Ditambahkan

- Starter React + Vite dengan build produksi yang dioptimalkan (output ke `build/`).
- Styling Tailwind CSS dengan plugin `@tailwindcss/typography`.
- Sistem animasi GSAP dengan ScrollTrigger untuk animasi berbasis scroll dan pin section.
- Smooth scrolling Lenis yang terintegrasi dengan GSAP/ScrollTrigger.
- Struktur studi kasus proyek: kartu galeri (`projectMeta.js`), data detail (`projectDetailsData.js`), rute/modal detail, dan registri detail kustom.
- Data portofolio terpusat (`portfolioData.js`) sehingga pengeditan konten terpisah dari kode layout dan animasi.
- Asisten terminal bertenaga AI (opsional) dengan perintah lokal (`help`, `ls`, `cat <slug>`, `neofetch`, `date`, `whoami`) serta chat berbasis LLM opsional.
- Animasi ramah aksesibilitas yang menghormati pengaturan OS `prefers-reduced-motion` di CSS dan JS.
- File proyek open-source: Lisensi MIT, README, panduan kontribusi, kebijakan keamanan, kode etik, templat issue/PR, serta dokumen penyesuaian, terminal AI, dan peta jalan (roadmap).
- Data contoh portofolio (`examplePortfolioData.js`) untuk mempermudah penggunaan ulang proyek sebagai starter.

[0.1.0]: https://github.com/hery2606/Portfolio/releases/tag/v0.1.0
