"use client";
import { useState } from "react";
import { settlements } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CheckCircle, RotateCcw, CreditCard } from "lucide-react";

interface Settlement { id:string; vendorId:string; vendorName:string; weekStartDate:string; status:string; totalDeliveries:number; deliveryFeeTotal:number; incentiveTotal:number; grandTotal:number; acceptanceRate:number; paidAt:string|null; }

export default function SettlementPage() {
  const [data, setData] = useState<Settlement[]>(settlements as Settlement[]);
  const confirm = (id: string) => setData(data.map(s => s.id===id?{...s,status:"CONFIRMED"}:s));
  const markPaid = (id: string) => setData(data.map(s => s.id===id?{...s,paidAt:new Date().toISOString().slice(0,10)}:s));

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">정산 관리</h1>
      <Card><CardHeader><CardTitle>주간 정산 목록</CardTitle></CardHeader><CardContent>
        <Table><TableHeader><TableRow>
          <TableHead>벤더</TableHead><TableHead>주차</TableHead><TableHead className="text-right">배송 건수</TableHead><TableHead className="text-right">배송비</TableHead>
          <TableHead className="text-right">인센티브</TableHead><TableHead className="text-right">총액</TableHead><TableHead className="text-right">수락률</TableHead><TableHead>상태</TableHead><TableHead>지급일</TableHead><TableHead>액션</TableHead>
        </TableRow></TableHeader>
        <TableBody>{data.map((s)=>(<TableRow key={s.id}>
          <TableCell className="font-medium">{s.vendorName}</TableCell><TableCell>{s.weekStartDate}</TableCell>
          <TableCell className="text-right">{s.totalDeliveries}</TableCell><TableCell className="text-right">{s.deliveryFeeTotal.toLocaleString("ko-KR")}원</TableCell>
          <TableCell className="text-right">{s.incentiveTotal.toLocaleString("ko-KR")}원</TableCell><TableCell className="text-right font-bold">{s.grandTotal.toLocaleString("ko-KR")}원</TableCell>
          <TableCell className="text-right">{s.acceptanceRate}%</TableCell>
          <TableCell><Badge variant={s.status==="CONFIRMED"?"default":"outline"}>{s.status}</Badge></TableCell>
          <TableCell>{s.paidAt||"-"}</TableCell>
          <TableCell><div className="flex gap-1">
            {s.status==="PENDING"&&<Dialog><DialogTrigger asChild><Button size="sm"><CheckCircle className="h-3 w-3 mr-1" />컨펌</Button></DialogTrigger>
              <DialogContent><DialogHeader><DialogTitle>정산 컨펌</DialogTitle></DialogHeader>
                <p className="text-sm mb-2">{s.vendorName} — {s.weekStartDate} 주차</p>
                <p className="text-lg font-bold mb-4">{s.grandTotal.toLocaleString("ko-KR")}원</p>
                <p className="text-xs text-muted-foreground mb-4">컨펌 후 Vendor Portal에 공개됩니다 (기한: 업무일 2일)</p>
                <Button onClick={()=>confirm(s.id)}>컨펌 확정</Button></DialogContent></Dialog>}
            {s.status==="CONFIRMED"&&!s.paidAt&&<Button size="sm" variant="outline" onClick={()=>markPaid(s.id)}><CreditCard className="h-3 w-3 mr-1" />지급 완료</Button>}
            {s.status==="CONFIRMED"&&s.paidAt&&<Button size="sm" variant="ghost" disabled><RotateCcw className="h-3 w-3 mr-1" />완료</Button>}
          </div></TableCell>
        </TableRow>))}</TableBody></Table>
      </CardContent></Card>
    </div>
  );
}
