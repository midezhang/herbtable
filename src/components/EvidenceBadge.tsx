"use client";

import { useLang } from "@/contexts/LanguageContext";

const labels: Record<string, { en: string; zh: string }> = {
  rct: { en: "RCT", zh: "随机对照" },
  meta: { en: "Meta", zh: "荟萃分析" },
  preclinical: { en: "Preclinical", zh: "临床前" },
  clinical: { en: "Clinical", zh: "临床研究" },
  limited: { en: "Limited", zh: "有限证据" },
  review: { en: "Review", zh: "综述" },
  multicenter: { en: "Multicenter", zh: "多中心" },
};

const colors: Record<string, string> = {
  rct: "bg-evidence-a",
  meta: "bg-evidence-a",
  multicenter: "bg-evidence-a",
  clinical: "bg-evidence-b",
  review: "bg-evidence-b",
  preclinical: "bg-evidence-c",
  limited: "bg-evidence-c",
};

export function EvidenceBadge({ level }: { level: string }) {
  const { t } = useLang();
  const info = labels[level] || { en: level, zh: level };
  const color = colors[level] || "bg-gray-400";

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white ${color}`}>
      {t(info.en, info.zh)}
    </span>
  );
}