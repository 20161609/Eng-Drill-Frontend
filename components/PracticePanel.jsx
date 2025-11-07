"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { getToken } from "@/lib/auth";
import { loadCategorySentences, scoreSentence } from "@/lib/api";
import ScoreBadge from "./ScoreBadge";

export default function PracticePanel({ category, count }) {
  const [sentences, setSentences] = useState([]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scoring, setScoring] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const current = sentences[index] || null;

  async function handleStart() {
    if (!category) {
      setError("카테고리를 먼저 골라줘.");
      return;
    }
    setError("");
    setMessage("");
    setScore(null);
    setAnswer("");
    setLoading(true);
    try {
      const lines = await loadCategorySentences(category.file);
      const unique = Array.from(new Set(lines));
      const shuffled = unique.sort(() => 0.5 - Math.random());
      const slice = shuffled.slice(0, Math.max(1, count || 10));
      setSentences(slice);
      setIndex(0);
      setMessage(`"${category.label}"에서 ${slice.length}개 문장을 가져왔어. 가보자.`);
    } catch (e) {
      setError(e.message || "문장을 불러오는데 실패했어.");
    } finally {
      setLoading(false);
    }
  }

  async function handleScore() {
    if (!current) {
      setError("먼저 연습을 시작해줘.");
      return;
    }
    if (!answer.trim()) {
      setError("영어 문장을 한 줄이라도 적어줘.");
      return;
    }
    const token = getToken();
    if (!token) {
      setError("로그인이 만료된 것 같아. 다시 로그인해줘.");
      return;
    }
    setError("");
    setMessage("");
    setScoring(true);
    setScore(null);
    try {
      const res = await scoreSentence(token, {
        src: current,
        mt: answer.trim(),
      });
      const s =
        typeof res === "object" && res !== null && "score" in res
          ? res.score
          : null;
      if (s === null || Number.isNaN(Number(s))) {
        throw new Error("점수를 읽을 수 없어요. 백엔드를 확인해봐.");
      }
      setScore(Number(s));
    } catch (e) {
      setError(e.message || "채점 중 에러가 났어.");
    } finally {
      setScoring(false);
    }
  }

  function handleNext() {
    if (!sentences.length) return;
    const nextIdx = index + 1;
    if (nextIdx >= sentences.length) {
      setMessage("오늘 분량 끝! 저장 버튼 만들어서 기록도 남기자 😉 (나중에) ");
      setIndex(sentences.length - 1);
      return;
    }
    setIndex(nextIdx);
    setAnswer("");
    setScore(null);
    setMessage("");
    setError("");
  }

  // ✅ textarea 단축키 핸들러
  function handleTextareaKeyDown(e) {
    // Ctrl+Enter / Cmd+Enter -> 채점
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      if (!scoring && current) {
        handleScore();
      }
      return;
    }
    // Alt+Enter -> 다음 문장
    if (e.altKey && e.key === "Enter") {
      e.preventDefault();
      if (sentences.length) {
        handleNext();
      }
      return;
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mt-5 card"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-100">
            3. 번역 연습 시작
          </h2>
          <p className="text-[9px] text-slate-500">
            아래 한국어 문장을 자연스러운 영어로 바꿔봐. AI가 바로 점수 매겨준다.
          </p>
        </div>
        <button
          onClick={handleStart}
          disabled={loading}
          className="btn-primary text-[10px] sm:text-xs"
        >
          {loading ? "불러오는 중..." : "세션 시작"}
        </button>
      </div>

      <div className="mt-4 space-y-3">
        <div className="rounded-2xl bg-slate-950/90 border border-slate-800/80 px-3 py-3">
          <div className="mb-1 flex items-center justify-between gap-2 text-[9px] text-slate-500">
            <span>KR Sentence</span>
            <span>
              {sentences.length
                ? `${index + 1} / ${sentences.length}`
                : "아직 세션 없음"}
            </span>
          </div>
          <p
            className="text-xs sm:text-sm text-slate-100 min-h-[40px]"
            translate="no"
          >
            {current || "카테고리와 개수 정하고 [세션 시작] 눌러줘."}
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="text-[9px] text-slate-400 flex items-center gap-2">
            Your English
            <span className="text-[7px] text-slate-500">
              ⌃/⌘ + Enter = 채점 · ⌥ + Enter = 다음
            </span>
          </label>
          <textarea
            rows={3}
            className="input min-h-[70px] resize-y"
            placeholder="여기에 영어로 번역을 적어봐."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={handleTextareaKeyDown}
          />
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <button
            onClick={handleScore}
            disabled={scoring || !current}
            className="btn-primary text-[10px] sm:text-xs"
          >
            {scoring ? "채점 중..." : "AI 채점하기 (ctrl+Enter)"}
          </button>
          <button
            onClick={handleNext}
            disabled={!sentences.length}
            className="btn-ghost text-[10px] sm:text-xs"
          >
            다음 문장 (alt+Enter)
          </button>
          {sentences.length > 0 && (
            <span className="ml-auto text-[8px] text-slate-500">
              토큰은 브라우저에만 저장돼. 새 창에서 로그인 다시 필요할 수 있음.
            </span>
          )}
        </div>

        {score !== null && <ScoreBadge score={score} />}
        {message && (
          <p className="mt-2 text-[9px] text-emerald-400/90">{message}</p>
        )}
        {error && (
          <p className="mt-2 text-[9px] text-rose-400/90">{error}</p>
        )}
      </div>
    </motion.div>
  );
}
