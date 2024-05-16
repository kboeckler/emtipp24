'use client'

import {Match} from "@/app/match";
import {Bet} from "@/app/bet";
import {useState} from "react";

interface MatchDetailsProps {
    match: Match
}

export default function MatchDetails({match}: MatchDetailsProps) {
    const id = match.id

    const [bets, setBets] = useState<Bet[]>([]);

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
