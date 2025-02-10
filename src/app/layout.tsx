import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  applicationName: "Hajj Travelers",
  title: "Hajj Travelers",
  description: "Hajji travelers ticket purchasing mini app",
  manifest: "/web.manifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Hajj Travelers",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
