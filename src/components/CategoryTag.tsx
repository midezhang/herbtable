"use client";

import { useLang } from "@/contexts/LanguageContext";

const labels: Record<string, { en: string; zh: string }> = {
  tcm: { en: "Kitchen Herb", zh: "厨房草本" },
  western: { en: "Herbal Tradition", zh: "草药传统" },
  food: { en: "Everyday Food", zh: "日常食材" },
  bee: { en: "From the Hive", zh: "蜂巢之礼" },
};

const colors: Record<string, string> = {
  tcm: "bg-amber-100/80 text-amber-800 border-amber-200/60",
  western: "bg-green-100/80 text-green-800 border-green-200/60",
  food: "bg-orange-100/80 text-orange-800 border-orange-200/60",
  bee: "bg-yellow-100/80 text-yellow-800 border-yellow-200/60",
};

export function CategoryTag({ category }: { category: string }) {
  const { t } = useLang();
  const info = labels[category] || { en: category, zh: category };
  const color = colors[category] || "bg-gray-100 text-gray-600 border-gray-300";

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${color} backdrop-blur-sm`}>
      {t(info.en, info.zh)}
    </span>
  );
}