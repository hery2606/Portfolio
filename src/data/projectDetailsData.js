// --- Project Detail Data ---
// Pure data objects extracted from project detail components.
// This file is imported by aiContext.js and ChatWidget.jsx so that
// the React components (with JSX) remain lazily loaded and don't
// get pulled into the ChatWidget bundle.

export const PROJECT_DETAILS_DATA = {
  "smart-clinic": {
    title: "Smart Clinic",
    category: "Web & App",
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
  },
  "tagana-squence": {
    title: "Tagana Sequence",
    category: "AI-Powered Lead Scoring",
    tagline:
      "An AI-powered sales portal that prioritizes the most promising prospects for term deposit subscriptions - helping sales teams focus on high-value leads and boost follow-up efficiency.",
    year: "2026",
    stack: ["Python", "React", "Tailwind", "REST API", "ExpressJS", "Supabase"],
    features: [
      "Auto-ranking leads: automatically sorts prospects by highest subscription probability for term deposits.",
      "Transparent lead scoring: each prospect has a score/probability so sales can prioritize calls data-driven, not randomly.",
      "Concise sales dashboard: KPI overview of total leads, contacted, pending follow-ups, conversion rate, and high-priority prospects.",
      "Quick filter & segmentation: sort by status (contacted/pending), priority, and key attributes (age/job/campaign history).",
      "Actionable lead detail view: displays key prospect information to help sales tailor their approach when reaching out.",
      "Follow-up workflow: contact status updates + activity logging so every prospect's progress is tracked and never missed.",
    ],
    impact: [
      "Helps sales save time by focusing on the most promising prospects based on model predictions, rather than calling randomly.",
      "Increases campaign conversion rates by directing follow-up priority to prospects with the highest probability.",
      "Provides an easy-to-use MVP for daily sales workflow: ranking > contact > update status > monitor results.",
    ],
    links: {
      repo: "https://github.com/heriarista/Predictive-Lead-Scoring-Portal-for-Banking",
    },
    notes: "Achievement: National Finalist - Base Indonesia Hackathon 2025. Track: Base Track. Team: Terra Bit (Heri Arista & Gagah Athallah Fatha).",
  },
  
  
};
