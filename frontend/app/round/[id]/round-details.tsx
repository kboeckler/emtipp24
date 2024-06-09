'use client'

import {useEffect, useRef, useState} from "react";
import {readRound} from "@/app/actions/repo";
import {Round} from "@/app/round";

export default function RoundDetails({roundId}: { roundId: string }) {
    const [round, setRound] = useState<Round>()
    //const [bets, setBets] = useState<Bet[]>([])

    const initialized = useRef(false)
    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true
            readRound(roundId).then(round => setRound(round))
            //readBetsForMatch(roundId).then(bets => setBets(bets))
        }
    }, [roundId])

    return (
        <div>
            <span>{round?.name}</span><br/>
            Round first: {round?.winnerFirst?.name}<br/>
            Round second: {round?.winnerSecond?.name}<br/>
        </div>
    );
}
