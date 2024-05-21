import {signIn} from "@/auth";
import Link from "next/link";
import LogoutForm from "@/app/login/logout-form";

export default function LoginPage() {
    const login = async function () {
        "use server"
        await signIn("google")
    }

    return (
        <main>
            <h1>EM Tippspiel 24</h1>
            <Link href={"/login"}>Login</Link><br/>
            <Link href="/">Home</Link><br/>
            <Link href={"/matches"}>Match List</Link><br/>
            <hr/>
            <form
                action={login}
            >
                <button type="submit">Signin with Google</button>
            </form>
            <LogoutForm></LogoutForm>
        </main>
    );
}
