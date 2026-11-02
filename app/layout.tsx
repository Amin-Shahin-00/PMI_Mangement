import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MIRROR Mangement | Dashboard",
  description: "A clear workspace for projects, tasks, sprints and team delivery.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

