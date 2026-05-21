"use client";

import { EvidenceBadge } from "./EvidenceBadge";
import { CategoryTag } from "./CategoryTag";
import { SourceLink } from "./SourceLink";
import { useLang } from "@/contexts/LanguageContext";

export type FoodItem = {
  id: string;
  emoji: string;
  nameEn: string;
  nameZh: string;
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

const foodImages: Record<string, string> = {
  "perilla-leaf": "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Fresh%20green%20perilla%20leaves%20(shiso)%20on%20a%20rustic%20wooden%20kitchen%20board%2C%20natural%20morning%20light%2C%20soft%20warm%20tones%2C%20home%20kitchen%20atmosphere%2C%20minimal%20styling&image_size=portrait_4_3",
  "ginger": "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Fresh%20ginger%20root%20with%20a%20few%20slices%20on%20a%20warm%20terracotta%20plate%2C%20natural%20lighting%2C%20rustic%20kitchen%20table%2C%20cozy%20home%20cooking%20vibe&image_size=portrait_4_3",
  "nettle-leaf": "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Dried%20nettle%20leaves%20in%20a%20glass%20tea%20jar%20next%20to%20a%20ceramic%20teacup%2C%20soft%20afternoon%20light%2C%20herbal%20tea%20preparation%2C%20warm%20cozy%20kitchen&image_size=portrait_4_3",
  "quercetin-foods": "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Red%20onion%2C%20fresh%20apple%20with%20skin%2C%20capers%20in%20a%20small%20bowl%20on%20a%20wooden%20cutting%20board%2C%20rustic%20kitchen%20scene%2C%20natural%20daylight&image_size=portrait_4_3",
  "turmeric-milk": "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Warm%20golden%20turmeric%20milk%20in%20a%20ceramic%20mug%20with%20turmeric%20powder%20and%20cinnamon%20stick%20nearby%2C%20cozy%20evening%20kitchen%2C%20soft%20warm%20lighting%2C%20comforting%20atmosphere&image_size=portrait_4_3",
  "green-tea": "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Loose%20leaf%20green%20tea%20in%20a%20glass%20teapot%2C%20steaming%20ceramic%20cup%2C%20bamboo%20tea%20scoop%2C%20calm%20afternoon%20kitchen%20scene%2C%20natural%20soft%20light&image_size=portrait_4_3",
  "local-honey": "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Raw%20local%20honey%20in%20a%20glass%20jar%20with%20wooden%20dipper%2C%20morning%20sunlight%20on%20a%20rustic%20kitchen%20table%2C%20warm%20golden%20tones%2C%20home%20kitchen%20atmosphere&image_size=portrait_4_3",
  "propolis-spray": "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Natural%20propolis%20nasal%20spray%20bottle%20next%20to%20honeycomb%20pieces%20and%20fresh%20herbs%20on%20a%20wooden%20surface%2C%20soft%20natural%20light%2C%20apothecary%20kitchen%20style&image_size=portrait_4_3",
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

  return (
    <div
      onClick={onClick}
      className={`bg-[#FFFBF5] rounded-2xl border overflow-hidden transition-all ${
        isExcluded
          ? "border-red-200 opacity-50"
          : "border-amber-200/40 shadow-sm card-hover cursor-pointer"
      }`}
    >
      <div className="relative h-40 bg-amber-50/30 overflow-hidden">
        <img
          src={foodImages[food.id] || ""}
          alt={t(food.nameEn, food.nameZh)}
          className="w-full h-full object-cover"
          loading="lazy"
        />
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

      <div className="p-4">
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {foods.map((food) => (
        <FoodCard key={food.id} food={food} mode={mode} />
      ))}
    </div>
  );
}