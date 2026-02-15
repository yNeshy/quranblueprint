import React from "react";
import { motion } from "framer-motion";
import { Calculator, ArrowRight } from "lucide-react";

const steps = [
  { label: 'Count of "بر" (Land/Dry land)', value: "13", note: "Exact word form counted" },
  { label: 'Count of "بحر" (Sea)', value: "32", note: "Exact word form counted" },
  { label: "Total mentions", value: "13 + 32 = 45", note: "Sum of both words" },
  { label: "Sea percentage", value: "(32 ÷ 45) × 100 = 71.11%", note: "Matches Earth's water coverage" },
  { label: "Land percentage", value: "(13 ÷ 45) × 100 = 28.89%", note: "Matches Earth's land coverage" },
];

export default function CalculationBreakdown() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white dark:bg-[#151b30] border border-slate-200 dark:border-white/5 rounded-2xl p-8 mt-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-5 h-5 text-[#d4a843]" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white/80">Step-by-Step Calculation</h3>
      </div>

      <div className="space-y-4">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
            className="flex items-start gap-4 p-4 rounded-xl bg-slate-100 dark:bg-white/2 border border-slate-200 dark:border-white/3"
          >
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-[#d4a843]/10 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-[#d4a843]">{i + 1}</span>
            </div>
            <div className="flex-1">
              <p className="text-sm text-slate-600 dark:text-white/60 mb-1">{step.label}</p>
              <p className="text-lg font-mono font-semibold text-slate-900 dark:text-white/90">{step.value}</p>
              <p className="text-xs text-slate-500 dark:text-white/30 mt-1">{step.note}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-xl bg-[#d4a843]/5 border border-[#d4a843]/10">
        <p className="text-sm text-[#d4a843]/80">
          <span className="font-semibold">Conclusion:</span> The ratio of Sea to Land mentions in the Quran 
          (71.1% to 28.9%) aligns closely with the scientific measurement of Earth's water-to-land surface ratio.
        </p>
      </div>
    </motion.div>
  );
}