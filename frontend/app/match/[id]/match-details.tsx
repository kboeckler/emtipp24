'use client'

import {Match} from "@/app/matches/match";
import {Bet} from "@/app/bet";
import {useEffect, useRef, useState} from "react";
import {findAllPlayers, MyPlayer, readBetsForMatch, readMatch} from "@/app/actions/repo";
import {Player} from "@/app/player/player";

export default function MatchDetails({matchId}: { matchId: string }) {
    const [match, setMatch] = useState<Match>()
    const [otherBets, setOtherBets] = useState<Bet[]>([])
    const [players, setPlayers] = useState<Map<string, Player>>(new Map())

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
                    findAllPlayers().then(players => {
                        const playerMap: Map<string, Player> = new Map()
                        for (const player of players) {
                            playerMap.set(player.id, player)
                        }
                        setPlayers(playerMap)
                    })
                }
            })
        }
    }, [matchId])

    const renderScoreIfPresent = function () {
        if (match?.scoreA || match?.scoreB) {
            return (
                <div>
                    <h3>Ergebnis des Spiels:</h3>
                    {match?.scoreA} : {match?.scoreB}
                </div>
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
                    {bet.reward}
                </>
            )
        }
    }

    function renderOtherBetsIfPossible() {
        if (matchHasBegun()) {
            return <div>
                <h3>Andere haben getippt:</h3>
                <table className={"tile-table"}>
                    <thead>
                    <tr>
                        <th>Spieler</th>
                        <th>Tipp</th>
                        <th>Punkte</th>
                    </tr>
                    </thead>
                    <tbody>
                    {otherBets.map((bet) => {
                            const otherPlayerName = players.get(bet.playerId)?.name || "?"
                            return (
                                <tr key={bet.id}>
                                    <td>{otherPlayerName}</td>
                                    <td>{bet.teamA} : {bet.teamB}</td>
                                    <td>{renderRewardIfPresent(bet)}</td>
                                </tr>
                            )
                        }
                    )}
                    </tbody>
                </table>
            </div>;
        }
    }

    return (
        <div>
            {renderScoreIfPresent()}
            {renderOtherBetsIfPossible()}
        </div>
    );
}
