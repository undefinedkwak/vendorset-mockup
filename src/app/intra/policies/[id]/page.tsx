"use client";
import { useState } from "react";
import { policies, policyVersions, volumeMatrix, dayLabels, slotLabels } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { X, Plus } from "lucide-react";

const versionStatusColor: Record<string, "default"|"secondary"|"destructive"|"outline"> = { DRAFT:"outline", SCHEDULED:"secondary", ACTIVE:"default", SUPERSEDED:"destructive", ARCHIVED:"secondary" };

export default function PolicyDetailPage() {
  const policy = policies[0];
  const [isActive, setIsActive] = useState(policy.status === "ACTIVE");
  const [matrix, setMatrix] = useState(volumeMatrix.map(r => [...r]));

  return (
    <div>
      <div className="flex items-center gap-3 mb-6"><h1 className="text-2xl font-bold">{policy.name}</h1><Badge variant={isActive?"default":"secondary"}>{isActive?"ACTIVE":"INACTIVE"}</Badge></div>
      <Tabs defaultValue="info">
        <TabsList><TabsTrigger value="info">기본 정보</TabsTrigger><TabsTrigger value="zones">연결 권역</TabsTrigger><TabsTrigger value="volume">단위물량 관리</TabsTrigger><TabsTrigger value="versions">버전 관리</TabsTrigger></TabsList>

        <TabsContent value="info"><Card><CardContent className="pt-6 space-y-4">
          <div className="space-y-2"><Label>정책명</Label><Input defaultValue={policy.name} /></div>
          <div className="space-y-2"><Label>설명</Label><Textarea defaultValue={policy.description} /></div>
          <div className="flex items-center gap-3"><Label>상태</Label><Switch checked={isActive} onCheckedChange={setIsActive} /><span className="text-sm">{isActive?"ACTIVE":"INACTIVE"}</span></div>
          <Button>저장</Button>
        </CardContent></Card></TabsContent>

        <TabsContent value="zones"><Card><CardContent className="pt-6 space-y-4">
          <div className="flex flex-wrap gap-2">{policy.linkedZones.map((z)=>(<Badge key={z} className="gap-1 pr-1">{z}<button className="ml-1 hover:text-red-500"><X className="h-3 w-3" /></button></Badge>))}</div>
          {policy.linkedZones.length===0&&<p className="text-muted-foreground">연결된 권역이 없습니다</p>}
          <Button variant="outline" size="sm"><Plus className="h-4 w-4 mr-1" />권역 추가</Button>
          <p className="text-xs text-muted-foreground">INACTIVE 정책은 신규 연결 불가 (P-OP-003)</p>
        </CardContent></Card></TabsContent>

        <TabsContent value="volume"><Card><CardHeader><CardTitle>7x5 단위물량 매트릭스</CardTitle></CardHeader><CardContent>
          <div className="overflow-x-auto"><Table><TableHeader><TableRow><TableHead className="w-16">요일</TableHead>{slotLabels.map((s)=>(<TableHead key={s} className="text-center">{s}</TableHead>))}</TableRow></TableHeader>
          <TableBody>{dayLabels.map((day, di)=>(<TableRow key={day}><TableCell className="font-medium">{day}</TableCell>{slotLabels.map((_,si)=>(<TableCell key={si} className="p-1"><Input type="number" className="w-16 text-center h-8" value={matrix[di][si]} onChange={(e)=>{const m=[...matrix];m[di]=[...m[di]];m[di][si]=Number(e.target.value);setMatrix(m);}} /></TableCell>))}</TableRow>))}</TableBody></Table></div>
          <div className="flex gap-3 mt-4"><Button>저장</Button><p className="text-xs text-muted-foreground self-center">총 슬롯: {matrix.flat().reduce((a,b)=>a+b,0)}건</p></div>
        </CardContent></Card></TabsContent>

        <TabsContent value="versions"><Card><CardContent className="pt-6">
          <div className="flex justify-end mb-4"><Button><Plus className="h-4 w-4 mr-1" />새 버전 생성</Button></div>
          <Table><TableHeader><TableRow><TableHead>V</TableHead><TableHead>상태</TableHead><TableHead>적용일</TableHead><TableHead>50m당</TableHead><TableHead>픽업비</TableHead><TableHead>완료비</TableHead><TableHead>최소슬롯</TableHead><TableHead>수락률</TableHead><TableHead>세트당</TableHead><TableHead>액션</TableHead></TableRow></TableHeader>
          <TableBody>{policyVersions.map((v)=>(<TableRow key={v.id}>
            <TableCell className="font-bold">v{v.version}</TableCell>
            <TableCell><Badge variant={versionStatusColor[v.status]}>{v.status}</Badge></TableCell>
            <TableCell>{v.effectiveFrom||"-"}</TableCell>
            <TableCell>{v.feePerFiftyMeters}원</TableCell><TableCell>{v.pickupFee.toLocaleString()}원</TableCell><TableCell>{v.deliveryCompleteFee.toLocaleString()}원</TableCell>
            <TableCell>{v.minGoalSlots}</TableCell><TableCell>{v.acceptanceRatePercent}%</TableCell><TableCell>{v.amountPerSet.toLocaleString()}원</TableCell>
            <TableCell><div className="flex gap-1">{v.status==="DRAFT"&&<><Button size="sm" variant="outline">예약</Button><Button size="sm" variant="destructive">삭제</Button></>}{v.status==="SCHEDULED"&&<Button size="sm" variant="outline">취소</Button>}</div></TableCell>
          </TableRow>))}</TableBody></Table>
        </CardContent></Card></TabsContent>
      </Tabs>
    </div>
  );
}
