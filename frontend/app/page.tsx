import Link from "next/link";

export default function Home() {
    return (
        <main>
            <h1>EM Tippspiel 24</h1>
            <Link href={"/login"}>Login</Link><br/>
            <Link href="/">Home</Link><br/>
            <Link href={"/matches"}>Match List</Link><br/>
        </main>
    );
}
