import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Monitor, Smartphone } from "lucide-react";

const systems = [
  { title: "Intra", description: "RM 백오피스 — 벤더 관리, 세트분배, 권역설정, 정산", href: "/intra/vendors", icon: Building2, screens: 15, color: "bg-blue-500" },
  { title: "Vendor Portal", description: "벤더장(VO) 포털 — 대시보드, 기사 관리, 단위물량 신청", href: "/vendor-portal/dashboard", icon: Monitor, screens: 10, color: "bg-emerald-500" },
  { title: "Plus App", description: "기사 모바일 — 벤더 등록, 출근/퇴근, 배차, M캐시", href: "/plus-app/work", icon: Smartphone, screens: 6, color: "bg-purple-500" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Vendorset UI Mockup</h1>
          <p className="text-muted-foreground text-lg">벤더셋 프로젝트 화면 프로토타입</p>
          <Badge variant="outline" className="mt-2">shadcn/ui + Next.js</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {systems.map((sys) => (
            <Link key={sys.href} href={sys.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${sys.color} flex items-center justify-center mb-3`}>
                    <sys.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>{sys.title}</CardTitle>
                  <CardDescription>{sys.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary">{sys.screens}개 화면</Badge>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
