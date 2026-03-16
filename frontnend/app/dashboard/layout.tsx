import Navbar from "@/components/Navbar";

export default function AppointmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-8 pt-24">{children}</div>
    </>
  );
}
