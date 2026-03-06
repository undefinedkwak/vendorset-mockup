"use client";
import { settlements, agentPerformances } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function VPSettlementPage() {
  const confirmed = settlements.filter(s => s.status === "CONFIRMED" && s.vendorId === "V001");
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">정산 조회</h1>
      <Card className="mb-6"><CardHeader><CardTitle>주차별 정산</CardTitle></CardHeader><CardContent>
        {confirmed.length === 0 ? <p className="text-muted-foreground">공개된 정산이 없습니다</p> :
        <Table><TableHeader><TableRow><TableHead>주차</TableHead><TableHead className="text-right">배송 건수</TableHead><TableHead className="text-right">배송비</TableHead><TableHead className="text-right">인센티브</TableHead><TableHead className="text-right">총액</TableHead><TableHead className="text-right">수락률</TableHead><TableHead>지급일</TableHead></TableRow></TableHeader>
        <TableBody>{confirmed.map(s => (
          <TableRow key={s.id}><TableCell>{s.weekStartDate}</TableCell><TableCell className="text-right">{s.totalDeliveries}건</TableCell>
            <TableCell className="text-right">{s.deliveryFeeTotal.toLocaleString("ko-KR")}원</TableCell>
            <TableCell className="text-right">{s.incentiveTotal.toLocaleString("ko-KR")}원</TableCell>
            <TableCell className="text-right font-bold">{s.grandTotal.toLocaleString("ko-KR")}원</TableCell>
            <TableCell className="text-right">{s.acceptanceRate}%</TableCell><TableCell>{s.paidAt || "-"}</TableCell>
          </TableRow>
        ))}</TableBody></Table>}
      </CardContent></Card>

      <Card className="mb-6"><CardHeader><CardTitle>기사별 실적</CardTitle></CardHeader><CardContent>
        <Table><TableHeader><TableRow><TableHead>기사명</TableHead><TableHead className="text-right">완료</TableHead><TableHead className="text-right">배차</TableHead><TableHead className="text-right">완료율</TableHead><TableHead className="text-right">수락률</TableHead></TableRow></TableHeader>
        <TableBody>{agentPerformances.map(a => (
          <TableRow key={a.agentId}><TableCell className="font-medium">{a.agentName}</TableCell>
            <TableCell className="text-right">{a.completedCount}건</TableCell><TableCell className="text-right">{a.dispatchedCount}건</TableCell>
            <TableCell className="text-right">{a.completionRate}%</TableCell><TableCell className="text-right">{a.acceptanceRate}%</TableCell>
          </TableRow>
        ))}</TableBody></Table>
      </CardContent></Card>
      <p className="text-xs text-muted-foreground">* 정산은 RM 컨펌 후 공개됩니다</p>
    </div>
  );
}
