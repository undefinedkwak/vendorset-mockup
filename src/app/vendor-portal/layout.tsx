"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, FileText, Receipt, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { href: "/vendor-portal/dashboard", label: "대시보드", icon: LayoutDashboard, p1: false },
  { href: "/vendor-portal/agents", label: "기사 활동 관리", icon: Users, p1: false },
  { href: "/vendor-portal/volume-request", label: "단위물량 신청", icon: FileText, p1: true },
  { href: "/vendor-portal/settlement", label: "정산 조회", icon: Receipt, p1: false },
];

export default function VendorPortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="flex min-h-screen">
      <aside className="w-60 bg-white border-r flex flex-col">
        <div className="p-4 border-b">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4" />홈으로
          </Link>
          <div className="flex items-center gap-2 mt-2"><h2 className="text-lg font-bold">Vendor Portal</h2></div>
          <p className="text-xs text-muted-foreground">벤더장 포털</p>
          <div className="mt-2 flex items-center gap-2">
            <Badge variant="outline" className="text-xs">대한물류</Badge>
            <Badge className="bg-emerald-500 text-xs">ACTIVE</Badge>
          </div>
        </div>
        <nav className="flex-1 p-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}
              className={cn("flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                pathname.startsWith(item.href) ? "bg-emerald-50 text-emerald-700 font-medium" : "text-muted-foreground hover:bg-gray-100"
              )}>
              <item.icon className="h-4 w-4" />
              {item.label}
              {item.p1 && <Badge variant="outline" className="text-[10px] px-1 py-0 ml-auto">P1</Badge>}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 bg-gray-50 p-6">{children}</main>
    </div>
  );
}
