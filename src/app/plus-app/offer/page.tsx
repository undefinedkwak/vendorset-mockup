"use client";
import { useState, useEffect, useCallback } from "react";
import { dispatchOffers } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin, Clock, RefreshCw, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

type OfferState = "waiting" | "active" | "accepted" | "rejected" | "expired";

export default function OfferPage() {
  const [state, setState] = useState<OfferState>("waiting");
  const [timer, setTimer] = useState(30);
  const offer = dispatchOffers[0];

  useEffect(() => {
    if (state !== "active") return;
    if (timer <= 0) { setState("expired"); return; }
    const interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [state, timer]);

  const reset = useCallback(() => { setState("active"); setTimer(30); }, []);

  return (
    <div className="p-4">
      {state === "waiting" && (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center animate-pulse mb-4"><Clock className="h-8 w-8 text-purple-500" /></div>
          <p className="text-lg font-medium">배차 대기 중...</p>
          <p className="text-sm text-muted-foreground mt-1">새 오퍼가 도착하면 알림이 울립니다</p>
          <Button className="mt-6" onClick={reset}><RefreshCw className="h-4 w-4 mr-2" />오퍼 시뮬레이션</Button>
        </div>
      )}

      {state === "active" && (
        <div className="space-y-4">
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full text-2xl font-bold text-white ${timer <= 10 ? "bg-red-500 animate-pulse" : "bg-purple-500"}`}>{timer}</div>
            <p className="text-sm text-muted-foreground mt-2">응답 제한 시간</p>
          </div>
          <Card>
            <CardHeader><CardTitle className="text-base flex items-center justify-between">{offer.orderNumber}<Badge variant="outline">SET</Badge></CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2"><MapPin className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" /><div><p className="text-xs text-muted-foreground">픽업</p><p className="text-sm">{offer.pickupAddress}</p></div></div>
              <div className="flex justify-center"><ArrowRight className="h-4 w-4 text-muted-foreground" /></div>
              <div className="flex items-start gap-2"><MapPin className="h-4 w-4 text-red-500 mt-0.5 shrink-0" /><div><p className="text-xs text-muted-foreground">배달</p><p className="text-sm">{offer.deliveryAddress}</p></div></div>
              <div className="flex justify-between text-sm pt-2 border-t">
                <span className="text-muted-foreground">거리</span><span className="font-medium">{(offer.distanceMeters / 1000).toFixed(1)}km</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">예상 요금</span><span className="font-bold text-lg">{offer.estimatedFee.toLocaleString()}원</span>
              </div>
            </CardContent>
          </Card>
          <div className="grid grid-cols-2 gap-3">
            <Button className="h-14 text-lg bg-green-500 hover:bg-green-600" onClick={() => setState("accepted")}>수락</Button>
            <Button className="h-14 text-lg" variant="destructive" onClick={() => setState("rejected")}>거절</Button>
          </div>
        </div>
      )}

      {state === "accepted" && (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
          <p className="text-lg font-bold text-green-700">배차를 수락했습니다</p>
          <p className="text-sm text-muted-foreground mt-1">{offer.orderNumber}</p>
          <Button className="mt-6" variant="outline" onClick={reset}><RefreshCw className="h-4 w-4 mr-2" />새 오퍼 시뮬레이션</Button>
        </div>
      )}

      {state === "rejected" && (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <XCircle className="h-16 w-16 text-red-400 mb-4" />
          <p className="text-lg font-medium">배차를 거절했습니다</p>
          <Button className="mt-6" variant="outline" onClick={reset}><RefreshCw className="h-4 w-4 mr-2" />새 오퍼 시뮬레이션</Button>
        </div>
      )}

      {state === "expired" && (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <AlertTriangle className="h-16 w-16 text-yellow-500 mb-4" />
          <p className="text-lg font-bold text-yellow-700">응답 시간 초과</p>
          <p className="text-sm text-muted-foreground mt-1">30초 타임아웃 (만료 = 거절 처리)</p>
          <Button className="mt-6" variant="outline" onClick={reset}><RefreshCw className="h-4 w-4 mr-2" />새 오퍼 시뮬레이션</Button>
        </div>
      )}
    </div>
  );
}
