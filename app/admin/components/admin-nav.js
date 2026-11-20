"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const ITEMS = [
  { label: "Lowongan", href: "/admin/jobs" },
  { label: "Lamaran", href: "/admin/applications" },
  { label: "Pengguna", href: "/admin/users" },
];

export default function AdminNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Menu admin" className="flex flex-wrap items-center gap-1">
      {ITEMS.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
              active ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
            )}
          >
            {item.label}
          </Link>
        );
      })}
      <Link href="/" className="ml-2 rounded-lg px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted">
        Keluar admin
      </Link>
    </nav>
  );
}
