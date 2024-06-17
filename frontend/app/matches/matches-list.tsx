import {findAllMatches, findMatchesForRound, MyPlayer} from "@/app/actions/repo";
import {Match} from "@/app/matches/match";
import MatchTile from "@/app/matches/match-tile";

interface MatchesListProps {
    roundId?: String
    inFuture?: Boolean
    inPast?: Boolean
    maxItems?: Number
}

export default async function MatchesList({roundId, inFuture, inPast, maxItems}: MatchesListProps) {
    let matches: Match[] = []

    function matchHasBegun(match: Match) {
        return match?.start !== undefined && match.start < new Date();
    }

    function matchHasNotBegun(match: Match) {
        return !matchHasBegun(match)
    }

    const currentPlayer = await MyPlayer()
    if (currentPlayer !== undefined) {
        if (roundId) {
            matches = await findMatchesForRound(roundId)
        } else {
            matches = await findAllMatches()
            if (inFuture) {
                matches = matches.filter(matchHasNotBegun)
                matches.sort((a, b) => a.start.getTime() - b.start.getTime())
            }
            if (inPast) {
                matches = matches.filter(matchHasBegun)
                matches.sort((a, b) => b.start.getTime() - a.start.getTime())
            }
            if (maxItems) {
                const matchesMaxed: Match[] = []
                for (let i = 0; i < Math.min(matches.length, maxItems.valueOf()); i++) {
                    const item = matches[i]
                    matchesMaxed.push(item)
                }
                matches = matchesMaxed
            }
        }
    }

    return (
        <div className={"tile-list"}>
            {matches.map((match, index) => (
                    <MatchTile key={match.id} id={match.id}></MatchTile>
                )
            )}
        </div>
    )
}