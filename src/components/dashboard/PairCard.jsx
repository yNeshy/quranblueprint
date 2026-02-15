import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const categoryLabels = {
  duality: "Duality",
  ratio: "Ratio",
  equality: "Equality",
};

const categoryColors = {
  duality: "from-blue-500/20 to-purple-500/20",
  ratio: "from-emerald-500/20 to-teal-500/20",
  equality: "from-amber-500/20 to-orange-500/20",
};

export default function PairCard({ pair, index, onClick }) {
  const total = pair.count_1 + pair.count_2;
  const pct1 = total > 0 ? ((pair.count_1 / total) * 100).toFixed(1) : 50;
  const pct2 = total > 0 ? ((pair.count_2 / total) * 100).toFixed(1) : 50;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onClick={() => onClick(pair)}
      className="group relative bg-white dark:bg-[#151b30] border border-slate-200 dark:border-white/5 rounded-2xl p-6 cursor-pointer card-glow transition-all duration-500 hover:border-[#d4a843]/20 hover:scale-[1.02]"
    >
      {/* Category pill */}
      <div className="absolute top-4 right-4">
        <span className={`text-[10px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-full bg-gradient-to-r ${categoryColors[pair.category]} text-slate-600 dark:text-white/60 font-medium`}>
          {categoryLabels[pair.category]}
        </span>
      </div>

      {/* Words */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 text-center">
          <p className="font-amiri text-2xl text-slate-900 dark:text-white/90 mb-1" dir="rtl">{pair.word_arabic_1}</p>
          <p className="text-xs text-slate-600 dark:text-white/40 uppercase tracking-wider">{pair.word_english_1}</p>
          <p className="text-3xl font-bold gold-gradient mt-2">{pair.count_1}</p>
        </div>
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#d4a843]/30 to-transparent" />
        <div className="flex-1 text-center">
          <p className="font-amiri text-2xl text-slate-900 dark:text-white/90 mb-1" dir="rtl">{pair.word_arabic_2}</p>
          <p className="text-xs text-slate-600 dark:text-white/40 uppercase tracking-wider">{pair.word_english_2}</p>
          <p className="text-3xl font-bold gold-gradient mt-2">{pair.count_2}</p>
        </div>
      </div>

      {/* Ratio bar */}
      <div className="space-y-2">
        <div className="h-2 rounded-full bg-slate-200 dark:bg-white/5 overflow-hidden flex">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct1}%` }}
            transition={{ duration: 1, delay: index * 0.08 + 0.3 }}
            className="h-full bg-gradient-to-r from-[#d4a843] to-[#f0d78c] rounded-full"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct2}%` }}
            transition={{ duration: 1, delay: index * 0.08 + 0.3 }}
            className="h-full bg-gradient-to-r from-[#1e3a5f] to-[#2a5a8f] rounded-full"
          />
        </div>
        <div className="flex justify-between text-[11px] text-slate-600 dark:text-white/30">
          <span>{pct1}%</span>
          <span>{pct2}%</span>
        </div>
      </div>

      {/* Hover CTA */}
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#d4a843]/0 group-hover:text-[#d4a843]/70 transition-all duration-300">
        <span>View all occurrences</span>
        <ArrowRight className="w-3 h-3" />
      </div>
    </motion.div>
  );
}