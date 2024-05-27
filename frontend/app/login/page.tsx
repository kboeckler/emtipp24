import Link from "next/link";
import LogoutForm from "@/app/login/logout-form";
import LoginForm from "@/app/login/login-form";

export default function LoginPage() {

    return (
        <main>
            <h1>EM Tippspiel 24</h1>
            <Link href={"/login"}>Login</Link><br/>
            <Link href="/">Home</Link><br/>
            <Link href={"/matches"}>Match List</Link><br/>
            <hr/>
            <LoginForm></LoginForm>
            <LogoutForm></LogoutForm>
        </main>
    );
}
