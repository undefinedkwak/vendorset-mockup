"use client";
import { useState, useEffect, useCallback } from "react";
import { dispatchOffers } from "@/lib/mock-data";
import { Clock, RefreshCw, CheckCircle, XCircle, AlertTriangle, X } from "lucide-react";

type OfferState = "waiting" | "active" | "accepted" | "rejected" | "expired";

export default function OfferPage() {
  const [state, setState] = useState<OfferState>("waiting");
  const [timer, setTimer] = useState(30);
  const offer = dispatchOffers[0];

  useEffect(() => {
    if (state !== "active") return;
    if (timer <= 0) {
      setState("expired");
      return;
    }
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [state, timer]);

  const reset = useCallback(() => {
    setState("active");
    setTimer(30);
  }, []);

  const progress = (timer / 30) * 100;

  // Result screens (accepted, rejected, expired)
  const resultScreen = (
    icon: React.ReactNode,
    bg: string,
    title: string,
    titleColor: string,
    subtitle?: string,
  ) => (
    <div
      className="bg-white rounded-t-[20px] -mt-[60%] relative z-10"
      style={{ boxShadow: "0 -4px 16px rgba(0,0,0,0.12)" }}
    >
      <div className="flex justify-center pt-3 pb-1">
        <div className="w-9 h-1 rounded-full" style={{ backgroundColor: "rgba(18,20,23,0.15)" }} />
      </div>
      <div className="flex flex-col items-center py-12 px-5">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
          style={{ backgroundColor: bg }}
        >
          {icon}
        </div>
        <p className="text-[18px] font-bold" style={{ color: titleColor }}>
          {title}
        </p>
        {subtitle && (
          <p className="text-[14px] mt-1.5" style={{ color: "rgba(18,20,23,0.60)" }}>
            {subtitle}
          </p>
        )}
        <button
          className="mt-8 h-12 px-6 rounded-xl text-[14px] font-medium flex items-center gap-2 active:opacity-90"
          style={{ backgroundColor: "#ECF1F8", color: "#073C78" }}
          onClick={reset}
        >
          <RefreshCw className="h-4 w-4" />
          새 오퍼 시뮬레이션
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: "#E8E0D8" }}>
      {/* Map background */}
      <div className="flex-1 relative overflow-hidden">
        <svg className="w-full h-full opacity-[0.12]">
          {Array.from({ length: 25 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 36} x2="100%" y2={i * 36} stroke="#888" strokeWidth="0.5" />
          ))}
          {Array.from({ length: 14 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 36} y1="0" x2={i * 36} y2="100%" stroke="#888" strokeWidth="0.5" />
          ))}
        </svg>
        {/* Store pin */}
        <div className="absolute top-[38%] left-[45%]">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#308A18", boxShadow: "0 0 0 3px rgba(48,138,24,0.2)" }} />
        </div>
        {/* Customer pin */}
        <div className="absolute top-[55%] left-[62%]">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#AD4A05", boxShadow: "0 0 0 3px rgba(173,74,5,0.2)" }} />
        </div>
      </div>

      {/* Waiting state */}
      {state === "waiting" && (
        <div
          className="bg-white rounded-t-[20px] -mt-[60%] relative z-10"
          style={{ boxShadow: "0 -4px 16px rgba(0,0,0,0.12)" }}
        >
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-9 h-1 rounded-full" style={{ backgroundColor: "rgba(18,20,23,0.15)" }} />
          </div>
          <div className="flex flex-col items-center py-12 px-5">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: "#E7F2FE" }}
            >
              <Clock className="h-7 w-7 animate-pulse" style={{ color: "#0D6DD8" }} />
            </div>
            <p className="text-[18px] font-bold" style={{ color: "#121417" }}>
              배차 대기 중
            </p>
            <p className="text-[14px] mt-1.5" style={{ color: "rgba(18,20,23,0.60)" }}>
              새 오퍼가 도착하면 알림이 울립니다
            </p>
            <button
              className="mt-8 h-12 px-6 rounded-xl text-[14px] font-medium flex items-center gap-2 active:opacity-90"
              style={{ backgroundColor: "#ECF1F8", color: "#073C78" }}
              onClick={reset}
            >
              <RefreshCw className="h-4 w-4" />
              오퍼 시뮬레이션
            </button>
          </div>
        </div>
      )}

      {/* Active offer state */}
      {state === "active" && (
        <div
          className="bg-white rounded-t-[20px] -mt-[75%] relative z-10"
          style={{ boxShadow: "0 -4px 16px rgba(0,0,0,0.12)" }}
        >
          {/* Drag handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-9 h-1 rounded-full" style={{ backgroundColor: "rgba(18,20,23,0.15)" }} />
          </div>

          <div className="px-5 pt-3 pb-0">
            {/* Badge row */}
            <div className="flex gap-1.5 mb-2">
              <span
                className="px-2 py-[3px] rounded text-[10px] font-bold"
                style={{ backgroundColor: "#ECF1F8", color: "#073C78" }}
              >
                세트배차
              </span>
              <span
                className="px-2 py-[3px] rounded text-[10px] font-bold"
                style={{ backgroundColor: "#E7F2FE", color: "#0D6DD8" }}
              >
                {offer.orderNumber}
              </span>
            </div>

            {/* Store name - Body1_Bold (18sp) */}
            <p className="text-[18px] font-bold mb-1" style={{ color: "#121417" }}>
              강남구 역삼동 맛있는 치킨
            </p>

            {/* Delivery fee - H2_Bold (28sp) — the most prominent element */}
            <p className="text-[28px] font-bold tracking-tight" style={{ color: "#121417" }}>
              {offer.estimatedFee.toLocaleString()}원
            </p>

            {/* Distance - Body4_Regular (13sp) */}
            <p className="text-[13px] mt-0.5" style={{ color: "rgba(18,20,23,0.60)" }}>
              {(offer.distanceMeters / 1000).toFixed(1)}km · 강남구 삼성동
            </p>

            {/* Route info card */}
            <div className="mt-4 rounded-xl p-3.5 space-y-0" style={{ backgroundColor: "#F7F7F8" }}>
              {/* Pickup */}
              <div className="flex items-start gap-2.5">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ backgroundColor: "#308A18" }}
                >
                  <span className="text-[10px] font-bold text-white">P</span>
                </div>
                <div>
                  <p className="text-[12px]" style={{ color: "rgba(18,20,23,0.60)" }}>픽업</p>
                  <p className="text-[14px] font-medium" style={{ color: "#121417" }}>
                    {offer.pickupAddress}
                  </p>
                </div>
              </div>

              {/* Dashed connector */}
              <div
                className="ml-[9px] h-3 border-l-[1.5px] border-dashed"
                style={{ borderColor: "rgba(18,20,23,0.15)" }}
              />

              {/* Delivery */}
              <div className="flex items-start gap-2.5">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ backgroundColor: "#AD4A05" }}
                >
                  <span className="text-[10px] font-bold text-white">D</span>
                </div>
                <div>
                  <p className="text-[12px]" style={{ color: "rgba(18,20,23,0.60)" }}>배달</p>
                  <p className="text-[14px] font-medium" style={{ color: "#121417" }}>
                    {offer.deliveryAddress}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="h-px mt-5" style={{ backgroundColor: "rgba(18,20,23,0.10)" }} />

          {/* Bottom action buttons (88dp height area) */}
          <div className="h-[88px] flex items-center gap-3 px-5">
            {/* Reject button (64dp width) */}
            <button
              className="w-16 h-14 rounded-xl flex items-center justify-center shrink-0 active:opacity-80 transition-opacity"
              style={{ backgroundColor: "#F7F7F8" }}
              onClick={() => setState("rejected")}
            >
              <X className="h-6 w-6" style={{ color: "rgba(18,20,23,0.60)" }} />
            </button>

            {/* Accept timer button (fills remaining width) */}
            <button
              className="flex-1 h-14 rounded-xl relative overflow-hidden flex items-center justify-center active:opacity-90 transition-opacity"
              style={{ backgroundColor: "#0D6DD8" }}
              onClick={() => setState("accepted")}
            >
              {/* Progress overlay: shrinks from right as time decreases */}
              <div
                className="absolute inset-0 transition-transform duration-1000 ease-linear origin-left"
                style={{
                  backgroundColor: "rgba(0,0,0,0.20)",
                  transform: `scaleX(${1 - progress / 100})`,
                  transformOrigin: "right",
                }}
              />
              <div className="relative flex items-center gap-3">
                <span className="text-[16px] font-bold text-white">수락</span>
                <div className="w-px h-5 bg-white/40" />
                <span
                  className="text-[16px] font-bold"
                  style={{ color: timer <= 10 ? "#FF8A8A" : "rgba(255,255,255,0.9)" }}
                >
                  {timer}초
                </span>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Accepted */}
      {state === "accepted" &&
        resultScreen(
          <CheckCircle className="h-8 w-8" style={{ color: "#3EB21F" }} />,
          "#F0FDF4",
          "배차를 수락했습니다",
          "#3EB21F",
          offer.orderNumber,
        )}

      {/* Rejected */}
      {state === "rejected" &&
        resultScreen(
          <XCircle className="h-8 w-8" style={{ color: "#E0433E" }} />,
          "#FFF0F0",
          "배차를 거절했습니다",
          "#121417",
        )}

      {/* Expired */}
      {state === "expired" &&
        resultScreen(
          <AlertTriangle className="h-8 w-8" style={{ color: "#F98634" }} />,
          "#FFF4DB",
          "응답 시간 초과",
          "#F76B08",
          "30초 타임아웃 (만료 = 거절 처리)",
        )}
    </div>
  );
}
