import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import StatsHeader from "@/components/dashboard/StatsHeader";
import FilterBar from "@/components/dashboard/FilterBar";
import PairCard from "@/components/dashboard/PairCard";
import VerificationPanel from "@/components/verification/VerificationPanel";
import { Loader2 } from "lucide-react";
import { fetchWordPairs } from "@/api/client";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [selectedPair, setSelectedPair] = useState(null);

  const { data: pairs = [], isLoading } = useQuery({
    queryKey: ["wordPairs"],
    queryFn: fetchWordPairs,
  });

  const filteredPairs = pairs.filter((p) => {
    const matchesSearch =
      !search ||
      p.word_english_1?.toLowerCase().includes(search.toLowerCase()) ||
      p.word_english_2?.toLowerCase().includes(search.toLowerCase()) ||
      p.word_arabic_1?.includes(search) ||
      p.word_arabic_2?.includes(search);
    const matchesCategory = category === "all" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
          <span className="gold-gradient">Gallery of Symmetry</span>
        </h1>
        <p className="text-slate-600 dark:text-white/40 max-w-xl mx-auto text-sm leading-relaxed">
          Explore the mathematical word pairs found in the Quran. Every count is verifiable — 
          click any card to see every occurrence, surah by surah.
        </p>
      </motion.div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32">
          <Loader2 className="w-8 h-8 text-[#d4a843] animate-spin mb-4" />
          <p className="text-slate-600 dark:text-white/30 text-sm">Loading word pairs...</p>
        </div>
      ) : (
        <>
          <StatsHeader pairs={pairs} />
          <FilterBar search={search} setSearch={setSearch} category={category} setCategory={setCategory} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPairs.map((pair, i) => (
              <PairCard
                key={pair.id}
                pair={pair}
                index={i}
                onClick={setSelectedPair}
              />
            ))}
          </div>

          {filteredPairs.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-600 dark:text-white/30 text-sm">No matching word pairs found.</p>
            </div>
          )}
        </>
      )}

      <AnimatePresence>
        {selectedPair && (
          <VerificationPanel pair={selectedPair} onClose={() => setSelectedPair(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}