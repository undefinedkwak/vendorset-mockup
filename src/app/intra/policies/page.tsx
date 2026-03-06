"use client";
import { useState } from "react";
import Link from "next/link";
import { policies } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";

export default function PoliciesPage() {
  const [filter, setFilter] = useState("전체");
  const filtered = policies.filter((p) => filter === "전체" || p.status === filter);
  return (
    <div>
      <div className="flex items-center justify-between mb-6"><h1 className="text-2xl font-bold">권역설정관리</h1><Button><Plus className="h-4 w-4 mr-2" />신규 정책 생성</Button></div>
      <Tabs value={filter} onValueChange={setFilter} className="mb-4"><TabsList><TabsTrigger value="전체">전체</TabsTrigger><TabsTrigger value="ACTIVE">ACTIVE</TabsTrigger><TabsTrigger value="INACTIVE">INACTIVE</TabsTrigger></TabsList></Tabs>
      <div className="bg-white rounded-lg border"><Table><TableHeader><TableRow>
        <TableHead>정책명</TableHead><TableHead>설명</TableHead><TableHead>상태</TableHead><TableHead>연결 권역</TableHead><TableHead>버전 수</TableHead>
      </TableRow></TableHeader><TableBody>{filtered.map((p) => (
        <TableRow key={p.id}><TableCell><Link href={`/intra/policies/${p.id}`} className="font-medium text-blue-600 hover:underline">{p.name}</Link></TableCell>
          <TableCell className="text-muted-foreground">{p.description}</TableCell>
          <TableCell><Badge variant={p.status==="ACTIVE"?"default":"secondary"}>{p.status}</Badge></TableCell>
          <TableCell><div className="flex gap-1 flex-wrap">{p.linkedZones.length>0?p.linkedZones.map((z)=>(<Badge key={z} variant="outline" className="text-xs">{z}</Badge>)):<span className="text-muted-foreground text-sm">없음</span>}</div></TableCell>
          <TableCell className="text-center">{p.versionsCount}</TableCell>
        </TableRow>))}</TableBody></Table></div>
    </div>
  );
}
