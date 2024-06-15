import {isAuthenticated} from "@/app/actions/repo";
import MatchesList from "@/app/matches/matches-list";
import LoginForm from "@/app/login/login-form";
import Link from "next/link";

export default async function LandingContainer() {
    const authenticated = await isAuthenticated()

    const renderContentIfAuthenticated = function () {
        if (authenticated) {
            return (
                <div>
                    <div>
                        Springe zu <br/>
                        <ul>
                            <li><Link href={"#future"}>Die nächsten Spiele</Link></li>
                            <li><Link href={"#past"}>Die vergangenen Spiele</Link></li>
                        </ul>
                    </div>
                    <div className={"list-container"}>
                        <div id={"future"}>
                            <h2>Die nächsten Spiele</h2>
                            <MatchesList inFuture={true}></MatchesList>
                        </div>
                        <div id={"past"}>
                            <h2>Die vergangenen Spiele</h2>
                            <MatchesList inPast={true}></MatchesList>
                        </div>
                    </div>
                </div>
            )
        }
    }

    const renderLoginInstructionIfNeeded = function () {
        if (!authenticated) {
            return (
                <div>
                    <div>Um die Seite zu benutzen, melde dich bitte an.</div>
                    <LoginForm></LoginForm>
                </div>
            )
        }
    }

    return (
        <>
            {renderContentIfAuthenticated()}
            {renderLoginInstructionIfNeeded()}
        </>
    );
}
