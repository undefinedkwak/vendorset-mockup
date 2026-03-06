"use client";
import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Mode = "DP-S" | "DP-F" | "DP-FA" | null;
const modeConfig: Record<string, { label: string; color: string; bg: string }> = {
  "DP-S": { label: "세트 모드", color: "bg-blue-500", bg: "bg-blue-100" },
  "DP-F": { label: "프렌즈 모드", color: "bg-orange-500", bg: "bg-orange-100" },
  "DP-FA": { label: "프렌즈 모드 (벤더 미소속)", color: "bg-gray-500", bg: "bg-gray-100" },
};

export default function WorkPage() {
  const [isWorking, setIsWorking] = useState(false);
  const [mode, setMode] = useState<Mode>(null);
  const [loading, setLoading] = useState(false);

  const toggle = useCallback(() => {
    if (isWorking) { setIsWorking(false); setMode(null); }
    else { setLoading(true); setTimeout(() => { setIsWorking(true); setMode("DP-S"); setLoading(false); }, 800); }
  }, [isWorking]);

  const config = mode ? modeConfig[mode] : null;

  return (
    <div className="flex flex-col items-center justify-center p-6 min-h-[calc(100vh-120px)]">
      <button onClick={toggle} disabled={loading}
        className={`w-48 h-48 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-lg active:scale-95
          ${loading ? "bg-yellow-400 animate-pulse" : isWorking && config ? config.color : "bg-gray-300"}`}>
        <span className="text-white text-lg font-bold">{loading ? "연결 중..." : isWorking ? "오더받기 ON" : "오더받기"}</span>
        {!isWorking && !loading && <span className="text-white/70 text-sm mt-1">탭하여 시작</span>}
      </button>

      <div className="mt-6 text-center space-y-2">
        {mode && config && <>
          <Badge className={`${config.color} text-white px-4 py-1`}>{config.label}</Badge>
          {mode === "DP-S" && <p className="text-sm text-muted-foreground">활성 기사: 3 / 30명</p>}
        </>}
        {!isWorking && <p className="text-muted-foreground text-sm">출근 시 자동으로 모드가 결정됩니다</p>}
      </div>

      <Card className="mt-8 w-full"><CardContent className="pt-4">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">벤더</span><span className="font-medium">대한물류</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">벤더 상태</span><Badge className="bg-emerald-500">ACTIVE</Badge></div>
          <div className="flex justify-between"><span className="text-muted-foreground">소속</span><span className="font-medium text-green-600">확인됨</span></div>
        </div>
      </CardContent></Card>
    </div>
  );
}
