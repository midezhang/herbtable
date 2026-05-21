"use client";

import { useState } from "react";
import { EvidenceBadge } from "./EvidenceBadge";
import { CategoryTag } from "./CategoryTag";
import { SourceLink } from "./SourceLink";
import { useLang } from "@/contexts/LanguageContext";
import { getFoodImagePath } from "@/lib/images";

export type FoodItem = {
  id: string;
  emoji: string;
  nameEn: string;
  nameZh: string;
  pinyin?: string;
  latinName?: string;
  category: string;
  timingEn: string;
  timingZh: string;
  prepEn: string;
  prepZh: string;
  mechanismEn: string;
  mechanismZh: string;
  evidenceLevel: string;
  pmid?: string;
  doi?: string;
  safetyEn: string;
  safetyZh: string;
  dosageEn: { emergency?: string; daily?: string; longTerm?: string };
  dosageZh: { emergency?: string; daily?: string; longTerm?: string };
  rationaleEn: string;
  rationaleZh: string;
  excluded: boolean;
};

function renderDosage(
  dosage: { emergency?: string; daily?: string; longTerm?: string } | undefined,
  t: (en: string, zh: string) => string
) {
  if (!dosage) return null;
  const labels = {
    emergency: t("Acute", "急用"),
    daily: t("Daily", "日常"),
    longTerm: t("Long-term", "长期"),
  };
  return (
    <div className="flex flex-wrap gap-1.5 mt-1">
      {dosage.emergency && (
        <span className="inline-flex items-center gap-1 text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
          <span className="font-medium">{labels.emergency}</span>
          <span className="text-red-500">{dosage.emergency}</span>
        </span>
      )}
      {dosage.daily && (
        <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          <span className="font-medium">{labels.daily}</span>
          <span className="text-blue-500">{dosage.daily}</span>
        </span>
      )}
      {dosage.longTerm && (
        <span className="inline-flex items-center gap-1 text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
          <span className="font-medium">{labels.longTerm}</span>
          <span className="text-purple-500">{dosage.longTerm}</span>
        </span>
      )}
    </div>
  );
}

export function FoodCard({
  food,
  mode,
  onClick,
}: {
  food: FoodItem;
  mode: "light" | "detail";
  onClick?: () => void;
}) {
  const { t, lang } = useLang();
  const isExcluded = food.excluded;
  const dosage = lang === "en" ? food.dosageEn : food.dosageZh;
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div
      onClick={onClick}
      className={`bg-[#FFFBF5] rounded-2xl border overflow-hidden transition-all ${
        isExcluded
          ? "border-red-200 opacity-50"
          : "border-amber-200/40 shadow-sm card-hover cursor-pointer"
      }`}
    >
      <div className={`relative ${mode === "detail" ? "h-28" : "h-24"} bg-amber-50/30 overflow-hidden`}>
        {imgFailed ? (
          <div className="flex items-center justify-center w-full h-full text-3xl">
            {food.emoji}
          </div>
        ) : (
          <img
            src={getFoodImagePath(food.id)}
            alt={t(food.nameEn, food.nameZh)}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        )}
        <div className="absolute top-3 right-3">
          <CategoryTag category={food.category} />
        </div>
        {isExcluded && (
          <div className="absolute inset-0 bg-red-50/60 flex items-center justify-center">
            <p className="text-sm font-medium text-red-600 bg-white/90 px-3 py-1.5 rounded-full">
              {t("Excluded — matches your allergen", "已排除 — 匹配你的过敏原")}
            </p>
          </div>
        )}
      </div>

      <div className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-semibold text-gray-900 text-base">
            {t(food.nameEn, food.nameZh)}
          </h3>
        </div>

        <div className="space-y-1.5">
          <p className="text-sm text-amber-700 flex items-center gap-1.5">
            <span className="text-xs">☀️</span>
            {t(food.timingEn, food.timingZh)}
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            {t(food.prepEn, food.prepZh)}
          </p>
        </div>

        {mode === "detail" && (
          <div className="mt-4 pt-4 border-t border-amber-100/60 space-y-4">
            {lang === "zh" && food.pinyin && food.latinName && (
              <div className="text-xs text-amber-600/70 bg-amber-50/50 rounded-lg px-3 py-2 flex flex-wrap gap-x-4 gap-y-1">
                <span><span className="font-medium">拼音:</span> {food.pinyin}</span>
                <span><span className="font-medium">Latin:</span> <span className="italic">{food.latinName}</span></span>
              </div>
            )}
            <div>
              <h4 className="text-xs font-semibold text-amber-700 mb-1.5 flex items-center gap-1">
                <span>💡</span>
                {t("How it helps you", "它怎么帮你")}
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t(food.mechanismEn, food.mechanismZh)}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-amber-700 mb-1.5 flex items-center gap-1">
                <span>🥄</span>
                {t("How to use it", "怎么用")}
              </h4>
              {renderDosage(dosage, t)}
            </div>

            <div>
              <h4 className="text-xs font-semibold text-amber-700 mb-1.5 flex items-center gap-1">
                <span>💚</span>
                {t("Why we chose this", "为什么选它")}
              </h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                {t(food.rationaleEn, food.rationaleZh)}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-amber-700 mb-1.5 flex items-center gap-1">
                <span>📝</span>
                {t("A little note", "小小提醒")}
              </h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                {t(food.safetyEn, food.safetyZh)}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <EvidenceBadge level={food.evidenceLevel} />
              <SourceLink pmid={food.pmid} doi={food.doi} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function FoodArsenal({
  foods,
  mode,
}: {
  foods: FoodItem[];
  mode: "light" | "detail";
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {foods.map((food) => (
        <FoodCard key={food.id} food={food} mode={mode} />
      ))}
    </div>
  );
}