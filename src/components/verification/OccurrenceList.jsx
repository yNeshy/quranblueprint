import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, BookMarked } from "lucide-react";

function highlightWord(text, word) {
  if (!text || !word) return text;
  const regex = new RegExp(`(${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part)
      ? <span key={i} className="bg-[#d4a843]/25 dark:bg-[#d4a843]/25 text-[#f0d78c] px-1 rounded font-semibold">{part}</span>
      : part
  );
}

export default function OccurrenceList({ occurrences, wordArabic, wordEnglish, count }) {
  const [expandedVerse, setExpandedVerse] = useState(null);

  if (!occurrences || occurrences.length === 0) {
    return (
      <div className="text-center py-12">
        <BookMarked className="w-10 h-10 mx-auto text-slate-300 dark:text-white/10 mb-3" />
        <p className="text-slate-600 dark:text-white/30 text-sm">
          Occurrence data not yet loaded for this word.
        </p>
        <p className="text-slate-500 dark:text-white/20 text-xs mt-1">
          The verified count is <span className="text-[#d4a843]">{count}</span> occurrences.
        </p>
      </div>
    );
  }

  // Group by surah
  const grouped = occurrences.reduce((acc, occ) => {
    const key = occ.surah_number;
    if (!acc[key]) acc[key] = { surah_number: occ.surah_number, surah_name_arabic: occ.surah_name_arabic, surah_name_english: occ.surah_name_english, verses: [] };
    acc[key].verses.push(occ);
    return acc;
  }, {});

  const surahs = Object.values(grouped).sort((a, b) => a.surah_number - b.surah_number);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-slate-600 dark:text-white/50">
          <span className="text-[#f0d78c] font-semibold">{occurrences.length}</span> verified occurrences across{" "}
          <span className="text-slate-900 dark:text-white/70 font-medium">{surahs.length}</span> surahs
        </p>
      </div>

      {surahs.map((surah) => (
        <div key={surah.surah_number} className="border border-slate-200 dark:border-white/5 rounded-xl overflow-hidden">
          <button
            onClick={() => setExpandedVerse(expandedVerse === surah.surah_number ? null : surah.surah_number)}
            className="w-full flex items-center justify-between p-4 hover:bg-slate-100 dark:hover:bg-white/3 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-[#1e3a5f]/50 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-white/60">
                {surah.surah_number}
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-slate-900 dark:text-white/80">{surah.surah_name_english}</p>
                <p className="font-amiri text-xs text-slate-600 dark:text-white/40" dir="rtl">{surah.surah_name_arabic}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#d4a843]/60 font-medium">{surah.verses.length} occurrence{surah.verses.length > 1 ? 's' : ''}</span>
              {expandedVerse === surah.surah_number ? (
                <ChevronUp className="w-4 h-4 text-slate-400 dark:text-white/30" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400 dark:text-white/30" />
              )}
            </div>
          </button>

          {expandedVerse === surah.surah_number && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="border-t border-slate-200 dark:border-white/5"
            >
              {surah.verses.map((verse, vi) => (
                <div key={vi} className="p-4 border-b border-slate-200 dark:border-white/3 last:border-b-0 bg-slate-50 dark:bg-transparent">
                  <div className="flex items-start gap-3">
                    <span className="text-xs text-slate-500 dark:text-white/20 font-mono mt-1 shrink-0">
                      {surah.surah_number}:{verse.verse_number}
                    </span>
                    <div className="flex-1 space-y-2">
                      <p className="font-amiri text-base text-slate-900 dark:text-white/80 leading-loose" dir="rtl">
                        {highlightWord(verse.verse_text_arabic, wordArabic)}
                      </p>
                      {verse.verse_text_english && (
                        <p className="text-xs text-slate-600 dark:text-white/40 leading-relaxed">
                          {highlightWord(verse.verse_text_english, wordEnglish)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}