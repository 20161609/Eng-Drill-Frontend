"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AuthGuard from "@/components/AuthGuard";
import CategorySelector from "@/components/CategorySelector";
import PracticePanel from "@/components/PracticePanel";

export default function DashboardPage() {
  const [selectedCat, setSelectedCat] = useState(null);
  const [count, setCount] = useState(15);

  return (
    <AuthGuard>
      <div className="flex flex-col gap-5 py-4">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="card"
        >
          <div className="flex flex-wrap items-center gap-3 justify-between">
            <div>
              <h1 className="text-lg font-semibold text-slate-50">
                Eng-Drill Playground
              </h1>
              <p className="text-[9px] text-slate-400 mt-1">
                카테고리 고르고, 오늘 연습할 개수 정하고, AI한테 바로 채점 받자.
              </p>
            </div>
            <div className="flex flex-col items-end text-[8px] text-slate-500">
              <span>FastAPI · Cloud Run · QE Model</span>
              <span className="text-sky-400/90">
                토큰 기반 인증 · CORS Ready
              </span>
            </div>
          </div>
        </motion.div>

        <CategorySelector
          selectedId={selectedCat?.id}
          onSelect={setSelectedCat}
          count={count}
          onCountChange={setCount}
        />

        <PracticePanel category={selectedCat} count={count} />
      </div>
    </AuthGuard>
  );
}
