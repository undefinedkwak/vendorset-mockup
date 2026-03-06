"use client";
import { useState, use } from "react";
import { vendors, partners } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Copy, RefreshCw } from "lucide-react";

const statusColors: Record<string, "default"|"secondary"|"destructive"|"outline"> = { STANDBY:"outline", ACTIVE:"default", TERMINATED:"destructive", DELETED:"secondary" };

export default function VendorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const vendor = vendors.find((v) => v.id === id) || vendors[0];
  const [status, setStatus] = useState(vendor.status);
  const transitions: Record<string, string[]> = { STANDBY:["ACTIVE","TERMINATED","DELETED"], ACTIVE:["TERMINATED"], TERMINATED:["DELETED"], DELETED:[] };

  return (
    <div>
      <Breadcrumb className="mb-4"><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="/intra/vendors">벤더 관리</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem>{vendor.displayName}</BreadcrumbItem></BreadcrumbList></Breadcrumb>
      <div className="flex items-center gap-3 mb-6"><h1 className="text-2xl font-bold">{vendor.displayName}</h1><Badge variant={statusColors[status]}>{status}</Badge></div>
      <Tabs defaultValue="info">
        <TabsList><TabsTrigger value="info">기본 정보</TabsTrigger><TabsTrigger value="partner">지점 연결</TabsTrigger><TabsTrigger value="codes">초대 코드</TabsTrigger></TabsList>
        <TabsContent value="info"><Card><CardHeader><CardTitle>기본 정보</CardTitle></CardHeader><CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><Label className="text-muted-foreground">사업자번호</Label><p className="font-mono">{vendor.businessNumber}</p></div>
            <div><Label className="text-muted-foreground">대표자</Label><p>{vendor.representative}</p></div>
            <div><Label className="text-muted-foreground">벤더 코드</Label><p className="font-mono">{vendor.vendorCode}</p></div>
            <div><Label className="text-muted-foreground">등록일</Label><p>{vendor.createdAt}</p></div>
          </div>
          <div className="space-y-2"><Label>표시 이름</Label><Input defaultValue={vendor.displayName} /></div>
          <div className="flex gap-3 pt-4"><Button>저장</Button>
            <Dialog><DialogTrigger asChild><Button variant="outline">상태 변경</Button></DialogTrigger>
              <DialogContent><DialogHeader><DialogTitle>벤더 상태 변경</DialogTitle></DialogHeader>
                <p className="text-sm text-muted-foreground mb-4">현재: <Badge variant={statusColors[status]}>{status}</Badge></p>
                {status === "ACTIVE" && <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-sm mb-4"><p className="font-medium">⚠️ TERMINATED 시 연쇄 처리:</p><ul className="list-disc list-inside mt-1 text-muted-foreground"><li>소속 기사 일괄 INACTIVE</li><li>세트 할당 즉시 삭제</li><li>VO → ARCHIVED</li><li>Vendor Code → EXPIRED</li></ul></div>}
                <div className="flex gap-2">{transitions[status]?.map((next) => (<Button key={next} variant={next==="DELETED"||next==="TERMINATED"?"destructive":"default"} onClick={()=>{setStatus(next as typeof status);alert(`→ ${next}`)}}>→ {next}</Button>))}</div>
              </DialogContent></Dialog></div>
        </CardContent></Card></TabsContent>
        <TabsContent value="partner"><Card><CardHeader><CardTitle>지점 연결</CardTitle></CardHeader><CardContent className="space-y-4">
          {vendor.partnerName ? <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg"><Badge className="bg-green-500">{vendor.partnerName}</Badge><span className="text-sm text-muted-foreground">연결됨</span><Button variant="outline" size="sm" className="ml-auto">연결 해제</Button></div>
          : <div className="p-4 bg-gray-50 rounded-lg text-center text-muted-foreground">연결된 지점 없음</div>}
          <div className="space-y-2"><Label>지점 선택 (B-type)</Label><Select><SelectTrigger><SelectValue placeholder="지점 선택" /></SelectTrigger><SelectContent>{partners.map((p)=>(<SelectItem key={p.id} value={p.id}>{p.name} ({p.regionName})</SelectItem>))}</SelectContent></Select></div>
          <Button disabled={status!=="ACTIVE"}>연결</Button>
        </CardContent></Card></TabsContent>
        <TabsContent value="codes"><Card><CardHeader><CardTitle>초대 코드</CardTitle></CardHeader><CardContent className="space-y-4">
          {vendor.invitationCode ? <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg"><span className="font-mono text-lg font-bold">{vendor.invitationCode}</span><Button variant="ghost" size="sm" onClick={()=>navigator.clipboard?.writeText(vendor.invitationCode||"")}><Copy className="h-4 w-4" /></Button></div>
          : <div className="p-4 bg-gray-50 rounded-lg text-center text-muted-foreground">미발급</div>}
          <p className="text-xs text-muted-foreground">벤더당 1개, 기사가 Plus App에서 입력하여 가입</p>
          <Button variant="outline" onClick={()=>alert("재발급 완료")}><RefreshCw className="h-4 w-4 mr-2" />{vendor.invitationCode?"코드 재발급":"코드 발급"}</Button>
        </CardContent></Card></TabsContent>
      </Tabs>
    </div>
  );
}
