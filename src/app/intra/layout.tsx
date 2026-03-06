"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, Truck, Settings, CalendarDays, Receipt, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/intra/vendors", label: "벤더 관리", icon: Building2 },
  { href: "/intra/set-allocation", label: "세트분배 관리", icon: Truck },
  { href: "/intra/policies", label: "권역설정관리", icon: Settings },
  { href: "/intra/weekly-plan", label: "주간 계획 조정", icon: CalendarDays },
  { href: "/intra/settlement", label: "정산 관리", icon: Receipt },
];

export default function IntraLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="flex min-h-screen">
      <aside className="w-60 bg-white border-r flex flex-col">
        <div className="p-4 border-b">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4" />홈으로
          </Link>
          <h2 className="text-lg font-bold mt-2">Intra</h2>
          <p className="text-xs text-muted-foreground">RM 백오피스</p>
        </div>
        <nav className="flex-1 p-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}
              className={cn("flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                pathname.startsWith(item.href) ? "bg-blue-50 text-blue-700 font-medium" : "text-muted-foreground hover:bg-gray-100"
              )}>
              <item.icon className="h-4 w-4" />{item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 bg-gray-50 p-6">{children}</main>
    </div>
  );
}
