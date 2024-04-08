import { ThemeProvider } from "@/components/theme-provider";
import { TailwindIndicator } from "@/components/ui/tailwind-indicator";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PulseCaree",
  description: "Connect with your nurse online.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    // do we need SessionProvider here?
    <SessionProvider session={session}>
      <html lang="en">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <body className={`max-h-screen ${inter.className}`}>
            {children}
            <TailwindIndicator />
          </body>
        </ThemeProvider>
      </html>
    </SessionProvider>
  );
}
