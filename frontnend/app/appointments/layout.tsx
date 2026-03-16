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
  return <div className="max-w-6xl mx-auto  px-6 py-8 pt-24">{children}</div>;
}
