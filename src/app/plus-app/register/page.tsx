"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Building2, CheckCircle } from "lucide-react";

export default function RegisterPage() {
  const [invCode, setInvCode] = useState("");
  const [vcCode, setVcCode] = useState("");
  const [invResult, setInvResult] = useState<"idle"|"success"|"error">("idle");
  const [vcResult, setVcResult] = useState<"idle"|"success"|"error">("idle");

  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardHeader><div className="flex items-center gap-2"><UserPlus className="h-5 w-5 text-purple-500" /><CardTitle className="text-lg">벤더 기사 등록</CardTitle></div>
          <CardDescription>초대 코드를 입력하여 벤더에 가입합니다</CardDescription></CardHeader>
        <CardContent className="space-y-3">
          <Input placeholder="INV-XXXXXX" value={invCode} onChange={(e) => { setInvCode(e.target.value); setInvResult("idle"); }} />
          {invResult === "success" && <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-600 mt-0.5" /><div><p className="text-sm font-medium text-green-800">가입 요청이 접수되었습니다</p><p className="text-xs text-green-600">VO 승인을 기다려주세요</p></div></div>}
          {invResult === "error" && <p className="text-sm text-red-500">초대 코드를 입력해주세요</p>}
          <Button className="w-full" onClick={() => invCode ? setInvResult("success") : setInvResult("error")}>등록 신청</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><div className="flex items-center gap-2"><Building2 className="h-5 w-5 text-purple-500" /><CardTitle className="text-lg">벤더장(VO) 등록</CardTitle></div>
          <CardDescription>벤더 코드를 입력하여 벤더장으로 등록합니다</CardDescription></CardHeader>
        <CardContent className="space-y-3">
          <Input placeholder="VC-2026-XXX" value={vcCode} onChange={(e) => { setVcCode(e.target.value); setVcResult("idle"); }} />
          {vcResult === "success" && <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-600 mt-0.5" /><p className="text-sm font-medium text-green-800">벤더장(VO) 등록 완료</p></div>}
          {vcResult === "error" && <p className="text-sm text-red-500">벤더 코드를 입력해주세요</p>}
          <Button className="w-full" variant="outline" onClick={() => vcCode ? setVcResult("success") : setVcResult("error")}>VO 등록</Button>
        </CardContent>
      </Card>
    </div>
  );
}
