'use client'

import {Match} from "@/app/matches/match";
import {Bet} from "@/app/bet";
import {useEffect, useRef, useState} from "react";
import {MyPlayer, readBetsForMatch, readMatch} from "@/app/actions/repo";

export default function MatchDetails({matchId}: { matchId: string }) {
    const [match, setMatch] = useState<Match>()
    const [otherBets, setOtherBets] = useState<Bet[]>([])

    const initialized = useRef(false)
    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true
            MyPlayer().then(myPlayer => {
                if (myPlayer !== undefined) {
                    readMatch(matchId).then(matches => setMatch(matches))
                    readBetsForMatch(matchId).then(bets => {
                        const val: Bet[] = []
                        for (const bet of bets) {
                            if (bet.playerId !== myPlayer.id) {
                                val.push(bet)
                            }
                        }
                        setOtherBets(val)
                    })
                }
            })
        }
    }, [matchId])

    const renderScoreIfPresent = function () {
        if (match?.scoreA || match?.scoreB) {
            return (
                <div>{match?.scoreA} : {match?.scoreB}</div>
            )
        }
    }

    function matchHasBegun() {
        return match?.start !== undefined && match.start < new Date();
    }

    function renderRewardIfPresent(bet: Bet) {
        if (bet.reward) {
            return (
                <>
                    ({bet.reward})
                </>
            )
        }
    }

    function renderOtherBetsIfPossible() {
        if (matchHasBegun()) {
            return <div>
                <div>Andere haben getippt:</div>
                {otherBets.map((bet) => (
                        <li key={bet.id}>{bet.teamA} : {bet.teamB} {renderRewardIfPresent(bet)}</li>
                    )
                )}
            </div>;
        }
    }

    return (
        <div>
            <div>Start: {match?.start?.toDateString()} {match?.start?.toLocaleTimeString()}</div>
            <div>Gruppe: {match?.round.name}</div>
            <h3>{match?.teamA?.name} gegen {match?.teamB?.name}</h3>
            {renderScoreIfPresent()}
            {renderOtherBetsIfPossible()}
        </div>
    );
}
