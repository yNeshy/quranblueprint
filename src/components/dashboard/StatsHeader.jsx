import React from "react";
import { motion } from "framer-motion";
import { Sparkles, BookOpen, Hash, Scale } from "lucide-react";

export default function StatsHeader({ pairs }) {
  const totalPairs = pairs.length;
  const totalOccurrences = pairs.reduce((sum, p) => sum + p.count_1 + p.count_2, 0);
  const equalPairs = pairs.filter(p => p.count_1 === p.count_2).length;

  const stats = [
    { label: "Word Pairs", value: totalPairs, icon: Sparkles },
    { label: "Total Occurrences", value: totalOccurrences.toLocaleString(), icon: Hash },
    { label: "Perfect Equalities", value: equalPairs, icon: Scale },
    { label: "Surahs Covered", value: 114, icon: BookOpen },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className="bg-white dark:bg-[#151b30] border border-slate-200 dark:border-white/5 rounded-xl p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-[#d4a843]/10 flex items-center justify-center">
              <stat.icon className="w-4 h-4 text-[#d4a843]" />
            </div>
            <span className="text-[11px] text-slate-600 dark:text-white/40 uppercase tracking-wider">{stat.label}</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white/90">{stat.value}</p>
        </motion.div>
      ))}
    </div>
  );
}