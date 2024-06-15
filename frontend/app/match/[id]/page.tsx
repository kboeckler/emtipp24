import MatchDetails from "@/app/match/[id]/match-details";
import MatchBetForm from "@/app/match/[id]/match-bet-form";
import MatchScoreForm from "@/app/match/[id]/match-score-form";

export default async function MatchDetailsPage({params}: { params: { id: string } }) {
    const {id} = params

    return (
        <main>
            <h2>Spiel Detail</h2>
            <MatchDetails matchId={id}></MatchDetails>
            <MatchBetForm matchId={id}></MatchBetForm>
            <MatchScoreForm matchId={id}></MatchScoreForm>
        </main>
    );
}
