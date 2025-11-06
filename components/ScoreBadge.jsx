"use client";

import { motion } from "framer-motion";

function getLabel(score) {
  if (score >= 90) return "🔥 Native-ish. 진짜 잘했어.";
  if (score >= 75) return "👍 Very good. 디테일만 조금 더.";
  if (score >= 60) return "👌 괜찮아. 의미는 잘 전달돼.";
  if (score >= 40) return "🤔 애매해. 고쳐보자.";
  if (score > 0) return "🩹 위험해. 다시 한 번 정리해보자.";
  return "😅 모델이 뭔가 이상한데? 다시 시도해봐.";
}

export default function ScoreBadge({ score }) {
  const label = getLabel(score);
  let gradient = "from-slate-700 to-slate-900";
  if (score >= 90) gradient = "from-emerald-400 to-sky-400";
  else if (score >= 75) gradient = "from-sky-400 to-indigo-400";
  else if (score >= 60) gradient = "from-indigo-400 to-purple-500";
  else if (score >= 40) gradient = "from-amber-400 to-orange-500";
  else gradient = "from-rose-500 to-red-600";

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="mt-3 w-full"
    >
      <div className="flex items-center gap-3 rounded-3xl bg-slate-950/90 border border-slate-800/90 px-4 py-3 shadow-ed-soft">
        <div
          className={`flex h-10 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-sm font-bold text-slate-900`}
        >
          {Math.round(score)}
        </div>
        <div className="flex flex-col text-[10px] sm:text-xs text-slate-200">
          <span className="font-semibold">AI Score</span>
          <span className="text-slate-400">{label}</span>
        </div>
      </div>
    </motion.div>
  );
}
