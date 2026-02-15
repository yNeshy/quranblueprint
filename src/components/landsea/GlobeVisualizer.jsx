import React from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Sea (بحر)", value: 32, percentage: "71.1%", color: "#1e3a5f" },
  { name: "Land (بر)", value: 13, percentage: "28.9%", color: "#d4a843" },
];

const COLORS = ["#1e3a5f", "#d4a843"];

export default function GlobeVisualizer() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Pie Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-[#151b30] border border-slate-200 dark:border-white/5 rounded-2xl p-8 flex flex-col items-center"
      >
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white/80 mb-6">Quranic Ratio</h3>
        <div className="w-64 h-64 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={3}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white dark:bg-[#0d1221] border border-slate-200 dark:border-white/10 rounded-lg p-3 text-sm">
                        <p className="text-slate-900 dark:text-white/80 font-medium">{payload[0].name}</p>
                        <p className="text-[#d4a843]">{payload[0].payload.percentage} ({payload[0].value} mentions)</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-3xl font-bold gold-gradient">45</p>
            <p className="text-xs text-slate-600 dark:text-white/30">Total mentions</p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-8 mt-6">
          {data.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: COLORS[i] }} />
              <span className="text-sm text-slate-600 dark:text-white/50">{item.name}</span>
              <span className="text-sm font-semibold text-slate-900 dark:text-white/80">{item.percentage}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Earth comparison */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white dark:bg-[#151b30] border border-slate-200 dark:border-white/5 rounded-2xl p-8 flex flex-col items-center"
      >
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white/80 mb-6">Earth's Actual Ratio</h3>
        <div className="w-64 h-64 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[
                  { name: "Sea", value: 71.1 },
                  { name: "Land", value: 28.9 },
                ]}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={3}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
                stroke="none"
              >
                <Cell fill="#1e3a5f" />
                <Cell fill="#d4a843" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-lg font-bold text-slate-700 dark:text-white/70">🌍</p>
            <p className="text-xs text-slate-600 dark:text-white/30 mt-1">Scientific Data</p>
          </div>
        </div>

        <div className="flex items-center gap-8 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#1e3a5f]" />
            <span className="text-sm text-slate-600 dark:text-white/50">Water</span>
            <span className="text-sm font-semibold text-slate-900 dark:text-white/80">71.1%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#d4a843]" />
            <span className="text-sm text-slate-600 dark:text-white/50">Land</span>
            <span className="text-sm font-semibold text-slate-900 dark:text-white/80">28.9%</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}