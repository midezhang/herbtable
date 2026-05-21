"use client";

import { useLang } from "@/contexts/LanguageContext";

export function Footer() {
  const { t } = useLang();

  return (
    <footer className="mt-auto border-t border-amber-100/60 bg-[#FFFBF5]/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <p className="text-xs text-amber-500/50 text-center max-w-2xl mx-auto leading-relaxed">
          {t(
            "These statements have not been evaluated by the FDA. This is food information, not medical advice. Always consult your healthcare provider before making dietary changes.",
            "本内容未经FDA评估。此为食物信息，非医疗建议。改变饮食前请咨询医疗提供者。"
          )}
        </p>
        <p className="text-xs text-amber-400/40 text-center mt-2">
          &copy; {new Date().getFullYear()} HerbTable
        </p>
      </div>
    </footer>
  );
}