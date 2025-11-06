"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace("/login?from=dashboard");
    } else {
      setOk(true);
    }
  }, [router]);

  if (!ok) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-slate-400 text-sm">
        Checking your session...
      </div>
    );
  }

  return children;
}
