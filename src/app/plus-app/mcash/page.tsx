"use client";
import { useState } from "react";
import { mcashHistory } from "@/lib/mock-data";
import { Wallet, Info } from "lucide-react";

type Tab = "수행내역" | "M캐시정산";

export default function MCashPage() {
  const [tab, setTab] = useState<Tab>("수행내역");

  const mcashItems = mcashHistory.filter((m) => m.dispatchSource === "FRIENDS");
  const mcashTotal = mcashItems.reduce((a, m) => a + m.amount, 0);

  return (
    <div className="flex flex-col h-full">
      {/* M캐시 잔액 카드 (MyPage M-cash card pattern) */}
      <div className="px-5 pt-5 pb-4">
        <div className="rounded-xl p-4" style={{ backgroundColor: "#F7F7F8" }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded flex items-center justify-center"
                style={{ backgroundColor: "#0D6DD8" }}
              >
                <Wallet className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-[14px] font-medium" style={{ color: "rgba(18,20,23,0.60)" }}>
                M캐시 잔액
              </span>
            </div>
            <button className="text-[14px] font-medium" style={{ color: "#2786F2" }}>
              내 지갑 보기
            </button>
          </div>
          <p
            className="text-[28px] font-bold tracking-tight mt-2"
            style={{ color: "#121417" }}
          >
            {mcashTotal.toLocaleString("ko-KR")}원
          </p>
        </div>
      </div>

      {/* Section divider (Background3 8dp) */}
      <div className="h-2" style={{ backgroundColor: "#EBEDEF" }} />

      {/* Tab bar */}
      <div
        className="flex h-12 shrink-0"
        style={{ borderBottom: "1px solid rgba(18,20,23,0.10)" }}
      >
        {(["수행내역", "M캐시정산"] as Tab[]).map((t) => (
          <button
            key={t}
            className="flex-1 text-[14px] font-medium relative transition-colors"
            style={{ color: tab === t ? "#0D6DD8" : "rgba(18,20,23,0.60)" }}
            onClick={() => setTab(t)}
          >
            {t}
            {tab === t && (
              <div
                className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full"
                style={{ backgroundColor: "#0D6DD8" }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-auto">
        {tab === "수행내역" ? (
          <div className="px-5 py-4">
            <p className="text-[13px] mb-3" style={{ color: "rgba(18,20,23,0.60)" }}>
              전체 배송 수행 내역
            </p>
            {mcashHistory.map((m, i) => (
              <div key={m.id}>
                <div className="py-3.5 flex items-center justify-between">
                  <div>
                    <p className="text-[14px] font-medium" style={{ color: "#121417" }}>
                      {m.orderNumber}
                    </p>
                    <p className="text-[12px] mt-0.5" style={{ color: "rgba(18,20,23,0.60)" }}>
                      {m.completedAt}
                    </p>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1">
                    <span
                      className="px-2 py-[3px] rounded text-[10px] font-bold"
                      style={{
                        backgroundColor:
                          m.dispatchSource === "SET" ? "#ECF1F8" : "#FFF4DB",
                        color: m.dispatchSource === "SET" ? "#073C78" : "#AD4A05",
                      }}
                    >
                      {m.dispatchSource === "SET" ? "세트" : "프렌즈"}
                    </span>
                    {m.dispatchSource === "SET" ? (
                      <span className="text-[12px]" style={{ color: "rgba(18,20,23,0.60)" }}>
                        벤더 정산
                      </span>
                    ) : (
                      <span className="text-[16px] font-bold" style={{ color: "#121417" }}>
                        {m.amount.toLocaleString("ko-KR")}원
                      </span>
                    )}
                  </div>
                </div>
                {i < mcashHistory.length - 1 && (
                  <div className="h-px" style={{ backgroundColor: "rgba(18,20,23,0.06)" }} />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="px-5 py-4">
            {/* Warning banner (VDS Warning badge pattern) */}
            <div
              className="rounded-xl p-3.5 flex items-start gap-2.5 mb-4"
              style={{ backgroundColor: "#FFF4DB" }}
            >
              <Info className="h-4 w-4 mt-0.5 shrink-0" style={{ color: "#F76B08" }} />
              <p
                className="text-[12px] leading-relaxed"
                style={{ color: "#AD4A05" }}
              >
                세트(DP-S) 수행분은 벤더장을 통해 별도 정산됩니다. M캐시에는
                프렌즈(DP-F/DP-FA) 수행분만 표시됩니다.
              </p>
            </div>

            {mcashItems.length === 0 ? (
              <div className="flex flex-col items-center py-16">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-3"
                  style={{ backgroundColor: "#F7F7F8" }}
                >
                  <Wallet className="h-7 w-7" style={{ color: "rgba(18,20,23,0.30)" }} />
                </div>
                <p className="text-[14px]" style={{ color: "rgba(18,20,23,0.60)" }}>
                  프렌즈 수행 내역이 없습니다
                </p>
              </div>
            ) : (
              mcashItems.map((m, i) => (
                <div key={m.id}>
                  <div className="py-3.5 flex items-center justify-between">
                    <div>
                      <p className="text-[14px] font-medium" style={{ color: "#121417" }}>
                        {m.orderNumber}
                      </p>
                      <p
                        className="text-[12px] mt-0.5"
                        style={{ color: "rgba(18,20,23,0.60)" }}
                      >
                        {m.completedAt}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[16px] font-bold" style={{ color: "#3EB21F" }}>
                        +{m.amount.toLocaleString("ko-KR")}원
                      </p>
                      <span
                        className="px-2 py-[3px] rounded text-[10px] font-bold"
                        style={{ backgroundColor: "#FFF4DB", color: "#AD4A05" }}
                      >
                        프렌즈
                      </span>
                    </div>
                  </div>
                  {i < mcashItems.length - 1 && (
                    <div className="h-px" style={{ backgroundColor: "rgba(18,20,23,0.06)" }} />
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
