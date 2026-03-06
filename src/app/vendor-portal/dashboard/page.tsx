"use client";
import { volumeMatrix, performanceMatrix, dayLabels, slotLabels, agentPerformances, vendorAgents } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, TrendingUp, Target, Activity } from "lucide-react";

export default function DashboardPage() {
  const allocatedSets = 6;
  const maxActive = allocatedSets * 5;
  const activeAgents = vendorAgents.filter(a => a.status === "ACTIVE" && a.isActive).length;
  const dpS = vendorAgents.filter(a => a.currentMode === "DP-S" && a.isActive).length;
  const dpF = vendorAgents.filter(a => a.currentMode === "DP-F" && a.isActive).length;
  const totalAgents = vendorAgents.filter(a => a.status === "ACTIVE").length;

  const totalVolume = volumeMatrix.flat().filter(v => v > 0).length;
  const achieved = dayLabels.reduce((acc, _, di) => acc + slotLabels.reduce((a2, _, si) => a2 + (volumeMatrix[di][si] > 0 && performanceMatrix[di][si] >= volumeMatrix[di][si] ? 1 : 0), 0), 0);
  const achieveRate = totalVolume > 0 ? Math.round((achieved / totalVolume) * 100) : 0;

  const totalCompleted = agentPerformances.reduce((a, p) => a + p.completedCount, 0);
  const totalDispatched = agentPerformances.reduce((a, p) => a + p.dispatchedCount, 0);
  const completionRate = totalDispatched > 0 ? ((totalCompleted / totalDispatched) * 100).toFixed(1) : "0";
  const avgAcceptRate = (agentPerformances.reduce((a, p) => a + p.acceptanceRate, 0) / agentPerformances.length).toFixed(1);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">실시간 운영 대시보드</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card><CardContent className="pt-6"><div className="flex items-center gap-2 mb-2"><Target className="h-4 w-4 text-blue-500" /><span className="text-sm text-muted-foreground">할당 세트</span></div><p className="text-3xl font-bold">{allocatedSets}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="flex items-center gap-2 mb-2"><Users className="h-4 w-4 text-emerald-500" /><span className="text-sm text-muted-foreground">최대 활성</span></div><p className="text-3xl font-bold">{maxActive}명</p></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="flex items-center gap-2 mb-2"><Activity className="h-4 w-4 text-orange-500" /><span className="text-sm text-muted-foreground">현재 활성</span></div><p className="text-3xl font-bold">{activeAgents}<span className="text-lg text-muted-foreground">/{maxActive}</span></p></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="flex items-center gap-2 mb-2"><TrendingUp className="h-4 w-4 text-purple-500" /><span className="text-sm text-muted-foreground">슬롯 달성률</span></div><p className="text-3xl font-bold">{achieveRate}%</p><p className="text-xs text-muted-foreground">{achieved}/{totalVolume} 슬롯</p></CardContent></Card>
      </div>

      <Card className="mb-6"><CardHeader><CardTitle className="flex items-center justify-between">Set 목표 달성 (7×5 매트릭스)
        <Badge variant={achieved >= 25 && Number(avgAcceptRate) >= 80 ? "default" : "destructive"}>{achieved >= 25 && Number(avgAcceptRate) >= 80 ? "인센티브 조건 충족" : "인센티브 미충족"}</Badge>
      </CardTitle></CardHeader><CardContent>
        <Table><TableHeader><TableRow><TableHead className="w-12">요일</TableHead>{slotLabels.map(s => <TableHead key={s} className="text-center text-xs">{s}</TableHead>)}</TableRow></TableHeader>
        <TableBody>{dayLabels.map((day, di) => (
          <TableRow key={day}><TableCell className="font-medium">{day}</TableCell>
            {slotLabels.map((_, si) => {
              const vol = volumeMatrix[di][si];
              const perf = performanceMatrix[di][si];
              const bg = vol === 0 && perf === 0 ? "bg-gray-100 text-gray-400" : perf >= vol ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800";
              return <TableCell key={si} className={`text-center text-sm font-mono ${bg}`}>{perf}/{vol}</TableCell>;
            })}
          </TableRow>
        ))}</TableBody></Table>
      </CardContent></Card>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card><CardHeader><CardTitle>수행 실적</CardTitle></CardHeader><CardContent className="space-y-3">
          <div className="flex justify-between"><span className="text-muted-foreground">배송 완료</span><span className="font-bold">{totalCompleted}건</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">배차 확정</span><span className="font-bold">{totalDispatched}건</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">완료율</span><span className="font-bold">{completionRate}%</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">수락률</span><span className="font-bold">{avgAcceptRate}%</span></div>
        </CardContent></Card>
        <Card><CardHeader><CardTitle>기사 출석 현황</CardTitle></CardHeader><CardContent className="space-y-3">
          <div className="flex justify-between"><span className="text-muted-foreground">소속 기사</span><span className="font-bold">{totalAgents}명</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">출근</span><span className="font-bold">{activeAgents}명</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">세트(DP-S)</span><span className="font-bold text-blue-600">{dpS}명</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">프렌즈(DP-F)</span><span className="font-bold text-orange-600">{dpF}명</span></div>
        </CardContent></Card>
      </div>
    </div>
  );
}
