import MatchScoreForm from "@/app/match/[id]/match-score-form";
import MatchTile from "@/app/matches/match-tile";
import MatchDetails from "@/app/match/[id]/match-details";

export default async function MatchDetailsPage({params}: { params: { id: string } }) {
    const {id} = params

    return (
        <main>
            <h2>Spiel Detail</h2>
            <MatchTile id={id}></MatchTile>
            <MatchDetails matchId={id}></MatchDetails>
            <MatchScoreForm matchId={id}></MatchScoreForm>
        </main>
    );
}
