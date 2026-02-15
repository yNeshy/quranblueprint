import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Search, AlertTriangle, CheckCircle, Scale, Info } from "lucide-react";

const sections = [
  {
    icon: BookOpen,
    title: "Source Text",
    content: "All counts are derived from the standard Uthmani script of the Quran (Mushaf al-Madinah). We use the widely accepted 6,236-verse division across 114 surahs. The Arabic text follows the standard rasm (orthography) without diacritical variations."
  },
  {
    icon: Search,
    title: "Counting Methodology",
    content: "Two counting approaches exist in this field, and it is critical to understand the difference:\n\n**Exact Word Count** — counts only the precise Arabic word form (e.g., الحياة for 'life'). This is the stricter method.\n\n**Root Word Count** — counts all words derived from the same trilateral root (e.g., ح-ي-ي for all forms of 'life'). This can inflate numbers but captures related meanings.\n\nOur default counts use the exact word form. Where root-based counting is used, it is explicitly noted on the pair card."
  },
  {
    icon: AlertTriangle,
    title: "Known Limitations & Honest Disclaimers",
    content: "Not all commonly cited pairs have been independently verified to universal agreement. Some pairs require specific counting rules (e.g., including or excluding Basmala). Different scholars and researchers may arrive at slightly different counts depending on:\n\n• Whether the Basmala at the start of each surah is counted\n• Whether dual/plural forms are included\n• Whether figurative vs. literal usage is distinguished\n\nWe document our specific rules for each pair in the card's methodology note."
  },
  {
    icon: Scale,
    title: "Academic Honesty",
    content: "This platform is a verification engine, not a persuasion tool. We present the data transparently and allow users to verify every single occurrence. Where counts are disputed or depend on methodology, we flag this clearly. The goal is to enable scholarly inquiry, not to 'massage' numbers to fit predetermined conclusions."
  },
  {
    icon: CheckCircle,
    title: "Verification Process",
    content: "Every word pair includes a drill-down feature that lists every occurrence by surah and verse. Users can:\n\n1. See the Arabic verse with the target word highlighted\n2. Read the English translation for context\n3. Verify whether the word is used literally or metaphorically\n4. Cross-reference with their own Quran copy or digital tools\n\nThis full-transparency approach ensures that no claim is taken on faith alone."
  },
  {
    icon: Info,
    title: "Data Sources",
    content: "Arabic text: Tanzil.net Quran text (Uthmani script)\nEnglish translations: Sahih International\nWord counts: Cross-referenced with multiple published works on Quranic numerical studies\n\nAll data is open for inspection and correction. If you find an error, we welcome scholarly feedback."
  }
];

export default function Methodology() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
          <span className="gold-gradient">Methodology</span>
        </h1>
        <p className="text-slate-600 dark:text-white/40 max-w-xl mx-auto text-sm leading-relaxed">
          Transparency is the foundation of this project. Here we explain exactly how every count 
          was derived, what assumptions were made, and where limitations exist.
        </p>
      </motion.div>

      <div className="space-y-6">
        {sections.map((section, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="bg-white dark:bg-[#151b30] border border-slate-200 dark:border-white/5 rounded-2xl p-6 sm:p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#d4a843]/10 flex items-center justify-center">
                <section.icon className="w-5 h-5 text-[#d4a843]" />
              </div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white/90">{section.title}</h2>
            </div>
            <div className="text-sm text-slate-600 dark:text-white/50 leading-relaxed whitespace-pre-line">
              {section.content}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}