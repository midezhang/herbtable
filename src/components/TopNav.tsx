"use client";

import Link from "next/link";
import { useLang } from "@/contexts/LanguageContext";
import { LanguageToggle } from "./LanguageToggle";

export function TopNav() {
  const { t } = useLang();

  return (
    <nav className="sticky top-0 z-50 bg-[#FFFBF5]/90 backdrop-blur-md border-b border-amber-100/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl">🌿</span>
          <span className="text-lg font-semibold text-amber-900 tracking-tight">
            HerbTable
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-sm text-amber-700/60 hover:text-amber-900 transition-colors"
          >
            {t("Concerns", "健康问题")}
          </Link>
          <LanguageToggle />
        </div>
      </div>
    </nav>
  );
}