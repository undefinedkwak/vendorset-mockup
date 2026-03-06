"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ChevronLeft } from "lucide-react";

export default function NewVendorPage() {
  const [form, setForm] = useState({ businessNumber: "", businessName: "", representative: "", displayName: "", region: "" });
  return (
    <div>
      <Breadcrumb className="mb-4"><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="/intra/vendors">벤더 관리</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem>신규 등록</BreadcrumbItem></BreadcrumbList></Breadcrumb>
      <div className="flex items-center gap-3 mb-6"><Link href="/intra/vendors"><ChevronLeft className="h-5 w-5" /></Link><h1 className="text-2xl font-bold">벤더 신규 등록</h1></div>
      <div className="max-w-2xl space-y-6">
        <Card><CardHeader><CardTitle>기본 정보</CardTitle></CardHeader><CardContent className="space-y-4">
          <div className="space-y-2"><Label>사업자등록번호 *</Label><Input placeholder="000-00-00000" value={form.businessNumber} onChange={(e) => setForm({...form, businessNumber: e.target.value})} /><p className="text-xs text-muted-foreground">TERMINATED/DELETED 상태 제외하고 중복 검증됩니다</p></div>
          <div className="space-y-2"><Label>사업자명 *</Label><Input placeholder="회사명" value={form.businessName} onChange={(e) => setForm({...form, businessName: e.target.value})} /></div>
          <div className="space-y-2"><Label>대표자명 *</Label><Input placeholder="대표자 이름" value={form.representative} onChange={(e) => setForm({...form, representative: e.target.value})} /></div>
          <div className="space-y-2"><Label>표시 이름</Label><Input placeholder="포털에 표시될 이름" value={form.displayName} onChange={(e) => setForm({...form, displayName: e.target.value})} /></div>
          <div className="space-y-2"><Label>희망 운영 지역</Label><Input placeholder="시/군/구 (예: 강남구, 서초구)" value={form.region} onChange={(e) => setForm({...form, region: e.target.value})} /></div>
        </CardContent></Card>
        <Card><CardHeader><CardTitle>서류 업로드</CardTitle></CardHeader><CardContent className="space-y-4">
          <div className="space-y-2"><Label>사업자등록증</Label><Input type="file" accept="image/*,.pdf" /></div>
          <div className="space-y-2"><Label>계약서</Label><Input type="file" accept="image/*,.pdf" /></div>
        </CardContent></Card>
        <div className="flex gap-3"><Button onClick={() => alert("벤더가 등록되었습니다. (Vendor Code: VC-2026-006)")} className="flex-1">등록</Button><Link href="/intra/vendors"><Button variant="outline">취소</Button></Link></div>
      </div>
    </div>
  );
}
