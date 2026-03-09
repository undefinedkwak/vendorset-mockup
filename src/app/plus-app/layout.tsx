"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserPlus, Home, Package, Wallet, ChevronLeft, Signal, Wifi, Battery } from "lucide-react";

const navItems = [
  { href: "/plus-app/work", label: "홈", icon: Home },
  { href: "/plus-app/offer", label: "배차", icon: Package },
  { href: "/plus-app/mcash", label: "M캐시", icon: Wallet },
  { href: "/plus-app/register", label: "등록", icon: UserPlus },
];

const pageTitles: Record<string, string> = {
  "/plus-app/register": "벤더 등록",
  "/plus-app/work": "",
  "/plus-app/offer": "배차 오퍼",
  "/plus-app/mcash": "M캐시",
};

export default function PlusAppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const title = pageTitles[pathname] || "Plus App";
  const isHome = pathname === "/plus-app/work";

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <div
        className="min-h-screen flex justify-center"
        style={{ backgroundColor: "#EBEDEF", fontFamily: "'Noto Sans KR', sans-serif" }}
      >
        <div className="w-full max-w-[390px] bg-white min-h-screen flex flex-col shadow-2xl relative overflow-hidden">
          {/* iOS Status Bar */}
          <div className="h-11 flex items-end justify-between px-6 pb-1 bg-white shrink-0">
            <span className="text-xs font-bold" style={{ color: "#121417" }}>9:41</span>
            <div className="flex items-center gap-1">
              <Signal className="h-3.5 w-3.5" style={{ color: "#121417" }} />
              <Wifi className="h-3.5 w-3.5" style={{ color: "#121417" }} />
              <Battery className="h-3.5 w-3.5" style={{ color: "#121417" }} />
            </div>
          </div>

          {/* VDS TopAppBar - 56px (hidden on home/map screen) */}
          {!isHome && (
            <div
              className="h-14 flex items-center px-4 shrink-0 relative bg-white"
              style={{ borderBottom: "1px solid rgba(18,20,23,0.10)" }}
            >
              <Link
                href="/"
                className="w-10 h-10 flex items-center justify-center -ml-2 rounded-full active:bg-black/5"
              >
                <ChevronLeft className="h-6 w-6" style={{ color: "#121417" }} />
              </Link>
              <span
                className="absolute left-1/2 -translate-x-1/2 text-[16px] font-bold tracking-tight"
                style={{ color: "#121417" }}
              >
                {title}
              </span>
              <div className="w-10" />
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-auto">{children}</div>

          {/* VDS Bottom Tab Bar */}
          <nav
            className="h-[52px] grid grid-cols-4 shrink-0 bg-white"
            style={{ borderTop: "1px solid rgba(18,20,23,0.10)" }}
          >
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex flex-col items-center justify-center gap-0.5 active:bg-black/5"
                >
                  <item.icon
                    className="h-5 w-5"
                    style={{ color: isActive ? "#0D6DD8" : "rgba(18,20,23,0.60)" }}
                  />
                  <span
                    className="text-[10px] tracking-wide"
                    style={{
                      color: isActive ? "#0D6DD8" : "rgba(18,20,23,0.60)",
                      fontWeight: isActive ? 700 : 500,
                    }}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Home Indicator */}
          <div className="h-[34px] flex items-center justify-center bg-white shrink-0">
            <div className="w-[134px] h-[5px] rounded-full bg-black/20" />
          </div>
        </div>
      </div>
    </>
  );
}
