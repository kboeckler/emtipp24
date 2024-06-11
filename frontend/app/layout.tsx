import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Link from "next/link";
import CurrentPlayer from "@/app/player/current-player";
import SignInForm from "@/app/login/sign-in-form";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "emtipp24",
    description: "Tippspiel der Fußball Europameisterschft 2024",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            <title>EM-Tipp24</title>
        </head>
        <body className={inter.className}>

        <nav>
            <Link href="/">Home</Link>
            <Link href={"/players"}>Players</Link>
            <Link href={"/teams"}>Teams</Link>
            <Link href={"/matches"}>Matches</Link>
            <CurrentPlayer></CurrentPlayer>
            <SignInForm></SignInForm>
        </nav>

        <h1>EM Tippspiel 24</h1>

        {children}
        </body>
        </html>
    );
}
