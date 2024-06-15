import {isAuthenticated} from "@/app/actions/repo";
import MatchesList from "@/app/matches/matches-list";
import LoginForm from "@/app/login/login-form";
import Link from "next/link";

export default async function LandingContainer() {
    const authenticated = await isAuthenticated()

    const renderNextMatchesIfPossible = function () {
        if (authenticated) {
            return (
                <div>
                    <div>
                        Springe zu <br/>
                        <ul>
                            <li>
                                <Link href={"#future"}>Die nächsten Matches</Link>
                            </li>
                            <li><Link href={"#past"}>Die vergangenen Matches</Link></li>
                        </ul>
                    </div>
                    <div className={"landing-list-container"}>
                        <div id={"future"}>
                            <h2>Die nächsten Matches</h2>
                            <MatchesList inFuture={true}></MatchesList>
                        </div>
                        <div id={"past"}>
                            <h2>Die vergangenen Matches</h2>
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
            {renderNextMatchesIfPossible()}
            {renderLoginInstructionIfNeeded()}
        </>
    );
}
