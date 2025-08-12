"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function ClientWrapper({ children }) {
  const pathname = usePathname();
  const hideLayout = pathname.startsWith("/auth");

  return !hideLayout ? <Sidebar>{children}</Sidebar> : <>{children}</>;
}
