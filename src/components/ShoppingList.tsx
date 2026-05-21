"use client";

import { useState, useMemo } from "react";
import { useLang } from "@/contexts/LanguageContext";
import type { FoodItem } from "./FoodCard";
import { getFoodImagePath, shoppingListHeaderImage } from "@/lib/images";

const aisleLabels: Record<string, { en: string; zh: string }> = {
  tcm: { en: "🌿 Herbal & Tea Aisle", zh: "🌿 草药茶专区" },
  western: { en: "🌱 Herbal & Tea Aisle", zh: "🌱 草药茶专区" },
  food: { en: "🥕 Fresh Produce", zh: "🥕 生鲜蔬菜区" },
  bee: { en: "🍯 Honey & Bee Products", zh: "🍯 蜂蜜蜂产品区" },
};

export function ShoppingList({ foods }: { foods: FoodItem[] }) {
  const { t, lang } = useLang();
  const [headerImgFailed, setHeaderImgFailed] = useState(false);
  const [foodImgFailed, setFoodImgFailed] = useState<string[]>([]);

  const handleExportImage = async () => {
    const isZh = lang === "zh";
    const active = foods.filter((f) => !f.excluded);
    if (active.length === 0) return;

    const groups: Record<string, FoodItem[]> = {};
    for (const food of active) {
      const cat = food.category || "other";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(food);
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 800;
    const HEADER = 100;
    const FOOTER = 60;
    const ROW_H = 48;
    const SECTION_H = 28;
    const GAP = 4;
    const PAD = 32;

    let totalH = HEADER + PAD;
    for (const [, items] of Object.entries(groups)) {
      totalH += SECTION_H;
      totalH += items.length * ROW_H;
      totalH += GAP;
    }
    totalH += FOOTER + PAD;
    canvas.width = W;
    canvas.height = totalH;

    ctx.fillStyle = "#FFFBF5";
    ctx.fillRect(0, 0, W, totalH);

    ctx.fillStyle = "#92400E";
    ctx.font = "bold 20px system-ui, -apple-system, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("🧺 HerbTable — " + (isZh ? "厨房清单" : "Kitchen Collection"), W / 2, 50);

    ctx.fillStyle = "#A16207";
    ctx.font = "13px system-ui, -apple-system, sans-serif";
    ctx.fillText(
      isZh ? "来自你的厨房 · 天然食材为你准备" : "From your kitchen · Natural ingredients for you",
      W / 2,
      78
    );

    let y = HEADER + PAD;

    const categoryLabels: Record<string, string> = {
      tcm: isZh ? "🌿 草药茶专区" : "🌿 Herbal & Tea Aisle",
      western: isZh ? "🌱 草药茶专区" : "🌱 Herbal & Tea Aisle",
      food: isZh ? "🥕 生鲜蔬菜区" : "🥕 Fresh Produce",
      bee: isZh ? "🍯 蜂蜜蜂产品区" : "🍯 Honey & Bee Products",
    };

    for (const [cat, items] of Object.entries(groups)) {
      ctx.fillStyle = "#D97706";
      ctx.font = "bold 12px system-ui, -apple-system, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(categoryLabels[cat] || cat, PAD, y + 14);
      y += SECTION_H;

      for (const food of items) {
        ctx.font = "22px system-ui, sans-serif";
        ctx.textAlign = "left";
        ctx.fillText(food.emoji || "•", PAD, y + 28);

        ctx.fillStyle = "#1A1A1A";
        ctx.font = "500 14px system-ui, -apple-system, sans-serif";
        const name = isZh ? food.nameZh : food.nameEn;
        ctx.textAlign = "left";
        ctx.fillText(name, PAD + 40, y + 20);

        ctx.fillStyle = "#78716C";
        ctx.font = "12px system-ui, -apple-system, sans-serif";
        const timing = isZh ? food.timingZh : food.timingEn;
        ctx.fillText(timing, PAD + 40, y + 36);

        ctx.fillStyle = "#78716C";
        ctx.font = "12px system-ui, -apple-system, sans-serif";
        ctx.textAlign = "right";
        const dosage = isZh ? (food.dosageZh?.daily || "按需") : (food.dosageEn?.daily || "As needed");
        ctx.fillText(dosage, W - PAD, y + 28);

        y += ROW_H;
      }

      ctx.strokeStyle = "#FDE68A";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(PAD, y - GAP);
      ctx.lineTo(W - PAD, y - GAP);
      ctx.stroke();
      y += GAP;
    }

    ctx.fillStyle = "#A16207";
    ctx.font = "12px system-ui, -apple-system, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("HerbTable · herbtable.app", W / 2, totalH - FOOTER + 24);

    ctx.fillStyle = "#D6D3D1";
    ctx.font = "10px system-ui, -apple-system, sans-serif";
    ctx.fillText(
      isZh ? "食物信息，非医疗建议" : "Food information, not medical advice",
      W / 2,
      totalH - FOOTER + 44
    );

    const link = document.createElement("a");
    const ext = "jpg";
    const fmt = "image/jpeg";
    link.download = isZh ? `herbtable-gouwuqingdan.${ext}` : `herbtable-shopping-list.${ext}`;
    link.href = canvas.toDataURL(fmt, 0.92);
    link.click();
  };

  const active = foods.filter((f) => !f.excluded);

  const grouped = useMemo(() => {
    const groups: Record<string, FoodItem[]> = {};
    for (const food of active) {
      const cat = food.category || "other";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(food);
    }
    return groups;
  }, [active]);

  return (
    <div className="bg-[#FFFBF5] border border-amber-200/40 rounded-2xl p-5 shadow-sm">
      <div className="text-center mb-5 pb-4 border-b border-amber-100/60">
        <div className="mb-3">
          {headerImgFailed ? (
            <div className="w-full h-32 rounded-xl mb-3 bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center">
              <span className="text-4xl">🧺</span>
            </div>
          ) : (
            <img
              src={shoppingListHeaderImage}
              alt="Kitchen herbs"
              className="w-full h-32 object-cover rounded-xl mb-3"
              loading="lazy"
              onError={() => setHeaderImgFailed(true)}
            />
          )}
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

      <div className="space-y-4 mb-4">
        {Object.entries(grouped).map(([category, items]) => {
          const label = aisleLabels[category];
          return (
            <div key={category}>
              <p className="text-xs font-medium text-amber-700/70 mb-2 px-1">
                {t(label?.en || category, label?.zh || category)}
              </p>
              <ul className="space-y-2">
                {items.map((food) => (
                  <li
                    key={food.id}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-amber-50/50 hover:bg-amber-50 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-amber-100/50">
                      {foodImgFailed.includes(food.id) ? (
                        <div className="w-full h-full flex items-center justify-center text-lg">
                          {food.emoji}
                        </div>
                      ) : (
                        <img
                          src={getFoodImagePath(food.id)}
                          alt={t(food.nameEn, food.nameZh)}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={() => setFoodImgFailed((prev) => [...prev, food.id])}
                        />
                      )}
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
            </div>
          );
        })}
      </div>

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
          onClick={handleExportImage}
          className="w-full py-2.5 rounded-xl text-sm font-medium transition-all bg-amber-100 hover:bg-amber-200 text-amber-800 flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {t("Save my list", "保存我的清单")}
        </button>
        <p className="text-[10px] text-amber-500/50 text-center mt-2">
          {t("Downloads as image · share or print anytime", "下载为图片 · 可随时分享或打印")}
        </p>
      </div>
    </div>
  );
}