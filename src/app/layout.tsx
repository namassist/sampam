import "../styles/globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import Provider from "@/components/Provider";
import { Toaster } from "@/components/ui/toaster";

const open_sans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-openSans",
});

export const metadata: Metadata = {
  title: "Sampam App",
  description: "build by sampam team",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${open_sans.className} bg-[#F2F2F4]`}>
        <Provider>{children}</Provider>
        <Toaster />
      </body>
    </html>
  );
}
