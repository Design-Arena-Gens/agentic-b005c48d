import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agent Banao | Voice AI Concierge Builder",
  description:
    "Design, simulate, and launch bilingual call agents with live tooling and escalation controls.",
  keywords: [
    "voice agent",
    "call center automation",
    "AI concierge",
    "Agent Banao",
    "Hindi English AI agent",
  ],
  openGraph: {
    title: "Agent Banao — Launch a voice-native AI concierge in minutes",
    description:
      "Blueprint tone, tools, and escalation logic, then test live conversations right in the browser.",
    url: "https://agentic-b005c48d.vercel.app",
    siteName: "Agent Banao",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agent Banao — Voice-native AI concierge",
    description:
      "Rapidly design agents, connect tools, and simulate calls with bilingual support.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
