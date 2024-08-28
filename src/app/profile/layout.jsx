import { Poppins, Lato } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });
const lato = Lato({subsets: ["latin"], weight: ["100", "300", "400", "700", "900"], variable: "--lato"})
import clsx from "clsx";
import {AuthProvider} from '../../context/AuthContext'

export default function ProfileLayout({ children }) {

    return (
      <html lang="en">
        <AuthProvider>
        <body  className={clsx('bg-slate-200/60', poppins.className)}>{children}</body>
        </AuthProvider>
      </html>
    );
  }