import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Morr.ai – Proactive AI Agent for Teams",
  description: "Morr.ai connects your tools, learns your workflow, and proactively delivers insights and automates tasks.",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning className={dmSans.variable}>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          dmSans.className
        )}
      >
        <Header />
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}

interface RootLayoutProps {
  children: React.ReactNode;
}
