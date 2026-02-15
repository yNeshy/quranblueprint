import React from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

const categories = [
  { value: "all", label: "All Pairs" },
  { value: "equality", label: "Equality" },
  { value: "duality", label: "Duality" },
  { value: "ratio", label: "Ratio" },
];

export default function FilterBar({ search, setSearch, category, setCategory }) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-white/30" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search word pairs..."
          className="pl-10 bg-white dark:bg-[#151b30] border border-slate-200 dark:border-white/5 text-slate-900 dark:text-white/80 placeholder:text-slate-400 dark:placeholder:text-white/25 focus:border-[#d4a843]/30 h-11 rounded-xl"
        />
      </div>
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-slate-400 dark:text-white/30 hidden sm:block" />
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setCategory(cat.value)}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
              category === cat.value
                ? "bg-[#d4a843]/15 text-[#f0d78c] border border-[#d4a843]/20"
                : "text-slate-600 dark:text-white/40 hover:text-slate-900 dark:hover:text-white/60 hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}