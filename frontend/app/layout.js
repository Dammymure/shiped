import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";

import { DM_Sans } from '@next/font/google';
import { UserProvider } from "./Provider";

const inter = DM_Sans({
  weight: ['400', '600'],
  subsets: ['latin'],
});

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
