import React from "react";
import { motion } from "framer-motion";
import GlobeVisualizer from "@/components/landsea/GlobeVisualizer";
import CalculationBreakdown from "@/components/landsea/CalculationBreakdown";

export default function LandSea() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
          <span className="gold-gradient">Land & Sea Ratio</span>
        </h1>
        <p className="text-slate-600 dark:text-white/40 max-w-2xl mx-auto text-sm leading-relaxed">
          The Quran mentions "land" (بر) 13 times and "sea" (بحر) 32 times. 
          When computed as a ratio, these values yield 28.9% land and 71.1% sea — 
          remarkably close to Earth's actual surface distribution.
        </p>
      </motion.div>

      <GlobeVisualizer />
      <CalculationBreakdown />

      {/* Methodology note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 p-6 bg-white dark:bg-[#151b30] border border-slate-200 dark:border-white/5 rounded-2xl"
      >
        <h3 className="text-sm font-semibold text-slate-700 dark:text-white/60 mb-3 uppercase tracking-wider">Methodology Note</h3>
        <p className="text-sm text-slate-600 dark:text-white/40 leading-relaxed">
          This count uses the exact Arabic word forms <span className="font-amiri text-slate-900 dark:text-white/60">بَرّ</span> (barr) 
          and <span className="font-amiri text-slate-900 dark:text-white/60">بَحْر</span> (baḥr) including their plural and derived forms 
          that directly mean "land/dry land" and "sea" respectively. Different counting methodologies may yield slightly 
          different results. For full transparency, all occurrences can be verified in the Dashboard section.
        </p>
      </motion.div>
    </div>
  );
}