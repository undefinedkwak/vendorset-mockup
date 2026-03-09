"use client";
import { useState, useCallback } from "react";
import { User, ChevronRight } from "lucide-react";

type Mode = "DP-S" | "DP-F" | "DP-FA" | null;

export default function WorkPage() {
  const [isWorking, setIsWorking] = useState(false);
  const [mode, setMode] = useState<Mode>(null);
  const [loading, setLoading] = useState(false);

  const toggle = useCallback(() => {
    if (isWorking) {
      setIsWorking(false);
      setMode(null);
    } else {
      setLoading(true);
      setTimeout(() => {
        setIsWorking(true);
        setMode("DP-S");
        setLoading(false);
      }, 800);
    }
  }, [isWorking]);

  return (
    <div className="flex flex-col h-full relative" style={{ backgroundColor: "#EBEDEF" }}>
      {/* Map placeholder background */}
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundColor: "#E8E0D8" }}>
          {/* Map grid lines */}
          <svg className="w-full h-full opacity-[0.12]">
            {Array.from({ length: 25 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 36} x2="100%" y2={i * 36} stroke="#888" strokeWidth="0.5" />
            ))}
            {Array.from({ length: 14 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 36} y1="0" x2={i * 36} y2="100%" stroke="#888" strokeWidth="0.5" />
            ))}
          </svg>

          {/* Simulated road lines */}
          <div className="absolute top-[45%] left-0 right-0 h-[2px] bg-white/40" />
          <div className="absolute top-0 bottom-0 left-[55%] w-[2px] bg-white/40" />

          {/* My location dot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-[14px] h-[14px] rounded-full" style={{ backgroundColor: "#0D6DD8", boxShadow: "0 0 0 5px rgba(13,109,216,0.20), 0 0 0 10px rgba(13,109,216,0.08)" }} />
          </div>
        </div>

        {/* Top-left: 오더받기 Extended FAB with VDSSwitch */}
        <div className="absolute top-3 left-4 z-10">
          <button
            onClick={toggle}
            disabled={loading}
            className="h-11 rounded-full flex items-center gap-2.5 pl-4 pr-2 transition-all active:scale-[0.97]"
            style={{
              backgroundColor: isWorking ? "#0D6DD8" : "#FFFFFF",
              boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
            }}
          >
            <span
              className="text-[14px] font-bold whitespace-nowrap"
              style={{ color: isWorking ? "#FFFFFF" : "#121417" }}
            >
              {loading ? "연결 중..." : "오더받기"}
            </span>
            {/* VDS Switch (37x20 → 42x24 for web) */}
            <div
              className="w-[42px] h-[24px] rounded-full p-[2px] transition-colors duration-200"
              style={{
                backgroundColor: loading
                  ? "#FFC42E"
                  : isWorking
                  ? "#3EB21F"
                  : "rgba(18,20,23,0.15)",
              }}
            >
              <div
                className="w-5 h-5 rounded-full bg-white transition-transform duration-200"
                style={{
                  transform: isWorking || loading ? "translateX(18px)" : "translateX(0)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                }}
              />
            </div>
          </button>
        </div>

        {/* Top-right: 마이페이지 FAB */}
        <div className="absolute top-3 right-4 z-10">
          <button
            className="w-11 h-11 rounded-full bg-white flex items-center justify-center active:bg-black/5"
            style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.15)" }}
          >
            <User className="h-5 w-5" style={{ color: "#121417" }} />
          </button>
        </div>

        {/* Center banner: idle / loading / mode indicator */}
        {!isWorking && !loading && (
          <div className="absolute top-[72px] left-4 right-4 z-10">
            <div
              className="rounded-xl px-4 py-3 text-center"
              style={{ backgroundColor: "rgba(18,20,23,0.85)", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
            >
              <p className="text-[14px] font-medium text-white">
                오더 받기를 시작하세요!
              </p>
            </div>
          </div>
        )}

        {loading && (
          <div className="absolute top-[72px] left-4 right-4 z-10">
            <div
              className="rounded-xl px-4 py-3 text-center animate-pulse"
              style={{ backgroundColor: "#FFF4DB", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
            >
              <p className="text-[14px] font-medium" style={{ color: "#AD4A05" }}>
                모드 결정 중...
              </p>
            </div>
          </div>
        )}

        {isWorking && mode && (
          <div className="absolute top-[72px] left-4 right-4 z-10">
            <div
              className="rounded-xl px-4 py-3 flex items-center justify-between"
              style={{
                backgroundColor: mode === "DP-S" ? "#E7F2FE" : "#FFF4DB",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: mode === "DP-S" ? "#0D6DD8" : "#F98634" }}
                />
                <span
                  className="text-[14px] font-bold"
                  style={{ color: mode === "DP-S" ? "#073C78" : "#AD4A05" }}
                >
                  {mode === "DP-S" ? "세트 모드" : "프렌즈 모드"}
                </span>
              </div>
              {mode === "DP-S" && (
                <span className="text-[13px]" style={{ color: "rgba(18,20,23,0.60)" }}>
                  활성 3 / 30명
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom vendor info card (bottom sheet style) */}
      <div
        className="bg-white px-5 pt-5 pb-2 rounded-t-[20px] -mt-5 relative z-20"
        style={{ boxShadow: "0 -4px 16px rgba(0,0,0,0.08)" }}
      >
        {/* Drag handle */}
        <div className="flex justify-center -mt-2 mb-4">
          <div className="w-9 h-1 rounded-full" style={{ backgroundColor: "rgba(18,20,23,0.15)" }} />
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[13px]" style={{ color: "rgba(18,20,23,0.60)" }}>소속 벤더</p>
            <p className="text-[18px] font-bold mt-0.5" style={{ color: "#121417" }}>대한물류</p>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="px-2 py-0.5 rounded" style={{ backgroundColor: "#E7F2FE" }}>
              <span className="text-[12px] font-bold" style={{ color: "#073C78" }}>ACTIVE</span>
            </div>
            <ChevronRight className="h-4 w-4" style={{ color: "rgba(18,20,23,0.30)" }} />
          </div>
        </div>

        <div className="rounded-xl p-4 space-y-2.5" style={{ backgroundColor: "#F7F7F8" }}>
          <div className="flex justify-between">
            <span className="text-[13px]" style={{ color: "rgba(18,20,23,0.60)" }}>벤더 코드</span>
            <span className="text-[13px] font-medium" style={{ color: "#121417" }}>VC-2026-001</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[13px]" style={{ color: "rgba(18,20,23,0.60)" }}>권역</span>
            <span className="text-[13px] font-medium" style={{ color: "#121417" }}>강남B지점</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[13px]" style={{ color: "rgba(18,20,23,0.60)" }}>소속 기사</span>
            <span className="text-[13px] font-medium" style={{ color: "#121417" }}>5명 (활성 3명)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
