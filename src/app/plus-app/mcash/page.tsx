"use client";
import { useState } from "react";
import { mcashHistory } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Wallet, AlertCircle } from "lucide-react";

type Tab = "수행내역" | "M캐시정산";

export default function MCashPage() {
  const [tab, setTab] = useState<Tab>("수행내역");

  // M캐시 정산: FRIENDS(DP-F/DP-FA) 수행분만 (P-ST-004)
  const mcashItems = mcashHistory.filter(m => m.dispatchSource === "FRIENDS");
  const mcashTotal = mcashItems.reduce((a, m) => a + m.amount, 0);

  return (
    <div className="p-4">
      {/* 탭 전환 */}
      <div className="flex gap-2 mb-4">
        {(["수행내역", "M캐시정산"] as Tab[]).map(t => (
          <Button key={t} size="sm" variant={tab === t ? "default" : "outline"} onClick={() => setTab(t)}
            className={tab === t ? "flex-1" : "flex-1"}>
            {t}
          </Button>
        ))}
      </div>

      {tab === "수행내역" ? (
        <>
          {/* 수행 내역: 전체 배송 건 표시 (모드 태그 포함) */}
          <p className="text-sm text-muted-foreground mb-3">전체 배송 수행 내역</p>
          <div className="space-y-3">
            {mcashHistory.map(m => (
              <Card key={m.id}><CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{m.orderNumber}</p>
                    <p className="text-xs text-muted-foreground">{m.completedAt}</p>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1">
                    <Badge className={m.dispatchSource === "SET" ? "bg-blue-500" : "bg-orange-500"}>{m.dispatchSource}</Badge>
                    {m.dispatchSource === "SET" ? (
                      <span className="text-xs text-muted-foreground">벤더 정산</span>
                    ) : (
                      <p className="font-bold">{m.amount.toLocaleString("ko-KR")}원</p>
                    )}
                  </div>
                </div>
              </CardContent></Card>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* M캐시 정산: DP-F/DP-FA 수행분만 표시 (P-ST-004) */}
          <div className="text-center mb-4 pt-2">
            <div className="inline-flex items-center gap-2 mb-2"><Wallet className="h-5 w-5 text-purple-500" /><span className="text-sm text-muted-foreground">M캐시 잔액</span></div>
            <p className="text-3xl font-bold">{mcashTotal.toLocaleString("ko-KR")}원</p>
          </div>

          <div className="rounded-lg bg-muted/50 p-3 mb-4 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-muted-foreground">
              세트(DP-S) 수행분은 벤더장을 통해 별도 정산됩니다. M캐시에는 프렌즈(DP-F/DP-FA) 수행분만 표시됩니다.
            </p>
          </div>

          <div className="space-y-3">
            {mcashItems.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">프렌즈 수행 내역이 없습니다</p>
            ) : (
              mcashItems.map(m => (
                <Card key={m.id}><CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{m.orderNumber}</p>
                      <p className="text-xs text-muted-foreground">{m.completedAt}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-green-600">+{m.amount.toLocaleString("ko-KR")}원</p>
                      <Badge className="bg-orange-500">FRIENDS</Badge>
                    </div>
                  </div>
                </CardContent></Card>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
