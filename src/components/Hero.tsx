"use client";

import { useLang } from "@/contexts/LanguageContext";

const heroImageDesktop =
  "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Warm%20inviting%20kitchen%20scene%20herbal%20tea%20ingredients%20on%20rustic%20wooden%20table%20perilla%20leaves%20fresh%20ginger%20root%20chamomile%20flowers%20loose%20green%20tea%20glass%20jar%20raw%20honey%20wooden%20dipper%20turmeric%20powder%20ceramic%20bowl%20natural%20morning%20light%20window%20soft%20warm%20amber%20tones%20East%20meets%20West%20food%20as%20medicine%20cozy%20home%20kitchen%20atmosphere%20clean%20composition%20editorial%20photography&image_size=landscape_16_9";

const heroImageMobile =
  "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Warm%20inviting%20kitchen%20scene%20herbal%20tea%20ingredients%20on%20rustic%20wooden%20table%20perilla%20leaves%20fresh%20ginger%20root%20chamomile%20flowers%20loose%20green%20tea%20glass%20jar%20raw%20honey%20wooden%20dipper%20turmeric%20powder%20ceramic%20bowl%20natural%20morning%20light%20window%20soft%20warm%20amber%20tones%20East%20meets%20West%20food%20as%20medicine%20cozy%20home%20kitchen%20atmosphere%20clean%20composition%20editorial%20photography&image_size=portrait_4_3";

const statCards = [
  { num: "146", labelEn: "Foods", labelZh: "食材" },
  { num: "10", labelEn: "Concerns", labelZh: "健康问题" },
  { num: "6", labelEn: "Scenes", labelZh: "生活场景" },
  { num: "N=1", labelEn: "For You", labelZh: "为你定制" },
];

export function Hero() {
  const { t } = useLang();

  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 0%, rgba(251,191,36,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* ── MOBILE & TABLET LAYOUT (<1024px) ── */}
        <div className="lg:hidden">
          {/* MOBILE IMAGE (<768px): portrait */}
          <div className="md:hidden pt-8 pb-4">
            <div className="rounded-2xl overflow-hidden shadow-lg mx-auto max-w-md">
              <img
                src={heroImageMobile}
                alt={t(
                  "Fresh herbs and kitchen ingredients for natural wellness",
                  "天然养生厨房食材与香草"
                )}
                className="w-full h-auto object-cover"
                loading="eager"
                sizes="100vw"
              />
            </div>
          </div>

          {/* TABLET IMAGE (≥768px): landscape */}
          <div className="hidden md:block pt-12 pb-6">
            <div className="rounded-2xl overflow-hidden shadow-xl mx-auto max-w-2xl">
              <img
                src={heroImageDesktop}
                alt={t(
                  "Fresh herbs and kitchen ingredients for natural wellness",
                  "天然养生厨房食材与香草"
                )}
                className="w-full h-auto object-cover"
                loading="eager"
                sizes="(max-width: 1023px) 672px"
              />
            </div>
          </div>

          <div className="text-center pb-6 md:pb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-amber-950 leading-tight px-2 max-w-lg md:max-w-xl mx-auto">
              {t(
                "146 Foods. Your Body. Your Kitchen.",
                "146 种食物。你的身体。你的厨房。"
              )}
            </h1>
            <p className="mt-3 md:mt-4 text-base md:text-lg text-amber-700/70 max-w-sm md:max-w-md mx-auto px-2">
              {t(
                "Ancient kitchen wisdom meets modern science.",
                "古老的厨房智慧，遇见现代科学。"
              )}
            </p>

            {/* Tagline badges (tablet) */}
            <div className="hidden md:flex items-center justify-center gap-4 mt-5 text-sm text-amber-600/60">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                {t("No supplements", "无需补剂")}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                {t("No prescriptions", "无需处方")}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                {t("Just your kitchen", "只需你的厨房")}
              </span>
            </div>
          </div>
        </div>

        {/* ── TABLET & DESKTOP LAYOUT (≥768px) ── */}
        <div className="hidden lg:flex items-center gap-12 xl:gap-16 pt-20 pb-12 min-h-[520px]">
          {/* Left: Hero image */}
          <div className="flex-1 relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src={heroImageDesktop}
                alt={t(
                  "Fresh herbs and kitchen ingredients for natural wellness",
                  "天然养生厨房食材与香草"
                )}
                className="w-full h-auto object-cover"
                loading="eager"
                sizes="(min-width: 1280px) 600px, (min-width: 1024px) 480px"
                srcSet={`${heroImageDesktop} 600w`}
              />
            </div>
            {/* Decorative badge */}
            <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg px-4 py-2.5 border border-amber-100/60">
              <p className="text-xs text-amber-700/70 font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                {t("Evidence-backed · Kitchen-first", "循证支持 · 厨房第一")}
              </p>
            </div>
          </div>

          {/* Right: Text content */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-100/50 rounded-full px-3 py-1 mb-5">
              <span className="text-xs">🌿</span>
              <span className="text-xs font-medium text-amber-700">
                {t("East × West Food Wisdom", "东方 × 西方 食物智慧")}
              </span>
            </div>

            <h1 className="text-4xl xl:text-5xl font-bold tracking-tight text-amber-950 leading-tight">
              {t(
                "146 Foods.",
                "146 种食物。"
              )}
              <br />
              {t(
                "Your Body.",
                "你的身体。"
              )}
              <br />
              {t(
                "Your Kitchen.",
                "你的厨房。"
              )}
            </h1>

            <p className="mt-5 text-lg text-amber-700/70 leading-relaxed max-w-md">
              {t(
                "From drugstore drowsiness to kitchen confidence — discover how everyday foods and herbal traditions from both East and West can support your wellness, one cup at a time.",
                "从药柜困倦到厨房自信——发现来自东方和西方的日常食材与草本传统，如何一杯接一杯地陪伴你的健康。"
              )}
            </p>

            <div className="mt-6 flex items-center gap-4 text-sm text-amber-600/60">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                {t("No supplements", "无需补剂")}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                {t("No prescriptions", "无需处方")}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                {t("Just your kitchen", "只需你的厨房")}
              </span>
            </div>
          </div>
        </div>

        {/* ── STAT CARDS (Shared) ── */}
        <div className="pb-12 sm:pb-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 max-w-2xl lg:max-w-3xl mx-auto">
            {statCards.map((card) => (
              <div
                key={card.labelEn}
                className="bg-[#FFFBF5] rounded-xl p-3.5 sm:p-5 border border-amber-200/40 shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-amber-800">
                  {card.num}
                </p>
                <p className="text-xs sm:text-sm text-amber-600/50 mt-1">
                  {t(card.labelEn, card.labelZh)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}