"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserPlus, Power, Bell, Wallet, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/plus-app/register", label: "벤더 등록", icon: UserPlus },
  { href: "/plus-app/work", label: "출근/퇴근", icon: Power },
  { href: "/plus-app/offer", label: "배차 오퍼", icon: Bell },
  { href: "/plus-app/mcash", label: "M캐시", icon: Wallet },
];

export default function PlusAppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[390px] bg-white min-h-screen flex flex-col shadow-xl">
        <div className="bg-purple-600 text-white px-4 py-2 flex justify-between items-center text-xs">
          <Link href="/" className="flex items-center gap-1 hover:text-purple-200"><ChevronLeft className="h-3 w-3" />홈</Link>
          <span className="font-bold">Plus App</span>
          <span>09:41</span>
        </div>
        <div className="flex-1 overflow-auto">{children}</div>
        <nav className="border-t bg-white grid grid-cols-4">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}
              className={cn("flex flex-col items-center gap-1 py-3 text-xs transition-colors",
                pathname.startsWith(item.href) ? "text-purple-600 font-medium" : "text-muted-foreground"
              )}>
              <item.icon className="h-5 w-5" />{item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
