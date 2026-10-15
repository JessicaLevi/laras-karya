"use client";

import { usePathname } from "next/navigation";
import { NAVBAR_HIDDEN_ROUTES } from "@/lib/navigation";

export default function NavbarGate({ children }) {
  const pathname = usePathname();

  const hidden =
    pathname === "/" ||
    NAVBAR_HIDDEN_ROUTES.some((r) => r !== "/" && pathname.startsWith(r));

  if (hidden) return null;
  return children;
}