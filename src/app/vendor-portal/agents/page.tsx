"use client";
import { useState } from "react";
import { vendorAgents } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Check, X, UserMinus } from "lucide-react";

export default function AgentsPage() {
  interface Agent { id:string; name:string; phone:string; status:string; isActive:boolean; currentMode:string|null; isFriendsOnly:boolean; joinedAt:string; }
  const [agents, setAgents] = useState<Agent[]>(vendorAgents as Agent[]);
  const active = agents.filter(a => a.status === "ACTIVE");
  const pending = agents.filter(a => a.status === "PENDING");
  const inactive = agents.filter(a => a.status === "INACTIVE");
  const working = active.filter(a => a.isActive);
  const dpS = working.filter(a => a.currentMode === "DP-S").length;
  const dpF = working.filter(a => a.currentMode === "DP-F").length;

  const approve = (id: string) => setAgents(agents.map(a => a.id===id?{...a,status:"ACTIVE"}:a));
  const decline = (id: string) => setAgents(agents.map(a => a.id===id?{...a,status:"DECLINED"}:a));
  const dismiss = (id: string) => setAgents(agents.map(a => a.id===id?{...a,status:"INACTIVE",isActive:false}:a));
  const toggleFriends = (id: string) => setAgents(agents.map(a => a.id===id?{...a,isFriendsOnly:!a.isFriendsOnly}:a));

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">기사 활동 관리</h1>
      <div className="bg-white rounded-lg border p-3 mb-6 flex gap-4 text-sm">
        <span>소속 <strong>{active.length}명</strong></span><span>|</span>
        <span>활성 <strong>{working.length}명</strong></span><span>|</span>
        <span>세트(DP-S) <strong className="text-blue-600">{dpS}명</strong></span><span>|</span>
        <span>프렌즈(DP-F) <strong className="text-orange-600">{dpF}명</strong></span><span>|</span>
        <span>최대 활성: <strong>30명</strong></span>
      </div>

      <Tabs defaultValue="pending">
        <TabsList><TabsTrigger value="pending">가입 요청 ({pending.length})</TabsTrigger><TabsTrigger value="active">활성 기사 ({active.length})</TabsTrigger><TabsTrigger value="inactive">소속 해제 ({inactive.length})</TabsTrigger></TabsList>

        <TabsContent value="pending" className="space-y-3">
          {pending.length === 0 ? <p className="text-muted-foreground p-4">대기 중인 요청이 없습니다</p> :
          pending.map(a => (
            <Card key={a.id}><CardContent className="pt-6 flex items-center justify-between">
              <div><p className="font-medium">{a.name}</p><p className="text-sm text-muted-foreground">{a.phone} · 신청일: {a.joinedAt}</p></div>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => approve(a.id)}><Check className="h-4 w-4 mr-1" />승인</Button>
                <Button size="sm" variant="outline" onClick={() => decline(a.id)}><X className="h-4 w-4 mr-1" />거절</Button>
              </div>
            </CardContent></Card>
          ))}
        </TabsContent>

        <TabsContent value="active">
          <Table><TableHeader><TableRow><TableHead>기사명</TableHead><TableHead>연락처</TableHead><TableHead>모드</TableHead><TableHead>활동</TableHead><TableHead>프렌즈 전용</TableHead><TableHead>액션</TableHead></TableRow></TableHeader>
          <TableBody>{active.map(a => (
            <TableRow key={a.id}><TableCell className="font-medium">{a.name}</TableCell><TableCell>{a.phone}</TableCell>
              <TableCell>{a.currentMode ? <Badge variant={a.currentMode==="DP-S"?"default":"secondary"} className={a.currentMode==="DP-S"?"bg-blue-500":"bg-orange-500"}>{a.currentMode}</Badge> : "-"}</TableCell>
              <TableCell><Badge variant={a.isActive?"default":"outline"}>{a.isActive?"활동중":"미활동"}</Badge></TableCell>
              <TableCell><Switch checked={a.isFriendsOnly} onCheckedChange={() => toggleFriends(a.id)} /></TableCell>
              <TableCell>
                <Dialog><DialogTrigger asChild><Button size="sm" variant="destructive"><UserMinus className="h-3 w-3 mr-1" />해제</Button></DialogTrigger>
                  <DialogContent><DialogHeader><DialogTitle>기사 소속 해제</DialogTitle></DialogHeader>
                    <p className="text-sm mb-4">{a.name}님을 소속 해제하시겠습니까?</p>
                    <p className="text-xs text-muted-foreground mb-4">출근 중인 경우 DP-FA로 전환됩니다</p>
                    <Button variant="destructive" onClick={() => dismiss(a.id)}>해제 확인</Button></DialogContent></Dialog>
              </TableCell>
            </TableRow>
          ))}</TableBody></Table>
        </TabsContent>

        <TabsContent value="inactive">
          {inactive.length === 0 ? <p className="text-muted-foreground p-4">해제된 기사가 없습니다</p> :
          <Table><TableHeader><TableRow><TableHead>기사명</TableHead><TableHead>연락처</TableHead><TableHead>가입일</TableHead></TableRow></TableHeader>
          <TableBody>{inactive.map(a => (<TableRow key={a.id}><TableCell>{a.name}</TableCell><TableCell>{a.phone}</TableCell><TableCell>{a.joinedAt}</TableCell></TableRow>))}</TableBody></Table>}
        </TabsContent>
      </Tabs>
    </div>
  );
}
