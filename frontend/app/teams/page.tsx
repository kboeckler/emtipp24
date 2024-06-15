import TeamsList from "@/app/teams/teams-list";
import TeamBetForm from "@/app/teams/team-bet-form";
import TeamScoreForm from "@/app/teams/team-score-form";
import Link from "next/link";

export default async function Teams() {
    return (
        <main>
            <div>
                Springe zu <br/>
                <ul>
                    <li><Link href={"#teams"}>Mannschaften Übersicht</Link></li>
                    <li><Link href={"#team-bets"}>Turniergebnisse</Link></li>
                </ul>
            </div>
            <div className={"list-container"}>
                <div id={"teams"}>
                    <h2>Mannschaften Übersicht</h2>
                    <TeamsList></TeamsList>
                </div>
                <div id={"team-bets"}>
                    <h2>Turnierergebnisse</h2>
                    <TeamBetForm></TeamBetForm>
                    <TeamScoreForm></TeamScoreForm>
                </div>
            </div>
        </main>
    )
}
