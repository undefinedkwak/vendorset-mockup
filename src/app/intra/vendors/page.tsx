"use client";
import { useState } from "react";
import Link from "next/link";
import { vendors } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search } from "lucide-react";

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  STANDBY: { label: "STANDBY", variant: "outline" },
  ACTIVE: { label: "ACTIVE", variant: "default" },
  TERMINATED: { label: "TERMINATED", variant: "destructive" },
  DELETED: { label: "DELETED", variant: "secondary" },
};

export default function VendorsPage() {
  const [filter, setFilter] = useState("전체");
  const [search, setSearch] = useState("");
  const filtered = vendors.filter((v) => {
    if (filter !== "전체" && v.status !== filter) return false;
    if (search && !v.name.includes(search) && !v.businessNumber.includes(search)) return false;
    return true;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">벤더 관리</h1>
        <Link href="/intra/vendors/new"><Button><Plus className="h-4 w-4 mr-2" />신규 등록</Button></Link>
      </div>
      <Tabs value={filter} onValueChange={setFilter} className="mb-4">
        <TabsList>
          {["전체", "STANDBY", "ACTIVE", "TERMINATED", "DELETED"].map((t) => (
            <TabsTrigger key={t} value={t}>{t}</TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="벤더명 또는 사업자번호 검색" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>
      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>벤더명</TableHead><TableHead>사업자번호</TableHead><TableHead>대표자</TableHead>
              <TableHead>상태</TableHead><TableHead>연결 지점</TableHead><TableHead>등록일</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((v) => (
              <TableRow key={v.id} className="cursor-pointer hover:bg-gray-50">
                <TableCell><Link href={`/intra/vendors/${v.id}`} className="font-medium text-blue-600 hover:underline">{v.displayName}</Link></TableCell>
                <TableCell className="font-mono text-sm">{v.businessNumber}</TableCell>
                <TableCell>{v.representative}</TableCell>
                <TableCell><Badge variant={statusConfig[v.status].variant}>{v.status}</Badge></TableCell>
                <TableCell>{v.partnerName || <span className="text-muted-foreground">미연결</span>}</TableCell>
                <TableCell>{v.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
