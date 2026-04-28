import "./globals.css";
import { Providers } from "@/providers/Providers";
import { Metadata } from "next";
import { Barlow_Condensed, Montserrat } from "next/font/google";

export const sans = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sans",
});

export const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
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
      <body className={`${sans.variable} ${display.variable} app-shell`}>
        <Providers>
          <div>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
