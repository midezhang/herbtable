"use client";

import { useLang } from "@/contexts/LanguageContext";
import type { FoodItem } from "./FoodCard";

const foodIllustrations: Record<string, string> = {
  "perilla-leaf": "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Fresh%20green%20perilla%20leaves%20(shiso)%20on%20a%20rustic%20wooden%20kitchen%20board%2C%20natural%20morning%20light%2C%20soft%20warm%20tones%2C%20home%20kitchen%20atmosphere%2C%20minimal%20styling&image_size=square_hd",
  "ginger": "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Fresh%20ginger%20root%20with%20a%20few%20slices%20on%20a%20warm%20terracotta%20plate%2C%20natural%20lighting%2C%20rustic%20kitchen%20table%2C%20cozy%20home%20cooking%20vibe&image_size=square_hd",
  "nettle-leaf": "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Dried%20nettle%20leaves%20in%20a%20glass%20tea%20jar%20next%20to%20a%20ceramic%20teacup%2C%20soft%20afternoon%20light%2C%20herbal%20tea%20preparation%2C%20warm%20cozy%20kitchen&image_size=square_hd",
  "quercetin-foods": "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Red%20onion%2C%20fresh%20apple%20with%20skin%2C%20capers%20in%20a%20small%20bowl%20on%20a%20wooden%20cutting%20board%2C%20rustic%20kitchen%20scene%2C%20natural%20daylight&image_size=square_hd",
  "turmeric-milk": "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Warm%20golden%20turmeric%20milk%20in%20a%20ceramic%20mug%20with%20turmeric%20powder%20and%20cinnamon%20stick%20nearby%2C%20cozy%20evening%20kitchen%2C%20soft%20warm%20lighting%2C%20comforting%20atmosphere&image_size=square_hd",
  "green-tea": "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Loose%20leaf%20green%20tea%20in%20a%20glass%20teapot%2C%20steaming%20ceramic%20cup%2C%20bamboo%20tea%20scoop%2C%20calm%20afternoon%20kitchen%20scene%2C%20natural%20soft%20light&image_size=square_hd",
  "local-honey": "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Raw%20local%20honey%20in%20a%20glass%20jar%20with%20wooden%20dipper%2C%20morning%20sunlight%20on%20a%20rustic%20kitchen%20table%2C%20warm%20golden%20tones%2C%20home%20kitchen%20atmosphere&image_size=square_hd",
  "propolis-spray": "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Natural%20propolis%20nasal%20spray%20bottle%20next%20to%20honeycomb%20pieces%20and%20fresh%20herbs%20on%20a%20wooden%20surface%2C%20soft%20natural%20light%2C%20apothecary%20kitchen%20style&image_size=square_hd",
};

export function ShoppingList({ foods }: { foods: FoodItem[] }) {
  const { t, lang } = useLang();

  const handleExport = () => {
    const isZh = lang === "zh";
    const csvContent = [
      isZh ? "食材,用量,时间" : "food,amount,timing",
      ...foods
        .filter((f) => !f.excluded)
        .map((f) =>
          isZh
            ? `"${f.nameZh}",${f.dosageZh?.daily || ""},${f.timingZh}`
            : `"${f.nameEn}",${f.dosageEn?.daily || ""},${f.timingEn}`
        ),
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = isZh ? "herbtable-gouwuqingdan.csv" : "herbtable-shopping-list.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const active = foods.filter((f) => !f.excluded);

  return (
    <div className="bg-[#FFFBF5] border border-amber-200/40 rounded-2xl p-5 shadow-sm">
      <div className="text-center mb-5 pb-4 border-b border-amber-100/60">
        <div className="mb-3">
          <img
            src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Cozy%20kitchen%20counter%20with%20fresh%20herbs%20ginger%20root%20perilla%20leaves%20honey%20jar%20turmeric%20powder%20green%20tea%20leaves%20on%20a%20rustic%20wooden%20table%2C%20soft%20natural%20morning%20light%2C%20warm%20home%20cooking%20atmosphere%2C%20minimal%20clean%20style&image_size=landscape_4_3"
            alt="Kitchen herbs"
            className="w-full h-32 object-cover rounded-xl mb-3"
            loading="lazy"
          />
        </div>
        <p className="text-xs text-amber-600/70 tracking-wide uppercase font-medium">
          {t("From your kitchen", "来自你的厨房")}
        </p>
        <h3 className="text-base font-semibold text-amber-900 mt-0.5">
          🧺 {t("Kitchen Collection", "厨房清单")}
        </h3>
        <p className="text-xs text-amber-600/60 mt-1">
          {active.length}{" "}
          {t("natural ingredients for you", "样天然食材为你准备")}
        </p>
      </div>

      <ul className="space-y-3 mb-4">
        {active.map((food) => (
          <li
            key={food.id}
            className="flex items-center gap-3 p-2.5 rounded-xl bg-amber-50/50 hover:bg-amber-50 transition-colors group"
          >
            <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-amber-100/50">
              <img
                src={foodIllustrations[food.id] || ""}
                alt={t(food.nameEn, food.nameZh)}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-amber-900 truncate">
                {t(food.nameEn, food.nameZh)}
              </p>
              <p className="text-xs text-amber-600/70 truncate">
                {t(food.timingEn, food.timingZh)}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xs text-amber-700/60">
                {t(food.dosageEn?.daily || "As needed", food.dosageZh?.daily || "按需")}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="pt-3 border-t border-amber-100/60">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-amber-600/60 flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            {t("Bring to store or market", "带去超市或菜场")}
          </span>
        </div>
        <button
          onClick={handleExport}
          className="w-full py-2.5 rounded-xl text-sm font-medium transition-all bg-amber-100 hover:bg-amber-200 text-amber-800 flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {t("Save my list", "保存我的清单")}
        </button>
        <p className="text-[10px] text-amber-500/50 text-center mt-2">
          {t("Downloads as CSV · opens in any spreadsheet", "下载为CSV · 可在任何表格软件中打开")}
        </p>
      </div>
    </div>
  );
}