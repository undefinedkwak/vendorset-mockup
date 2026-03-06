import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

export default function VolumeRequestPage() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-3"><Clock className="h-12 w-12 text-muted-foreground" /></div>
          <CardTitle>단위물량 변경 신청</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Badge variant="outline" className="text-sm">P1 — 추후 구현</Badge>
          <p className="text-sm text-muted-foreground">
            이 기능은 P1 범위입니다.<br />
            관련 정책(P-V-016, P-V-017, P-OP-007)이 draft 상태이며,<br />
            승인 후 적용 시점 등 TBD 항목 확정 후 구현됩니다.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
