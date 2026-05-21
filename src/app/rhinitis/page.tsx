"use client";

import { useState, useMemo } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { TopNav } from "@/components/TopNav";
import { Footer } from "@/components/Footer";
import { SafetyProfile } from "@/components/SafetyProfile";
import { ModeToggle } from "@/components/ModeToggle";
import { FoodArsenal } from "@/components/FoodCard";
import { ShoppingList } from "@/components/ShoppingList";
import type { FoodItem } from "@/components/FoodCard";

const ALL_FOODS: FoodItem[] = [
  {
    id: "perilla-leaf",
    emoji: "🌿",
    nameEn: "Perilla Leaf",
    nameZh: "紫苏叶",
    category: "tcm",
    timingEn: "Morning · first thing",
    timingZh: "早晨 · 起床第一杯",
    prepEn: "5g dried perilla leaf + 5g ginger, 200ml boiling water, steep 5 min",
    prepZh: "5g干紫苏叶 + 5g生姜, 200ml开水, 冲泡5分钟",
    mechanismEn:
      "Rosmarinic acid stabilizes mast cells, inhibiting histamine release. Suppresses 5-LOX and 12-LOX inflammatory pathways.",
    mechanismZh:
      "迷迭香酸稳定肥大细胞膜，抑制组胺释放。抑制5-LOX和12-LOX炎症通路。",
    evidenceLevel: "rct",
    pmid: "36978975",
    safetyEn: "Generally safe. May slow blood clotting — caution with anticoagulants.",
    safetyZh: "普遍安全。可能减缓凝血 — 与抗凝药物同用需谨慎。",
    dosageEn: {
      emergency: "5g dried leaf + 5g ginger, steep 5 min",
      daily: "3-5g dried leaf, 1-2 cups/day",
      longTerm: "2-3g as maintenance",
    },
    dosageZh: {
      emergency: "5g干叶 + 5g生姜, 冲泡5分钟",
      daily: "3-5g干叶, 每日1-2杯",
      longTerm: "2-3g维持量",
    },
    rationaleEn:
      "Dual-action anti-allergic (mast cell + LOX). Strongest clinical evidence among kitchen herbs for rhinitis. TCM classic: releases exterior, disperses cold.",
    rationaleZh:
      "双通路抗过敏（肥大细胞+LOX）。厨房草药中临床证据最强的鼻炎食材。中药经典：解表散寒。",
    excluded: false,
  },
  {
    id: "ginger",
    emoji: "🫚",
    nameEn: "Ginger",
    nameZh: "生姜",
    category: "tcm",
    timingEn: "Morning · with perilla tea",
    timingZh: "早晨 · 与紫苏茶同泡",
    prepEn: "3-5 thin slices fresh ginger. Pair with perilla leaf for synergistic effect.",
    prepZh: "3-5片薄鲜姜。与紫苏叶同泡产生协同效果。",
    mechanismEn:
      "6-gingerol inhibits COX-2 and reduces prostaglandin E2. Meta-analysis showed significant reduction in CRP, hs-CRP, and TNF-α.",
    mechanismZh:
      "6-姜辣素抑制COX-2，减少前列腺素E2。荟萃分析显示CRP、hs-CRP、TNF-α显著降低。",
    evidenceLevel: "meta",
    doi: "10.3389/fphar.2025.1619655",
    safetyEn: "Safe for most. High doses (>4g/day) may cause heartburn. Caution with blood thinners.",
    safetyZh: "多数人安全。高剂量(>4g/日)可能引起胃灼热。与抗凝药同用需注意。",
    dosageEn: {
      emergency: "5g fresh, paired with perilla",
      daily: "3-5g fresh, 1-2 cups/day",
    },
    dosageZh: {
      emergency: "5g鲜姜, 搭配紫苏",
      daily: "3-5g鲜姜, 每日1-2杯",
    },
    rationaleEn:
      "Perfect partner to perilla. Adds COX-2 inhibition to mast cell stabilization. TCM: warms the middle, transforms phlegm. The perilla+ginger pair is the strongest morning anti-allergy duo.",
    rationaleZh:
      "紫苏的完美搭档。在肥大细胞稳定作用上叠加COX-2抑制。中药：温中化痰。紫苏+生姜是最强晨间抗过敏组合。",
    excluded: false,
  },
  {
    id: "nettle-leaf",
    emoji: "🍵",
    nameEn: "Nettle Leaf",
    nameZh: "荨麻叶",
    category: "western",
    timingEn: "Mid-morning · 10am & mid-afternoon · 3pm",
    timingZh: "上午10点 · 下午3点",
    prepEn: "2g dried nettle leaf, 200ml hot water (not boiling), steep 5-7 min. Drink twice daily.",
    prepZh: "2g干荨麻叶, 200ml热水(非沸水), 冲泡5-7分钟。每日两次。",
    mechanismEn:
      "Acts as H1 receptor antagonist. Inhibits tryptase. Blocks COX-1 and COX-2. Reduces nasal eosinophil count.",
    mechanismZh:
      "作为H1受体拮抗剂。抑制类胰蛋白酶。阻断COX-1和COX-2。降低鼻嗜酸性粒细胞。",
    evidenceLevel: "rct",
    pmid: "29844782",
    safetyEn:
      "Safe for most adults. Mild diuretic effect. Avoid if pregnant (uterine stimulant).",
    safetyZh: "多数成人安全。轻度利尿作用。孕妇避免（子宫刺激）。",
    dosageEn: {
      emergency: "2g dried, steep 5-7 min, up to 3x on bad days",
      daily: "2g dried, 2x/day (10am + 3pm)",
    },
    dosageZh: {
      emergency: "2g干叶, 冲泡5-7分钟, 严重日最多3次",
      daily: "2g干叶, 每日2次 (10am+3pm)",
    },
    rationaleEn:
      "Western herbal medicine's #1 allergy herb. Triple mechanism: H1 block + COX inhibition + eosinophil reduction. Validated in Iranian RCT with 150mg extract.",
    rationaleZh:
      "西方草药医学的头号过敏草药。三通路: H1阻断+COX抑制+嗜酸性粒细胞降低。伊朗RCT验证(150mg提取物)。",
    excluded: false,
  },
  {
    id: "quercetin-foods",
    emoji: "🧅",
    nameEn: "Quercetin Foods",
    nameZh: "槲皮素食物",
    category: "food",
    timingEn: "Lunch · with your meal",
    timingZh: "午餐 · 搭配正餐",
    prepEn: "Red onion (raw, 1/4), apple (with skin), capers (1 tbsp). Add to salad or eat as sides.",
    prepZh: "红洋葱(生,1/4个), 苹果(带皮), 刺山柑(1勺)。加入沙拉或作为佐餐。",
    mechanismEn:
      "Quercetin is a mast cell membrane stabilizer. Blocks histidine decarboxylase. Th1/Th2 rebalancing effect.",
    mechanismZh:
      "槲皮素是肥大细胞膜稳定剂。阻断组氨酸脱羧酶。Th1/Th2再平衡效应。",
    evidenceLevel: "clinical",
    doi: "10.23750/abm.v91i1.9275",
    safetyEn: "Food-source quercetin is very safe. Supplement form may interact with quinolone antibiotics.",
    safetyZh: "食物来源槲皮素非常安全。补充剂形式可能与喹诺酮类抗生素交互。",
    dosageEn: {
      daily: "1/4 red onion + 1 apple + 1 tbsp capers = ~50mg quercetin",
    },
    dosageZh: {
      daily: "1/4红洋葱 + 1苹果 + 1勺刺山柑 ≈ 50mg槲皮素",
    },
    rationaleEn:
      "Mast cell stabilization through FOOD, not supplements. The quercetin plate is the lunch anchor: easy, delicious, scientifically sound.",
    rationaleZh:
      "通过食物而非补充剂实现肥大细胞稳定。槲皮素食盘是午餐锚点：简单、美味、有科学依据。",
    excluded: false,
  },
  {
    id: "turmeric-milk",
    emoji: "🟡",
    nameEn: "Turmeric Milk",
    nameZh: "姜黄金奶",
    category: "tcm",
    timingEn: "Evening · 1 hour before bed",
    timingZh: "晚间 · 睡前1小时",
    prepEn: "1 tsp turmeric powder + pinch black pepper + 200ml warm milk (dairy or oat). Stir well.",
    prepZh: "1小勺姜黄粉 + 少许黑胡椒 + 200ml温奶(牛奶或燕麦奶)。搅拌均匀。",
    mechanismEn:
      "Curcumin inhibits NF-κB, the master switch of inflammation. 54 meta-analyses reviewed: 7/10 show CRP↓, 5/8 IL-6↓, 6/9 TNF-α↓.",
    mechanismZh:
      "姜黄素抑制NF-κB这一炎症总开关。54篇荟萃分析: 7/10显示CRP↓, 5/8显示IL-6↓, 6/9显示TNF-α↓。",
    evidenceLevel: "meta",
    doi: "10.3390/nu16111728",
    safetyEn:
      "Black pepper is ESSENTIAL — increases curcumin absorption 20x. High doses may interact with blood thinners.",
    safetyZh: "黑胡椒是必须的 — 提高姜黄素吸收20倍。高剂量可能与抗凝药交互。",
    dosageEn: {
      daily: "1 tsp turmeric + pinch black pepper, nighttime",
    },
    dosageZh: {
      daily: "1小勺姜黄 + 少许黑胡椒, 睡前",
    },
    rationaleEn:
      "Turmeric golden milk is the ritual anchor of the evening. Anti-inflammatory + sleep-promoting (warm milk). The black pepper hack makes it bioavailable. TCM: moves blood, reduces swelling.",
    rationaleZh:
      "姜黄金奶是晚间仪式锚点。抗炎+助眠(温奶)。黑胡椒技巧使其生物可利用。中药：活血消肿。",
    excluded: false,
  },
  {
    id: "green-tea",
    emoji: "🍵",
    nameEn: "Green Tea",
    nameZh: "绿茶",
    category: "food",
    timingEn: "Afternoon · 2 cups spread through day",
    timingZh: "下午 · 全天分散饮用2杯",
    prepEn: "2g loose leaf green tea, 80°C water (NOT boiling), steep 2-3 min. Drink unsweetened.",
    prepZh: "2g散装绿茶叶, 80°C热水(非沸水), 冲泡2-3分钟。不加糖饮用。",
    mechanismEn:
      "EGCG blocks mast cell FcεRI receptor signaling. NF-κB, AP-1, and STAT pathway inhibition. Also provides L-theanine for calm focus.",
    mechanismZh:
      "EGCG阻断肥大细胞FcεRI受体信号。抑制NF-κB、AP-1、STAT通路。同时提供L-茶氨酸带来平静专注。",
    evidenceLevel: "meta",
    doi: "10.3390/nu15133022",
    safetyEn: "Limit to 2 cups/day (caffeine). Decaf green tea retains some EGCG but less effective.",
    safetyZh: "限制每日2杯(咖啡因)。脱咖啡因绿茶保留部分EGCG但效果较差。",
    dosageEn: {
      daily: "2 cups/day, 80°C water, 2-3 min steep",
    },
    dosageZh: {
      daily: "每日2杯, 80°C水, 冲泡2-3分钟",
    },
    rationaleEn:
      "Green tea bridges the daytime. Anti-allergy + anti-inflammatory + calm focus. Multiple pathway inhibition. The most researched beverage in the world.",
    rationaleZh:
      "绿茶连接日间。抗过敏+抗炎+平静专注。多通路抑制。全球被研究最多的饮品。",
    excluded: false,
  },
  {
    id: "local-honey",
    emoji: "🍯",
    nameEn: "Local Honey",
    nameZh: "本地蜂蜜",
    category: "food",
    timingEn: "Morning · 1 tbsp daily",
    timingZh: "早晨 · 每日1勺",
    prepEn: "1 tbsp raw, unfiltered local honey. Stir into warm (not hot) water or eat directly.",
    prepZh: "1勺生鲜未过滤本地蜂蜜。搅入温水(非热水)或直接食用。",
    mechanismEn:
      "Theory: local pollen exposure through honey may desensitize immune response. Small RCT showed high-dose honey improved AR symptoms vs placebo (P<0.05).",
    mechanismZh:
      "假说：通过蜂蜜接触本地花粉可能脱敏免疫反应。小型RCT显示高剂量蜂蜜改善AR症状优于安慰剂(P<0.05)。",
    evidenceLevel: "limited",
    pmid: "24188941",
    safetyEn:
      "MUST be local honey (<50km radius) for pollen relevance. Do NOT give to infants <1 year (botulism risk).",
    safetyZh: "必须是本地蜂蜜(<50km范围)才能有花粉相关性。勿给<1岁婴儿(肉毒杆菌风险)。",
    dosageEn: {
      daily: "1 tbsp raw local honey, morning",
    },
    dosageZh: {
      daily: "1勺生鲜本地蜂蜜, 早晨",
    },
    rationaleEn:
      "The weakest evidence but highest potential for local pollen desensitization. When combined with the other 7 foods, honey provides a gentle daily exposure therapy.",
    rationaleZh:
      "证据最弱但本地花粉脱敏潜力最高。与其他7种食物组合，蜂蜜提供温和的日常暴露疗法。",
    excluded: false,
  },
  {
    id: "propolis-spray",
    emoji: "🐝",
    nameEn: "Propolis Nasal Spray",
    nameZh: "蜂胶鼻喷雾",
    category: "bee",
    timingEn: "As needed · during symptom flare",
    timingZh: "按需使用 · 症状发作时",
    prepEn: "Anatolian propolis + hypertonic saline nasal spray. 2 sprays per nostril, up to 3x/day.",
    prepZh: "安纳托利亚蜂胶+高渗盐水鼻喷雾。每鼻孔2喷, 最多每日3次。",
    mechanismEn:
      "Propolis contains >300 compounds. Inhibits COX-1/COX-2, stabilizes mast cells, and reduces IgE. Multicenter study: 440 patients, symptom score 11.09→6.23 (P<0.001).",
    mechanismZh:
      "蜂胶含>300种化合物。抑制COX-1/COX-2，稳定肥大细胞膜，降低IgE。多中心研究: 440例患者, 症状评分11.09→6.23(P<0.001)。",
    evidenceLevel: "multicenter",
    doi: "10.1177/01455613231204209",
    safetyEn:
      "Nasal spray has the STRONGEST clinical evidence (A-level). Oral propolis showed no significant effect in RCT. Avoid if bee-allergic. Do not use in children <2.",
    safetyZh:
      "鼻喷雾有最强的临床证据(A级)。口服蜂胶在RCT中无显著效果。蜂产品过敏者禁用。勿用于<2岁儿童。",
    dosageEn: {
      emergency: "2 sprays/nostril, up to 3x/day during flare",
    },
    dosageZh: {
      emergency: "每鼻孔2喷, 发作期最多每日3次",
    },
    rationaleEn:
      "Our protocol's only product-based solution. Included because of the highest clinical evidence level for acute symptom relief. Nasal spray form is critical — oral propolis lacks evidence.",
    rationaleZh:
      "方案中唯一的成品型方案。因其在急性症状缓解方面的最高临床证据级别而纳入。鼻喷雾形式至关重要——口服蜂胶缺乏证据。",
    excluded: false,
  },
];

