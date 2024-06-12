import TeamsList from "@/app/teams/teams-list";
import TeamBetForm from "@/app/teams/team-bet-form";
import TeamScoreForm from "@/app/teams/team-score-form";

export default async function Teams() {
    return (
        <main>
            <h2>Team List</h2>
            <TeamsList></TeamsList>
            <TeamBetForm></TeamBetForm>
            <TeamScoreForm></TeamScoreForm>
        </main>
    )
}
