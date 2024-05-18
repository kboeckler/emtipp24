'use client'

import {Match} from "@/app/match";
import {Bet} from "@/app/bet";

interface MatchDetailsProps {
    match: Match
    bets: Bet[]
}

export default function MatchDetails({match, bets}: MatchDetailsProps) {
    const id = match.id

    return (
        <div>
            <div>Id: {match?.id}</div>
            <div>Start: {match?.start?.toDateString()}</div>
            <div>{match?.teamA?.name} gegen {match?.teamB?.name}</div>
            {bets.map((bet) => (
                    <li key={bet.id}>{bet.teamA} : {bet.teamB} ({bet.reward})</li>
                )
            )}
        </div>
    );
}
