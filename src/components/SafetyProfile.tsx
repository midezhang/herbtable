"use client";

import { useState } from "react";
import { useLang } from "@/contexts/LanguageContext";

export function SafetyProfile({
  onAllergiesChange,
}: {
  onAllergiesChange: (allergies: string[]) => void;
}) {
  const { t } = useLang();
  const [input, setInput] = useState("");
  const [allergies, setAllergies] = useState<string[]>([]);
  const [medications, setMedications] = useState<string[]>([]);
  const [medInput, setMedInput] = useState("");
  const [skipped, setSkipped] = useState(false);

  const addAllergy = () => {
    const trimmed = input.trim().toLowerCase();
    if (trimmed && !allergies.includes(trimmed)) {
      const updated = [...allergies, trimmed];
      setAllergies(updated);
      onAllergiesChange(updated);
    }
    setInput("");
  };

  const removeAllergy = (a: string) => {
    const updated = allergies.filter((x) => x !== a);
    setAllergies(updated);
    onAllergiesChange(updated);
  };

  const addMedication = () => {
    const trimmed = medInput.trim().toLowerCase();
    if (trimmed && !medications.includes(trimmed)) {
      setMedications([...medications, trimmed]);
    }
    setMedInput("");
  };

  const removeMedication = (m: string) => {
    setMedications(medications.filter((x) => x !== m));
  };

  const handleSkip = () => {
    setSkipped(true);
    onAllergiesChange([]);
  };

  if (skipped) {
    return (
      <div className="bg-green-50/60 border border-green-100/60 rounded-2xl p-4 mb-6">
        <p className="text-sm text-green-700 flex items-center gap-2">
          <span>✅</span>
          {t(
            "Showing all foods. You can always add allergies later.",
            "已显示全部食材。随时可以回来添加过敏信息。"
          )}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFBF5] border border-amber-200/40 rounded-2xl p-5 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">🧺</span>
        <h3 className="text-sm font-semibold text-amber-900">
          {t("Before we start...", "开始之前...")}
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-amber-700/70 mb-1.5">
            {t("Anything you're allergic to?", "有什么不能吃的吗？")}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addAllergy()}
              placeholder={t("e.g. honey, tree nuts", "比如：蜂蜜、树坚果")}
              className="flex-1 px-3 py-2 text-sm border border-amber-200 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-200/50 focus:border-amber-300 placeholder:text-amber-300"
            />
            <button
              onClick={addAllergy}
              className="px-4 py-2 text-sm bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-xl transition-colors font-medium"
            >
              {t("Add", "添加")}
            </button>
          </div>
          {allergies.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {allergies.map((a) => (
                <span
                  key={a}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 text-red-700 text-xs rounded-full border border-red-100"
                >
                  {a}
                  <button
                    onClick={() => removeAllergy(a)}
                    className="ml-0.5 hover:text-red-900 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-amber-700/70 mb-1.5">
            {t("Taking any medications?", "正在吃什么药吗？")}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={medInput}
              onChange={(e) => setMedInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addMedication()}
              placeholder={t("e.g. warfarin, loratadine", "比如：华法林、氯雷他定")}
              className="flex-1 px-3 py-2 text-sm border border-amber-200 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-200/50 focus:border-amber-300 placeholder:text-amber-300"
            />
            <button
              onClick={addMedication}
              className="px-4 py-2 text-sm bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-xl transition-colors font-medium"
            >
              {t("Add", "添加")}
            </button>
          </div>
          {medications.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {medications.map((m) => (
                <span
                  key={m}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-yellow-50 text-yellow-700 text-xs rounded-full border border-yellow-100"
                >
                  {m}
                  <button
                    onClick={() => removeMedication(m)}
                    className="ml-0.5 hover:text-yellow-900 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <button
        onClick={handleSkip}
        className="mt-4 text-xs text-amber-500/70 hover:text-amber-600 underline transition-colors"
      >
        {t("Skip · just show me what to eat", "跳过 · 直接看吃什么")}
      </button>
    </div>
  );
}