export default function RhinitisPage() {
  const { t } = useLang();
  const [mode, setMode] = useState<"light" | "detail">("light");
  const [allergies, setAllergies] = useState<string[]>([]);

  const filteredFoods = useMemo(() => {
    return ALL_FOODS.map((food) => ({
      ...food,
      excluded: allergies.some(
        (a) =>
          food.nameEn.toLowerCase().includes(a) ||
          food.nameZh.includes(a) ||
          food.category.includes(a) ||
          food.mechanismEn.toLowerCase().includes(a)
      ),
    }));
  }, [allergies]);

  return (
    <>
      <TopNav />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">🤧</span>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {t("Allergies & Hay Fever", "过敏性鼻炎")}
              </h1>
            </div>
            <p className="text-amber-800/70 max-w-2xl leading-relaxed">
              {t(
                "8 everyday foods from your kitchen that may help ease allergy symptoms. No pills, no prescriptions — just the wisdom of herbs and ingredients you can find at any market. Each one works a little differently, and together they form a gentle daily ritual that supports your body naturally.",
                "8种来自厨房的寻常食材，或许能帮你缓解过敏的不适。没有药片，没有处方——只有菜场里就能找到的香草和食材的智慧。每一种都有自己的方式，合在一起，就是一份温和的日常仪式，自然地陪伴你的身体。"
              )}
            </p>
          </div>

          <SafetyProfile onAllergiesChange={setAllergies} />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-lg font-semibold text-amber-900">
              {t("Your Kitchen Collection", "你的厨房精选")}{" "}
              <span className="text-sm font-normal text-amber-600/60">
                ({filteredFoods.filter((f) => !f.excluded).length}{" "}
                {t("foods for you", "样食材为你准备")})
              </span>
            </h2>
            <ModeToggle mode={mode} onChange={setMode} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <FoodArsenal foods={filteredFoods} mode={mode} />
            </div>
            <div className="lg:col-span-1">
              <ShoppingList foods={filteredFoods} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}