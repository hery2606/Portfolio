# Asisten Terminal AI

MotionFolio dilengkapi dengan asisten gaya terminal yang bersifat **opsional** (lihat [`src/components/chat/ChatWidget.jsx`](../src/components/chat/ChatWidget.jsx)). Terdapat dua lapisan fungsionalitas:

1. **Perintah lokal** — `help`, `ls`, `cat <slug>`, `neofetch`, `date`, `whoami` (ditambah `history` dan `clear`). Perintah-perintah ini berjalan sepenuhnya di browser, menggunakan data portofolio Anda, dan **tidak memerlukan API key**.
2. **Obrolan AI (opsional)** — jawaban bahasa alami tentang diri Anda yang didukung oleh LLM. Fitur ini hanya aktif jika API key tersedia.

Jika API key tidak dikonfigurasi, perintah lokal akan tetap berfungsi dan jawaban AI hanya akan dinonaktifkan.

## Cara kerja obrolan AI saat ini

- [`src/services/cerebras.js`](../src/services/cerebras.js) membaca API key dari `import.meta.env.VITE_CEREBRAS_API_KEY` (atau variabel lama `REACT_APP_CEREBRAS_API_KEY`) dan memanggil endpoint chat-completions Cerebras **langsung dari browser**, lalu mengalirkan respons kembali ke dalam widget chat.
- [`src/services/aiContext.js`](../src/services/aiContext.js) menyusun prompt sistem dan konteks terbatas (query-scoped context) dari data portofolio Anda.
- [`src/services/intentRouter.js`](../src/services/intentRouter.js) mencocokkan intensi pengguna ke navigasi bagian halaman; [`src/services/responseSanitizer.js`](../src/services/responseSanitizer.js) membersihkan output model.

## ⚠️ Mengapa konfigurasi default hanya untuk demo

Ini adalah **aplikasi Vite sisi klien**. Setiap variabel lingkungan berawalan `VITE_*` (dan `REACT_APP_*`) **disisipkan langsung ke dalam bundle JavaScript produksi** pada saat build. Jadi:

- API key yang Anda letakkan di `.env` akan **terkirim ke browser setiap pengunjung** dan dapat dibaca menggunakan DevTools atau dengan memeriksa bundle JS.
- Siapa pun dapat mengambil kunci tersebut dan menggunakannya sehingga menghabiskan kuota/biaya akun Anda.

Panggilan langsung di `cerebras.js` sangat bagus untuk **pengembangan lokal dan demo cepat**, tetapi **tidak aman untuk produksi** dengan kunci API pribadi/berbayar.

## ✅ Arsitektur yang direkomendasikan: frontend → serverless proxy → penyedia AI

Pindahkan panggilan penyedia AI ke belakang backend yang Anda kontrol. Kunci API akan menjadi **rahasia di sisi server (server-side secret)** yang tidak pernah sampai ke browser.

```text
┌──────────────┐     POST /api/chat      ┌─────────────────────┐     Bearer KEY     ┌──────────────┐
│   Frontend   │ ──────────────────────▶ │  Serverless API     │ ─────────────────▶ │ Penyedia AI  │
│ (ChatWidget) │ ◀────── stream ──────── │ Rute (simpan kunci) │ ◀──── stream ───── │  (Cerebras)  │
└──────────────┘                         └─────────────────────┘                    └──────────────┘
```

- Frontend memanggil endpoint **Anda** (`/api/chat`), bukan langsung ke penyedia AI.
- Fungsi serverless membaca kunci dari variabel lingkungan **server-only** (tanpa awalan `VITE_` / `REACT_APP_`), menerusan permintaan, dan mengalirkan respons kembali ke browser.
- Kunci API tidak pernah ada di bundle klien.

### Contoh: proxy serverless (gaya Vercel / Netlify)

Buat file `api/chat.js` (dideploy sebagai serverless function — folder pastinya tergantung layanan hosting Anda):

```js
// Sisi server saja. CATATAN: tanpa awalan VITE_/REACT_APP_ => tidak terekspos ke klien.
const CEREBRAS_URL = "https://api.cerebras.ai/v1/chat/completions";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.CEREBRAS_API_KEY; // rahasia server
  if (!apiKey) {
    res.status(500).json({ error: "Server is missing CEREBRAS_API_KEY" });
    return;
  }

  // Opsional tetapi direkomendasikan: validasi/batasi muatan payload masuk,
  // dan batasi CORS hanya untuk origin Anda sendiri sebelum meneruskannya.
  const { messages } = req.body ?? {};
  if (!Array.isArray(messages)) {
    res.status(400).json({ error: "Payload 'messages' tidak valid" });
    return;
  }

  const upstream = await fetch(CEREBRAS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages,
      model: "gpt-oss-120b",
      max_tokens: 1024,
      temperature: 0.35,
      stream: true,
    }),
  });

  if (!upstream.ok || !upstream.body) {
    res.status(upstream.status || 502).json({ error: "Kesalahan upstream" });
    return;
  }

  // Alirkan respons penyedia langsung kembali ke browser.
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    res.write(decoder.decode(value, { stream: true }));
  }
  res.end();
}
```

Atur rahasia (secret) di dashboard hosting Anda (lingkungan server, **bukan** variabel `VITE_`):

```bash
CEREBRAS_API_KEY=kunci_asli_anda_di_sini
```

### Arahkan frontend ke proxy Anda

Di [`src/services/cerebras.js`](../src/services/cerebras.js), ganti URL penyedia langsung + header `Authorization` dengan panggilan ke endpoint Anda sendiri, dan hapus kunci di sisi klien sepenuhnya:

```js
// Alih-alih memanggil penyedia secara langsung dengan kunci yang di-bundle, panggil proxy Anda sendiri:
const response = await fetch("/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ messages: conversation }),
});
// ...kemudian parse respons streaming persis seperti sebelumnya.
```

Karena kunci API tidak ada lagi di klien, Anda dapat menghapus variabel `VITE_CEREBRAS_API_KEY` / `REACT_APP_CEREBRAS_API_KEY` dari file `.env` frontend Anda.

## Daftar periksa keamanan (hardening) untuk proxy

- [ ] Simpan kunci API sebagai rahasia server saja (tanpa awalan `VITE_`/`REACT_APP_`).
- [ ] Batasi CORS hanya untuk domain Anda sendiri.
- [ ] Tambahkan pembatasan tingkat permintaan (rate limiting) / perlindungan penyalahgunaan dasar.
- [ ] Lakukan validasi dan pembatasan ukuran payload `messages` yang masuk.
- [ ] Atur batas penggunaan/biaya dengan penyedia AI Anda.
- [ ] Ganti kunci API apa pun yang pernah terekspos di bundle klien sebelumnya.

## Mengganti penyedia AI (AI Provider)

Asisten terminal menggunakan format streaming yang kompatibel dengan OpenAI. Untuk menggunakan penyedia yang berbeda, ubah endpoint, model, dan (jika diperlukan) parser SSE di `cerebras.js` — atau, lebih baik lagi, lakukan konversi tersebut di dalam serverless proxy Anda sehingga frontend tetap memanggil `/api/chat`.

Lihat juga: [`SECURITY.md`](../SECURITY.md) dan [`docs/customization.md`](customization.md).
