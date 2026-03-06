"use client";
import { useState } from "react";
import { weeklyPlanStatus, setAllocations } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertTriangle, Copy, CheckCircle } from "lucide-react";

export default function WeeklyPlanPage() {
  const [executed, setExecuted] = useState(weeklyPlanStatus.carryOverExecuted);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">주간 계획 조정</h1>
      {!executed && <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 mb-6 flex items-start gap-3"><AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" /><div><p className="font-medium text-yellow-800">이월 복사가 아직 실행되지 않았습니다</p><p className="text-sm text-yellow-700">조정 가능 기간: {weeklyPlanStatus.carryOverWindow.start} ~ {weeklyPlanStatus.carryOverWindow.end}</p></div></div>}

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">현재 주차</p><p className="text-2xl font-bold">{weeklyPlanStatus.currentWeek}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">다음 주차</p><p className="text-2xl font-bold">{weeklyPlanStatus.nextWeek}</p><Badge variant={executed?"default":"outline"} className="mt-1">{executed?"이월 완료":"미실행"}</Badge></CardContent></Card>
      </div>

      <Card className="mb-6"><CardHeader className="flex flex-row items-center justify-between"><CardTitle>이월 복사</CardTitle>
        <Dialog><DialogTrigger asChild><Button disabled={executed}><Copy className="h-4 w-4 mr-2" />이월 복사 실행</Button></DialogTrigger>
          <DialogContent><DialogHeader><DialogTitle>이월 복사 확인</DialogTitle></DialogHeader>
            <p className="text-sm text-muted-foreground mb-4">다음 항목이 {weeklyPlanStatus.nextWeek} 주차로 복사됩니다:</p>
            <ul className="list-disc list-inside text-sm space-y-1"><li>총 세트 수 및 벤더별 할당</li><li>정책-Zone 연결</li><li>예약 버전 → 활성 버전 교체</li></ul>
            <Button className="mt-4" onClick={()=>{setExecuted(true);alert("이월 복사가 완료되었습니다.")}}><CheckCircle className="h-4 w-4 mr-2" />확인 및 실행</Button>
          </DialogContent></Dialog>
      </CardHeader><CardContent>
        <p className="text-sm text-muted-foreground">{executed?"이월 복사가 완료되었습니다. 아래 내용을 조정할 수 있습니다.":"이월 복사를 먼저 실행하세요."}</p>
      </CardContent></Card>

      <Card><CardHeader><CardTitle>세트 할당 현황 ({weeklyPlanStatus.nextWeek})</CardTitle></CardHeader><CardContent>
        <Table><TableHeader><TableRow><TableHead>지점</TableHead><TableHead>총 세트</TableHead><TableHead>벤더별 할당</TableHead></TableRow></TableHeader>
        <TableBody>{setAllocations.map((sa)=>(<TableRow key={sa.id}><TableCell className="font-medium">{sa.partnerName}</TableCell><TableCell><Badge variant="secondary">{sa.totalSets}</Badge></TableCell>
          <TableCell>{sa.vendors.map((v)=>(<span key={v.vendorId} className="text-sm mr-3">{v.vendorName}: {v.allocatedSets}</span>))}</TableCell></TableRow>))}</TableBody></Table>
      </CardContent></Card>
    </div>
  );
}
