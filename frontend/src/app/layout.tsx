import type { Metadata } from "next";
import "./globals.css";

import { ApolloWrapper } from "@/lib/apollo-wrapper";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-100">
        <ApolloWrapper>
         {children}
        </ApolloWrapper>
       </body>
    </html>
  );
}
