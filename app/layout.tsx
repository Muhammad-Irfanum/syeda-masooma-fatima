import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Syeda Masooma Fatima — Special Education Teacher", template: "%s — Syeda Masooma Fatima" },
  description: "Portfolio of Syeda Masooma Fatima, an experienced Special Education Teacher in Kohat, Pakistan.",
  keywords: ["Special Education Teacher", "Inclusive Education", "Kohat", "Portfolio"],
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0d1930" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
