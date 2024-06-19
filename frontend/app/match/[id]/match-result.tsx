import {Match} from "@/app/matches/match";

export default async function MatchResult({match}: {
    match: Match
}) {

    function renderResultIfPossible() {
        if (match.scoreA || match.scoreB) {
            return (
                <div>Ergebnis: {match.scoreA} : {match.scoreB}</div>
            );
        }
    }

    return renderResultIfPossible()

}
