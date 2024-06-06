import Link from "next/link";
import SignInForm from "@/app/login/sign-in-form";
import CurrentPlayer from "@/app/player/current-player";

export default function Home() {

    return (
        <main>
            <h1>EM Tippspiel 24</h1>
            <Link href="/">Home</Link><br/>
            <Link href={"/matches"}>Match List</Link><br/>
            <hr/>
            <CurrentPlayer></CurrentPlayer>
            <hr/>
            <br/>
            <SignInForm></SignInForm>
        </main>
    );
}
