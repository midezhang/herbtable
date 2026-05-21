"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "en" | "zh";

type LanguageContextType = {
  lang: Lang;
  toggleLang: () => void;
  t: (en: string, zh: string) => string;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const toggleLang = () => setLang((prev) => (prev === "en" ? "zh" : "en"));

  const t = (en: string, zh: string) => (lang === "en" ? en : zh);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}