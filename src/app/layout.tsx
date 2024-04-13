import { ThemeProvider } from "@/components/theme-provider";
import { TailwindIndicator } from "@/components/ui/tailwind-indicator";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { ApolloProviders } from "./providers/apollo-provider";

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
  // const session = await auth();
  return (
    <ApolloProviders>
      <html lang="en">
        <body className={`max-h-screen ${inter.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextTopLoader showSpinner={false} />
            {children}
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </ApolloProviders>
  );
}
