import {findAllMatches, findMatchesForRound} from "@/app/actions/repo";
import Link from "next/link";
import MatchItem from "@/app/matches/match-item";
import {Match} from "@/app/matches/match";

interface MatchesListProps {
    roundId?: String
}

export default async function MatchesList({roundId}: MatchesListProps) {
    let matches: Match[]
    if (roundId) {
        matches = await findMatchesForRound(roundId)
    } else {
        matches = await findAllMatches()
    }

    return (
        <ul>
            {matches.map((match, index) => (
                    <li key={match.id}><Link href={`/match/${match.id}`}><MatchItem id={match.id}></MatchItem></Link>
                    </li>
                )
            )}
        </ul>
    )
}