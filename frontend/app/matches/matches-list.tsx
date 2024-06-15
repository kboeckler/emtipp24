import {findAllMatches, findMatchesForRound, MyPlayer} from "@/app/actions/repo";
import Link from "next/link";
import MatchItem from "@/app/matches/match-item";
import {Match} from "@/app/matches/match";

interface MatchesListProps {
    roundId?: String
    inFuture?: Boolean
    inPast?: Boolean
}

export default async function MatchesList({roundId, inFuture, inPast}: MatchesListProps) {
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
            }
            if (inPast) {
                matches = matches.filter(matchHasBegun)
            }
            matches.sort((a, b) => a.start.getTime() - b.start.getTime())
        }
    }

    return (
        <div className={"tile-list"}>
            {matches.map((match, index) => (
                    <div className={"tile-match"} key={match.id}><Link href={`/match/${match.id}`}><MatchItem
                        id={match.id}></MatchItem></Link>
                    </div>
                )
            )}
        </div>
    )
}