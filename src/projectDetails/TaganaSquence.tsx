


import ProjectCaseLayout from "../components/projects/ProjectCaseLayout";

export const project = {
  title: "Tagana Sequence",
  category: "Web App & IoT",
  heroImg: "https://res.cloudinary.com/dw5mromqs/image/upload/v1782363036/Screenshot_2026-06-25_115000_jvtn3j.png",
  tagline:
    "A personal AI-powered financial assistant on Telegram that automatically tracks expenses & income using RAG technology and OCR.",
  year: "2026",
  stack: [
    "Next.js",
    "ParallaxScrolling",
    "FramerMotion",
    "shadcnui",
    

  ],
  features: [
    "Natural language input (text/voice) for instant transaction logging without complicated manual forms.",
    "Advanced RAG Engine that learns user spending patterns for automatic category classification.",
    "Double-entry Ledger system (Bank Core) to ensure balance accuracy and real-time budget tracking.",
    "OCR integration to scan shopping receipts and automatically convert them into transaction data.",
    "Smart clarification mechanism using interactive buttons when input is ambiguous or incomplete.",
    "Periodic financial reports (daily/weekly/monthly) plus AI-based insights for savings recommendations.",
  ],
  impact: [
    "Transforms boring manual financial record-keeping into natural and efficient conversations.",
    "Provides full visibility into users' financial health through instant access in their everyday chat app.",
    "Helps users make better financial decisions through accurate spending data analysis.",
  ],
  links: {
    live: "https://tagana-web-rho.vercel.app/",
    repo: "https://github.com/hery2606/TAGANA_WEB",
  },
};

export default function TaganaSequence({ onClose, mode }: { onClose: () => void, mode: string }) {
  return (
    <ProjectCaseLayout
      project={project}
      onClose={onClose}
      closeLabel={mode === "modal" ? "Close" : "Back to Home"}
      mode={mode}
    />
  );
}
