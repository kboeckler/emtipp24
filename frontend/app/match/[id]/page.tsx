import MatchScoreForm from "@/app/match/[id]/match-score-form";
import MatchTile from "@/app/matches/match-tile";
import MatchDetails from "@/app/match/[id]/match-details";
import {findCurrentPlayer, readBetsForMatch, readMatch} from "@/app/actions/repo";

export default async function MatchDetailsPage({params}: { params: { id: string } }) {
    const {id} = params
    const match = await readMatch(id)
    const player = await findCurrentPlayer()
    const bets = await readBetsForMatch(id)

    function renderIfPossible() {
        if (player !== undefined) {
            return (
                <>
                    <MatchTile player={player} match={match} matchBets={bets}></MatchTile>
                    <MatchDetails player={player} match={match} matchBets={bets}></MatchDetails>
                </>
            )
        }
    }

    return (
        <main>
            <h2>Spiel Detail</h2>
            {renderIfPossible()}
            <MatchScoreForm matchId={id}></MatchScoreForm>
        </main>
    );
}
