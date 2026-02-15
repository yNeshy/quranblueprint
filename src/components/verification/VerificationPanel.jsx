import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import OccurrenceList from "./OccurrenceList";

export default function VerificationPanel({ pair, onClose }) {
  const [activeTab, setActiveTab] = useState(1);

  if (!pair) return null;

  const word = activeTab === 1
    ? { arabic: pair.word_arabic_1, english: pair.word_english_1, count: pair.count_1, occurrences: pair.occurrences_1 || [] }
    : { arabic: pair.word_arabic_2, english: pair.word_english_2, count: pair.count_2, occurrences: pair.occurrences_2 || [] };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/70 dark:bg-black/80 backdrop-blur-sm flex items-start justify-center overflow-y-auto py-8 px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-white dark:bg-[#0d1221] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-50 dark:from-[#151b30] to-slate-100 dark:to-[#1a2240] p-6 border-b border-slate-200 dark:border-white/5">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="w-5 h-5 text-[#d4a843]" />
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white/90">Verification Drill-Down</h2>
              </div>
              <p className="text-sm text-slate-600 dark:text-white/40">
                Examining every occurrence of{" "}
                <span className="font-amiri text-[#f0d78c]">{pair.word_arabic_1}</span> ({pair.word_english_1}) &{" "}
                <span className="font-amiri text-[#f0d78c]">{pair.word_arabic_2}</span> ({pair.word_english_2})
              </p>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-white/40 hover:text-slate-900 dark:hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Methodology note */}
          {pair.methodology_note && (
            <div className="mt-4 p-3 rounded-lg bg-[#d4a843]/5 border border-[#d4a843]/10">
              <p className="text-xs text-[#d4a843]/70">
                <span className="font-semibold">Methodology:</span> {pair.methodology_note}
              </p>
            </div>
          )}

          {/* Tab toggles */}
          <div className="flex gap-2 mt-5">
            {[1, 2].map((tab) => {
              const w = tab === 1
                ? { arabic: pair.word_arabic_1, english: pair.word_english_1, count: pair.count_1 }
                : { arabic: pair.word_arabic_2, english: pair.word_english_2, count: pair.count_2 };
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 p-3 rounded-xl text-center transition-all ${
                    activeTab === tab
                      ? "bg-[#d4a843]/10 border border-[#d4a843]/20"
                      : "bg-slate-100 dark:bg-white/3 border border-slate-200 dark:border-white/5 hover:bg-slate-200 dark:hover:bg-white/5"
                  }`}
                >
                  <p className="font-amiri text-lg text-slate-900 dark:text-white/80" dir="rtl">{w.arabic}</p>
                  <p className="text-xs text-slate-600 dark:text-white/40 mt-0.5">{w.english}</p>
                  <p className={`text-xl font-bold mt-1 ${activeTab === tab ? "gold-gradient" : "text-slate-500 dark:text-white/50"}`}>
                    {w.count}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Occurrences */}
        <div className="p-6 max-h-[60vh] overflow-y-auto bg-white dark:bg-[#0a0e1a]">
          <OccurrenceList
            occurrences={word.occurrences}
            wordArabic={word.arabic}
            wordEnglish={word.english}
            count={word.count}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}