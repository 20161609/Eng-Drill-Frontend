import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Eng-Drill | KR-EN Translation Playground",
  description: "Practice real-life KR-EN translation with instant AI scoring."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[radial-gradient(circle_at_top,_#1e293b_0,_#020817_45%,_#000_100%)] text-slate-100">
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.09),transparent_55%)] pointer-events-none" />
        <Navbar />
        <main className="mx-auto flex min-h-[calc(100vh-60px)] max-w-6xl flex-col px-4 pb-10 pt-2">
          {children}
        </main>
      </body>
    </html>
  );
}
