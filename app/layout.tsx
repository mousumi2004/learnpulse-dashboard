import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Nexus OS | Student Learning Dashboard",
  description: "A futuristic learning dashboard built with Next.js, Tailwind CSS, and Framer Motion."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html data-scroll-behavior="smooth" lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
