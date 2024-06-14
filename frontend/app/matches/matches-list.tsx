import {findAllMatches, findMatchesForRound, MyPlayer} from "@/app/actions/repo";
import Link from "next/link";
import MatchItem from "@/app/matches/match-item";
import {Match} from "@/app/matches/match";

interface MatchesListProps {
    roundId?: String
}

export default async function MatchesList({roundId}: MatchesListProps) {
    let matches: Match[] = []

    const currentPlayer = await MyPlayer()
    if (currentPlayer !== undefined) {
        if (roundId) {
            matches = await findMatchesForRound(roundId)
        } else {
            matches = await findAllMatches()
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