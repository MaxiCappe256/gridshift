import Navbar from "@/components/Navbar";
import "./globals.css";
import { Providers } from "@/providers/Providers";
import { Metadata } from "next";
import { Inter, Montserrat, Poppins, Roboto } from "next/font/google";
import { Toaster } from "sonner";

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "GripShift",
  description: "Agenda para entrenadores",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${montserrat.className} bg-gray-50`}>
        <Providers>
          <div>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
