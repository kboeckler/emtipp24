import Link from "next/link";
import SignInForm from "@/app/login/sign-in-form";

export default function Home() {
    return (
        <main>
            <h1>EM Tippspiel 24</h1>
            <Link href="/">Home</Link><br/>
            <Link href={"/matches"}>Match List</Link><br/>
            <hr/>
            <br/>
            <SignInForm></SignInForm>
        </main>
    );
}
