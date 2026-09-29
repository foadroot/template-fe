import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { FormGuardProvider } from "@/components/shared/form-guard";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const geist = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Marketing headings. The design's Typography style guide specifies Poppins SemiBold for
 * every heading size; 700 is loaded for the wordmark and display treatments.
 */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ByteSpace — Get access to hundreds of courses",
    template: "%s | ByteSpace",
  },
  description:
    "Unlock your creativity, gain valuable knowledge, and grow your business with our wide range of courses.",
  applicationName: "ByteSpace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        geist.variable,
        geistMono.variable,
        poppins.variable,
        "font-sans",
      )}
      suppressHydrationWarning
    >
      {/* Shell-neutral on purpose: the dashboard's fixed, non-scrolling shell now lives
          in the panel layout, so public pages can scroll normally (design.md D3). */}
      <body className="min-h-full">
        {/* Satoshi (marketing body text) comes from Fontshare. React hoists these into
            <head>; see the note in app/globals.css for why it is not a CSS @import. */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
        />
        <FormGuardProvider>{children}</FormGuardProvider>
        <Toaster />
      </body>
    </html>
  );
}
