import "./globals.css";
import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import FloatingNavbar from "@/components/FloatingNavbar";
import CursorGlow from "@/components/CursorGlow";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-title",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-text" });

export const metadata: Metadata = {
  title: "SART STUDIOS | Suite Personal de Software & Ingeniería",
  description:
    "Ecosistema de proyectos personales desarrollados por Steffi Ryser para resolver necesidades reales: aprendizaje, transcripción, finanzas y optimización diaria.",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${spaceGrotesk.variable} ${inter.variable}`}>
        <CursorGlow />
        <FloatingNavbar />
        {children}
      </body>
    </html>
  );
}

