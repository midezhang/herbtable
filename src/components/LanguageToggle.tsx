"use client";

import { useLang } from "@/contexts/LanguageContext";

export function LanguageToggle() {
  const { lang, toggleLang, t } = useLang();

  return (
    <button
      onClick={toggleLang}
      className="flex items-center gap-1 text-sm text-amber-600/60 hover:text-amber-900 transition-colors px-2 py-1 rounded-md hover:bg-amber-50"
    >
      <span className={lang === "en" ? "font-semibold text-amber-800" : ""}>EN</span>
      <span className="text-amber-300">|</span>
      <span className={lang === "zh" ? "font-semibold text-amber-800" : ""}>中文</span>
    </button>
  );
}