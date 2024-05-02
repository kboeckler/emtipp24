import "./page.css";
import Link from "next/link";

export default function Home() {
    return (
        <main>
            <h1>Hallo Kevin</h1>
            <Link href={"/page2"}>Page2</Link>
        </main>
    );
}
