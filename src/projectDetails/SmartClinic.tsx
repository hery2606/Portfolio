import ProjectCaseLayout from "../components/projects/ProjectCaseLayout";

export const project = {
  title: "Smart Clinic",
  category: "Web & App",
  heroImg: "https://res.cloudinary.com/dw5mromqs/image/upload/v1782361739/Screenshot_2026-06-25_112342_namf6n.png",
  tagline:
    "A Web and App based on medical records to help clinics manage patient data, schedule appointments, and track medical history in a simple, fast, and user-friendly interface.",
  year: "2026",
  stack: [
    "React 19 + TypeScript",
    "Vite 6",
    "Zustand",
    "TanStack React Query v5 + Axios",
    "React Router v7",
    "Tailwind CSS v4",
    "Radix UI + Shadcn",
    "Lucide React & Recharts",
  ],
  features: [
    "Transaksi Pembayaran Cepat: Dukungan cetak struk Thermal/A4 untuk kelancaran transaksi pasien.",
    "Manajemen Inventaris Obat: Monitoring ketersediaan stok obat dan alkes secara real-time.",
    "Visualisasi Tren Pendapatan: Dashboard analitik dengan grafik interaktif untuk memantau performa klinik.",
    "Manajemen Data Pasien Terintegrasi: Pengelolaan rekam medis dasar pasien yang aman dan efisien.",
    "Keamanan Sistem & Otentikasi: Pembatasan akses berdasarkan peran (Role-based access) dan 2-Factor Authentication (2FA)."
  ],
  impact: [
    "Mempercepat layanan transaksi pembayaran pasien di meja kasir.",
    "Memudahkan pengambilan keputusan operasional klinik melalui ringkasan analitis visual.",
    "Meminimalisir selisih stok alkes dan obat dengan sistem inventaris otomatis."
  ],
  links: {
    live: "https://pos-clinic-dhy8kk0oq-heryarista535-3622s-projects.vercel.app",
    repo: "https://github.com/FATUR-063/CapstonPos-QrisGII",
  },
};

const preFeatureSection = (
  <div className="mt-12 space-y-12">
    <div className="text-center max-w-2xl mx-auto">
      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 mb-3 block">
        Akses Multi-Role Portal
      </span>
      <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-black">
        2 Portal Utama Pengguna
      </h2>
      <p className="mt-3 text-sm text-black/60 leading-relaxed">
        Aplikasi ini dibagi menjadi 2 alur kerja utama berdasarkan otorisasi peran pengguna.
      </p>
    </div>
    
    <div className="grid md:grid-cols-2 gap-8 mt-8">
      {/* Portal Kasir */}
      <div className="border border-black/10 p-8 bg-white/40 backdrop-blur-sm rounded-[4px] space-y-6 hover:border-lime-500/50 hover:shadow-md transition-all duration-300">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-lime-400 text-black font-mono font-bold text-sm flex items-center justify-center">01</span>
          <h3 className="text-lg font-black uppercase tracking-tight text-black">Portal Kasir (Cashier)</h3>
        </div>
        <p className="text-sm text-black/60 leading-relaxed">
          Didesain khusus untuk efisiensi tinggi pada transaksi harian di meja kasir.
        </p>
        <ul className="space-y-3 text-xs leading-relaxed text-black/85 font-mono">
          <li className="flex gap-2 items-start">
            <span className="text-lime-500 mt-0.5">▪</span>
            <span><strong>Dashboard Kasir:</strong> Antarmuka transaksi pembayaran pasien/pelanggan.</span>
          </li>
          <li className="flex gap-2 items-start">
            <span className="text-lime-500 mt-0.5">▪</span>
            <span><strong>Riwayat Transaksi:</strong> Melacak detail transaksi sukses maupun batal.</span>
          </li>
          <li className="flex gap-2 items-start">
            <span className="text-lime-500 mt-0.5">▪</span>
            <span><strong>Manajemen Stok:</strong> Cek stok obat & alat kesehatan secara real-time.</span>
          </li>
          <li className="flex gap-2 items-start">
            <span className="text-lime-500 mt-0.5">▪</span>
            <span><strong>Pengaturan Kasir:</strong> Konfigurasi printer struk (Thermal/A4) & mode tampilan.</span>
          </li>
        </ul>
      </div>

      {/* Portal Analitik & Admin */}
      <div className="border border-black/10 p-8 bg-white/40 backdrop-blur-sm rounded-[4px] space-y-6 hover:border-lime-500/50 hover:shadow-md transition-all duration-300">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-lime-400 text-black font-mono font-bold text-sm flex items-center justify-center">02</span>
          <h3 className="text-lg font-black uppercase tracking-tight text-black">Portal Analitik & Admin</h3>
        </div>
        <p className="text-sm text-black/60 leading-relaxed">
          Didesain untuk manajemen memantau performa bisnis dan laporan operasional klinik.
        </p>
        <ul className="space-y-3 text-xs leading-relaxed text-black/85 font-mono">
          <li className="flex gap-2 items-start">
            <span className="text-lime-500 mt-0.5">▪</span>
            <span><strong>Dashboard Analitik:</strong> Ringkasan visual grafik pendapatan & tren pasien.</span>
          </li>
          <li className="flex gap-2 items-start">
            <span className="text-lime-500 mt-0.5">▪</span>
            <span><strong>Laporan Keuangan:</strong> Pembuatan & pencetakan laporan transaksi otomatis.</span>
          </li>
          <li className="flex gap-2 items-start">
            <span className="text-lime-500 mt-0.5">▪</span>
            <span><strong>Data Pasien:</strong> Manajemen database rekam medis pasien terintegrasi.</span>
          </li>
          <li className="flex gap-2 items-start">
            <span className="text-lime-500 mt-0.5">▪</span>
            <span><strong>Pengaturan Sistem:</strong> Profil klinik, keamanan 2FA, hak akses, & notifikasi.</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default function SmartClinic({ onClose, mode }: { onClose: () => void; mode: string }) {
  return (
    <ProjectCaseLayout
      project={project}
      onClose={onClose}
      closeLabel={mode === "modal" ? "Close" : "Back to Home"}
      preFeatureSection={preFeatureSection}
      mode={mode}
    />
  );
}
