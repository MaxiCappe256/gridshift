"use client";

import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AppointmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/");
    }
  }, [router]);
  return (
    <>
      <Navbar />
      <main className="container-page page-top page-pad">{children}</main>
    </>
  );
}
