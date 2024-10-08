import "./globals.css";
import clsx from "clsx";
import {AuthProvider} from '../context/AuthContext'
import { Poppins, Lato } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });
const lato = Lato({subsets: ["latin"], weight: ["100", "300", "400", "700", "900"], variable: "--lato"})
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <AuthProvider>
      <body className={clsx('bg-[#EFF2F6] ', poppins.className)}>{children}</body>
      </AuthProvider>
    </html>
  );
}
