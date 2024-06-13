'use client'

import {Match} from "@/app/matches/match";
import {Bet} from "@/app/bet";
import {useEffect, useRef, useState} from "react";
import {readBetsForMatch, readMatch} from "@/app/actions/repo";

export default function MatchDetails({matchId}: { matchId: string }) {
    const [match, setMatch] = useState<Match>()
    const [bets, setBets] = useState<Bet[]>([])

    const initialized = useRef(false)
    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true
            readMatch(matchId).then(matches => setMatch(matches))
            readBetsForMatch(matchId).then(bets => setBets(bets))
        }
    }, [matchId])

    return (
        <div>
            <div>Id: {match?.id}</div>
            <div>Start: {match?.start?.toDateString()} {match?.start?.toLocaleTimeString()}</div>
            <div>Gruppe: {match?.round.name}</div>
            <div>{match?.teamA?.name} gegen {match?.teamB?.name}</div>
            <div>{match?.scoreA} : {match?.scoreB}</div>
            {bets.map((bet) => (
                    <li key={bet.id}>{bet.teamA} : {bet.teamB} ({bet.reward})</li>
                )
            )}
        </div>
    );
}
