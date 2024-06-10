'use client'

import {useEffect, useRef, useState} from "react";
import {readBetsForRound, readRound} from "@/app/actions/repo";
import {Round} from "@/app/round";
import {RoundBet} from "@/app/round-bet";

export default function RoundDetails({roundId}: { roundId: string }) {
    const [round, setRound] = useState<Round>()
    const [bets, setBets] = useState<RoundBet[]>([])

    const initialized = useRef(false)
    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true
            readRound(roundId).then(round => setRound(round))
            readBetsForRound(roundId).then(bets => setBets(bets))
        }
    }, [roundId])

    return (
        <div>
            <span>{round?.name}</span><br/>
            Round first: {round?.winnerFirstId}<br/>
            Round second: {round?.winnerSecondId}<br/>
            {bets.map((bet) => (
                    <li key={bet.id}>{bet.playerId} wettet {bet.placingTeamId}</li>
                )
            )}
        </div>
    );
}
