"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "react-hot-toast";

export default function ClientWrapper({ children }) {
  const pathname = usePathname();
  const hideLayout = pathname.startsWith("/auth");

  return hideLayout ? (
    <>
      <Toaster position="top-center" />
      {children}
    </>
  ) : (
    <Sidebar>
      <Toaster position="top-center" />
      {children}
    </Sidebar>
  );
}
