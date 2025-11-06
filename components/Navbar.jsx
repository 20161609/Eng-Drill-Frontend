"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { clearToken, getToken } from "@/lib/auth";
import { motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    setAuthed(!!getToken());
  }, [pathname]);

  const handleLogout = () => {
    clearToken();
    setAuthed(false);
    router.push("/");
  };

  const isActive = (href) =>
    pathname === href ? "text-sky-400" : "text-slate-400 hover:text-sky-300";

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-30"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-2xl bg-gradient-to-br from-sky-500 to-emerald-400 shadow-ed-soft" />
          <Link href="/" className="font-semibold tracking-tight text-slate-100">
            Eng-Drill
          </Link>
        </div>
        <nav className="flex items-center gap-4 text-xs sm:text-sm">
          <Link href="/" className={isActive("/")}>
            Home
          </Link>
          {authed && (
            <Link href="/dashboard" className={isActive("/dashboard")}>
              Playground
            </Link>
          )}
          {!authed && (
            <>
              <Link href="/login" className={isActive("/login")}>
                Login
              </Link>
              <Link href="/register" className="hidden sm:inline-flex text-sky-400 hover:text-sky-300">
                Sign up
              </Link>
            </>
          )}
          {authed && (
            <button
              onClick={handleLogout}
              className="rounded-2xl border border-slate-700/80 px-3 py-1.5 text-[10px] sm:text-xs text-slate-300 hover:bg-slate-900/80 hover:text-sky-300 transition-all"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </motion.header>
  );
}
