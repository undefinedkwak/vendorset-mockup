"use client";
import { setAllocations, monthlyTargets } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SetAllocationPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">세트분배 관리</h1>
      <Card className="mb-6"><CardHeader><CardTitle className="flex items-center gap-3">
        <Button variant="ghost" size="sm"><ChevronLeft className="h-4 w-4" /></Button>
        <span>2026-03-02 (월) 주차</span>
        <Button variant="ghost" size="sm"><ChevronRight className="h-4 w-4" /></Button>
      </CardTitle></CardHeader>
      <CardContent>
        <Table><TableHeader><TableRow>
          <TableHead>지점명</TableHead><TableHead className="text-center">총 세트</TableHead><TableHead>벤더별 할당</TableHead><TableHead className="text-center">합계 검증</TableHead>
        </TableRow></TableHeader>
        <TableBody>{setAllocations.map((sa) => {
          const sum = sa.vendors.reduce((a, v) => a + v.allocatedSets, 0);
          return (
            <TableRow key={sa.id}>
              <TableCell className="font-medium">{sa.partnerName}</TableCell>
              <TableCell className="text-center"><Badge variant="secondary" className="text-lg">{sa.totalSets}</Badge></TableCell>
              <TableCell><div className="space-y-1">{sa.vendors.map((v) => (<div key={v.vendorId} className="flex items-center gap-2"><span className="text-sm">{v.vendorName}</span><Badge variant="outline">{v.allocatedSets}세트</Badge></div>))}</div></TableCell>
              <TableCell className="text-center">{sum === sa.totalSets ? <Badge className="bg-green-500">일치 ✓</Badge> : <Badge variant="destructive">불일치 ({sum}/{sa.totalSets})</Badge>}</TableCell>
            </TableRow>
          );
        })}</TableBody></Table>
      </CardContent></Card>

      <Card><CardHeader><CardTitle>월별 목표 달성 현황 (2026-03)</CardTitle></CardHeader>
      <CardContent className="space-y-4">{monthlyTargets.map((mt) => (
        <div key={mt.partnerId} className="space-y-2">
          <div className="flex justify-between text-sm"><span className="font-medium">{mt.partnerName}</span><span>{mt.achievedSets} / {mt.targetSets} 세트 ({mt.rate}%)</span></div>
          <Progress value={mt.rate} className="h-3" />
        </div>
      ))}</CardContent></Card>
    </div>
  );
}
