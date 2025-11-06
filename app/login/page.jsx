"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { login } from "@/lib/api";
import { setToken } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const from = searchParams.get("from") || "dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("이메일/비밀번호를 모두 입력해줘.");
      return;
    }
    setLoading(true);
    try {
      const res = await login(email, password);
      if (!res || !res.access_token) {
        throw new Error("토큰이 안 왔어. 백엔드 응답을 확인해봐.");
      }
      setToken(res.access_token);
      router.push(`/${from}`.replace("//", "/"));
    } catch (e) {
      setError(e.message || "로그인에 실패했어.");
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
            Welcome back 👋
          </h1>
          <p className="text-[10px] text-slate-400 mt-1">
            이미 등록된 이메일이라면 바로 로그인해서 연습 이어가면 된다.
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
            placeholder="8자 이상 추천"
          />
        </div>
        {error && (
          <p className="text-[9px] text-rose-400">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full text-xs"
        >
          {loading ? "로그인 중..." : "Login"}
        </button>
        <p className="text-[9px] text-slate-500 text-center">
          아직 계정 없어?{" "}
          <button
            type="button"
            onClick={() => router.push("/register")}
            className="text-sky-400 hover:text-sky-300 underline-offset-2 hover:underline"
          >
            회원가입
          </button>
        </p>
      </motion.form>
    </div>
  );
}
