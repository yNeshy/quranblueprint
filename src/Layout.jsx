import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "./utils";
import { BookOpen, BarChart3, Globe, FileText, Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { name: "Dashboard", icon: BarChart3, page: "Dashboard" },
  { name: "Land & Sea", icon: Globe, page: "LandSea" },
  { name: "Methodology", icon: FileText, page: "Methodology" },
];

export default function Layout({ children, currentPageName }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0e1a] text-slate-900 dark:text-white transition-colors duration-300" dir="ltr">
      <style>{`
        :root {
          --gold: #d4a843;
          --gold-light: #f0d78c;
          --navy: #0a0e1a;
          --navy-light: #121829;
          --navy-card: #151b30;
          --accent-blue: #1e3a5f;
        }
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Amiri:wght@400;700&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .font-amiri { font-family: 'Amiri', serif; }
        .gold-gradient { background: linear-gradient(135deg, #d4a843, #f0d78c); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .card-glow { box-shadow: 0 0 40px rgba(212, 168, 67, 0.05); }
        .card-glow:hover { box-shadow: 0 0 60px rgba(212, 168, 67, 0.12); }
        
        /* Light mode scrollbar */
        :root:not(.dark) ::-webkit-scrollbar { width: 6px; }
        :root:not(.dark) ::-webkit-scrollbar-track { background: #f3f4f6; }
        :root:not(.dark) ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 3px; }
        :root:not(.dark) ::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
        
        /* Dark mode scrollbar */
        :root.dark ::-webkit-scrollbar { width: 6px; }
        :root.dark ::-webkit-scrollbar-track { background: var(--navy); }
        :root.dark ::-webkit-scrollbar-thumb { background: #2a3454; border-radius: 3px; }
      `}</style>

      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-white/5 bg-white/80 dark:bg-[#0a0e1a]/80 backdrop-blur-xl transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to={createPageUrl("Dashboard")} className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#d4a843] to-[#f0d78c] flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-[#0a0e1a]" />
              </div>
              <div>
                <h1 className="text-sm font-semibold tracking-wide text-slate-900 dark:text-white/90 group-hover:text-slate-700 dark:group-hover:text-white transition-colors">
                  The Quranic Blueprint
                </h1>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#d4a843]/60">
                  Numerical Verification Engine
                </p>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              <nav className="flex items-center gap-1">
                {navItems.map((item) => {
                  const isActive = currentPageName === item.page;
                  return (
                    <Link
                      key={item.page}
                      to={createPageUrl(item.page)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-[#d4a843]/10 text-[#d4a843] dark:text-[#f0d78c]"
                          : "text-slate-600 dark:text-white/50 hover:text-slate-900 dark:hover:text-white/80 hover:bg-slate-100 dark:hover:bg-white/5"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
              <div className="ml-4 pl-4 border-l border-slate-200 dark:border-white/5">
                <ThemeToggle />
              </div>
            </div>

            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-lg text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-white/5 bg-white/95 dark:bg-[#0a0e1a]/95 backdrop-blur-xl transition-colors duration-300">
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => {
                const isActive = currentPageName === item.page;
                return (
                  <Link
                    key={item.page}
                    to={createPageUrl(item.page)}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-[#d4a843]/10 text-[#d4a843] dark:text-[#f0d78c]"
                        : "text-slate-600 dark:text-white/50 hover:text-slate-900 dark:hover:text-white/80 hover:bg-slate-100 dark:hover:bg-white/5"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      <main className="min-h-[calc(100vh-4rem)]">{children}</main>
    </div>
  );
}