"use client";

import { useLang } from "@/contexts/LanguageContext";

export function ModeToggle({
  mode,
  onChange,
}: {
  mode: "light" | "detail";
  onChange: (m: "light" | "detail") => void;
}) {
  const { t } = useLang();

  return (
    <div className="flex items-center gap-1 bg-amber-50 rounded-xl p-1 border border-amber-100/50">
      <button
        onClick={() => onChange("light")}
        className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
          mode === "light"
            ? "bg-white shadow-sm text-amber-900 border border-amber-100"
            : "text-amber-600/60 hover:text-amber-700"
        }`}
      >
        <span className="text-base">🌤</span>
        {t("Quick look", "快速浏览")}
      </button>
      <button
        onClick={() => onChange("detail")}
        className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
          mode === "detail"
            ? "bg-white shadow-sm text-amber-900 border border-amber-100"
            : "text-amber-600/60 hover:text-amber-700"
        }`}
      >
        <span className="text-base">🔬</span>
        {t("Deep dive", "详细了解")}
      </button>
    </div>
  );
}