"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/contexts/LanguageContext";

type Concern = {
  id: string;
  emoji: string;
  nameEn: string;
  nameZh: string;
  taglineEn: string;
  taglineZh: string;
  foodCount: number;
  evidenceLevel: string;
  available: boolean;
};

const concerns: Concern[] = [
  {
    id: "allergic-rhinitis",
    emoji: "🤧",
    nameEn: "Allergies & Hay Fever",
    nameZh: "过敏性鼻炎",
    taglineEn: "Stop sneezing. Start eating.",
    taglineZh: "停止打喷嚏。开始吃对食物。",
    foodCount: 8,
    evidenceLevel: "rct",
    available: true,
  },
  {
    id: "sleep-issues",
    emoji: "😴",
    nameEn: "Sleep Issues",
    nameZh: "睡眠问题",
    taglineEn: "Brew your way to better rest.",
    taglineZh: "泡出好眠。",
    foodCount: 6,
    evidenceLevel: "clinical",
    available: false,
  },
  {
    id: "digestion-bloating",
    emoji: "🫃",
    nameEn: "Bloating & Indigestion",
    nameZh: "腹胀消化",
    taglineEn: "Calm your gut with every meal.",
    taglineZh: "每餐安抚你的肠胃。",
    foodCount: 7,
    evidenceLevel: "meta",
    available: false,
  },
  {
    id: "acid-reflux",
    emoji: "🔥",
    nameEn: "Acid Reflux",
    nameZh: "胃酸反流",
    taglineEn: "Cool the burn from within.",
    taglineZh: "从内而外平息灼热。",
    foodCount: 5,
    evidenceLevel: "clinical",
    available: false,
  },
  {
    id: "anxiety-mild",
    emoji: "🧘",
    nameEn: "Mild Anxiety",
    nameZh: "轻度焦虑",
    taglineEn: "Sip your way to calm.",
    taglineZh: "一杯接一杯的平静。",
    foodCount: 6,
    evidenceLevel: "meta",
    available: false,
  },
  {
    id: "stress-recovery",
    emoji: "😰",
    nameEn: "Stress Recovery",
    nameZh: "压力恢复",
    taglineEn: "Food that resets your nervous system.",
    taglineZh: "食物重置你的神经系统。",
    foodCount: 5,
    evidenceLevel: "clinical",
    available: false,
  },
];

export function ConcernGrid() {
  const { t } = useLang();
  const [search, setSearch] = useState("");

  const filtered = concerns.filter((c) => {
    const q = search.toLowerCase();
    return (
      c.nameEn.toLowerCase().includes(q) ||
      c.nameZh.includes(q) ||
      c.taglineEn.toLowerCase().includes(q)
    );
  });

  return (
    <section className="pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("Search concerns...", "搜索健康问题...")}
              className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c) => (
            <ConcernCard key={c.id} concern={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ConcernCard({ concern: c }: { concern: Concern }) {
  const { t } = useLang();

  const cardContent = (
    <div
      className={`relative rounded-xl border p-5 h-full flex flex-col ${
        c.available
          ? "bg-[#FFFBF5] border-amber-200/40 card-hover cursor-pointer"
          : "bg-amber-50/30 border-amber-100/30 opacity-40 cursor-default"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-3xl">{c.emoji}</span>
        {c.available && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white bg-evidence-a">
            {t("Available", "可用")}
          </span>
        )}
        {!c.available && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-gray-400 bg-gray-200">
            {t("Soon", "即将上线")}
          </span>
        )}
      </div>

      <h3 className="text-base font-semibold text-gray-900 mb-1">
        {t(c.nameEn, c.nameZh)}
      </h3>
      <p className="text-sm text-gray-500 mb-3 flex-1">
        {t(c.taglineEn, c.taglineZh)}
      </p>

      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>
          {c.foodCount} {t("foods", "种食物")}
        </span>
        <span className="uppercase tracking-wider text-[10px]">
          {c.evidenceLevel}
        </span>
      </div>

      {!c.available && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/90 rounded-lg px-4 py-2 text-sm font-medium text-gray-500 shadow-sm">
            {t("Coming Soon", "即将上线")}
          </div>
        </div>
      )}
    </div>
  );

  if (!c.available) return cardContent;

  return (
    <Link href={`/rhinitis`} className="block h-full">
      {cardContent}
    </Link>
  );
}