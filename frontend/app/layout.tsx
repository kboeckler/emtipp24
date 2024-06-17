import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Link from "next/link";
import CurrentPlayer from "@/app/player/current-player";
import SignInForm from "@/app/login/sign-in-form";
import SoftwareInfo from "@/app/info/software-info";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "EM-Tipp 24",
    description: "Tippspiel der Fußball Europameisterschft 2024",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>

        <nav>
            <Link href="/">Start</Link>
            <Link href={"/players"}>Spieler</Link>
            <Link href={"/teams"}>Mannschaften</Link>
            <Link href={"/matches"}>Spiele</Link>
            <CurrentPlayer></CurrentPlayer>
            <SignInForm></SignInForm>
            <SoftwareInfo></SoftwareInfo>
        </nav>

        <h1>EM Tippspiel 24</h1>

        {children}
        </body>
        </html>
    );
}
