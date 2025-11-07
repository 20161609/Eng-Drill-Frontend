"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-10">
      <div className="grid w-full grid-cols-1 items-center gap-8 md:grid-cols-[1.4fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="space-y-5"
        >
          <div className="inline-flex items-center gap-2 rounded-2xl border border-sky-500/40 bg-slate-950/70 px-3 py-1.5 text-[9px] text-sky-300/90 shadow-ed-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            KR → EN 워홀러 실전 번역 드릴 박스
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-slate-50">
            실전 문장으로 <span className="text-sky-400">번역 감각</span>을
            키우는 <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
              Eng-Drill Playground
            </span>
          </h1>
          <p className="max-w-xl text-xs sm:text-sm text-slate-400">
            <br className="hidden sm:block" />
            워홀/이민/취업에 바로 쓰이는 한국어 문장을 뽑아서,
            <span className="text-sky-300"> 네 번역을 AI가 0~100점으로 바로 채점</span>해준다.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/dashboard" className="btn-primary text-xs">
              바로 연습 시작하기
            </Link>
            <Link href="/login" className="btn-ghost text-[10px] sm:text-xs">
              이미 계정 있어요
            </Link>
          </div>
          <div className="mt-3 flex flex-wrap gap-4 text-[8px] sm:text-[9px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              FastAPI + Cloud Run 백엔드 연동
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              로그인 후 토큰으로 안전하게 채점
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
              모바일 웹 완전 대응
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card relative overflow-hidden"
        >
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-sky-500/30 to-emerald-400/5 blur-3xl" />
          <p className="text-[9px] uppercase tracking-[0.18em] text-sky-400 mb-1">
            Live Preview
          </p>
          <p className="text-xs text-slate-300 mb-3">
            로그인하면 이런 느낌으로 문장이 흘러온다.
          </p>
          <div className="space-y-2 text-[9px]">
            <div className="rounded-2xl bg-slate-950/90 px-3 py-2 border border-slate-800/80">
              <div className="flex items-center justify-between text-slate-500">
                <span>KR</span>
                <span className="text-[8px] text-sky-400">Daily Life #03</span>
              </div>
              <p className="mt-1 text-slate-100" translate="no">
                오늘 면접이 오후 3시에 있는데, 길이 막히면 안 돼요.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-950/90 px-3 py-2 border border-slate-800/80">
              <div className="flex items-center justify-between text-slate-500">
                <span>YOU</span>
                <span className="text-[8px] text-slate-500">Draft</span>
              </div>
              <p className="mt-1 text-slate-100">
                I have an interview at 3 p.m. today, so I really hope there is no traffic.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-14 rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-400 text-[10px] font-bold text-slate-900 flex items-center justify-center">
                94
              </div>
              <span className="text-[8px] text-slate-300">
                🔥 Native-ish. 진짜 잘했다.
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
