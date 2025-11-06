"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { register } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [okMessage, setOkMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setOkMessage("");
    if (!email || !password) {
      setError("이메일/비밀번호를 모두 입력해줘.");
      return;
    }
    setLoading(true);
    try {
      await register(email, password);
      setOkMessage("가입 완료! 이메일로 온 인증 링크만 확인해주면 된다.");
      setTimeout(() => {
        router.push("/login");
      }, 1200);
    } catch (e) {
      setError(e.message || "회원가입에 실패했어.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center py-10">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="card w-full max-w-sm space-y-4"
      >
        <div>
          <h1 className="text-xl font-semibold text-slate-50">
            Create your Eng-Drill ID
          </h1>
          <p className="text-[10px] text-slate-400 mt-1">
            이메일 하나면 끝. 나중에 취업용 이메일로 갈아타도 된다.
          </p>
        </div>
        <div className="space-y-2">
          <label className="text-[9px] text-slate-400">Email</label>
          <input
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[9px] text-slate-400">Password</label>
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="8자 이상, 네가 기억할 수 있게."
          />
        </div>
        {error && (
          <p className="text-[9px] text-rose-400">
            {error}
          </p>
        )}
        {okMessage && (
          <p className="text-[9px] text-emerald-400">
            {okMessage}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full text-xs"
        >
          {loading ? "처리 중..." : "Sign up"}
        </button>
        <p className="text-[9px] text-slate-500 text-center">
          이미 계정 있어?{" "}
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="text-sky-400 hover:text-sky-300 underline-offset-2 hover:underline"
          >
            로그인
          </button>
        </p>
      </motion.form>
    </div>
  );
}
