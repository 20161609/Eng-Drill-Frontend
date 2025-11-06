"use client";

import { motion } from "framer-motion";

const CATEGORIES = [
  {
    id: "daily-life",
    label: "Daily Life",
    file: "/text/ko/daily_life.txt",
    gradient: "from-sky-500/80 to-emerald-400/80"
  },
  {
    id: "travel",
    label: "Travel",
    file: "/text/ko/travel.txt",
    gradient: "from-violet-500/80 to-sky-500/80"
  },
  {
    id: "job",
    label: "Job",
    file: "/text/ko/job.txt",
    gradient: "from-emerald-400/80 to-lime-300/80"
  },
  {
    id: "bank",
    label: "Bank",
    file: "/text/ko/bank.txt",
    gradient: "from-fuchsia-500/80 to-sky-400/80"
  },
  {
    id: "datetime",
    label: "Date & Time",
    file: "/text/ko/datetime.txt",
    gradient: "from-orange-400/80 to-pink-500/80"
  }
];

export default function CategorySelector({ selectedId, onSelect, count, onCountChange }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-sm font-semibold text-slate-200">
          1. 연습할 카테고리를 골라줘
        </h2>
        <div className="flex items-center gap-2 text-[10px] text-slate-400">
          <span className="hidden xs:inline">Pick your vibe</span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {CATEGORIES.map((cat) => {
          const isActive = cat.id === selectedId;
          return (
            <motion.button
              key={cat.id}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(cat)}
              className={`relative flex h-20 flex-col rounded-3xl border px-3 py-2 text-left text-[10px] sm:text-xs
                transition-all duration-200
                ${
                  isActive
                    ? "border-sky-400/80 bg-slate-900/80 shadow-ed-soft"
                    : "border-slate-800/80 bg-slate-950/60 hover:border-sky-500/40"
                }`}
            >
              <div
                className={`pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br ${cat.gradient} opacity-0 blur-2xl transition-opacity duration-300 ${
                  isActive ? "opacity-20" : ""
                }`}
              />
              <span className="font-semibold text-slate-100">{cat.label}</span>
              <span className="mt-auto text-[9px] text-slate-400">
                native-topic drills
              </span>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-3 flex flex-col gap-2 rounded-2xl bg-slate-950/70 px-3 py-3 border border-slate-800/80">
        <label className="text-[11px] font-medium text-slate-300">
          2. 오늘 몇 개 연습할까?
        </label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="5"
            max="40"
            step="5"
            value={count}
            onChange={(e) => onCountChange(parseInt(e.target.value, 10))}
            className="w-full accent-sky-400"
          />
          <div className="flex h-9 w-14 items-center justify-center rounded-2xl bg-slate-900/90 text-xs font-semibold text-sky-400 border border-slate-700/80">
            {count}
          </div>
        </div>
        <p className="text-[9px] text-slate-500">
          너무 욕심내지 말고, 꾸준히. 내일도 또 올 거잖아.
        </p>
      </div>
    </div>
  );
}

export { CATEGORIES };
