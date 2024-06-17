'use client'

import {Match} from "@/app/matches/match";
import {Bet} from "@/app/bet";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import {insertBet, MyPlayer, readBetsForMatch, readMatch, updateBet} from "@/app/actions/repo";
import {Player} from "@/app/player/player";

export default function MatchBetForm({matchId}: { matchId: string }) {
    const [match, setMatch] = useState<Match>();
    const [myBet, setMyBet] = useState<Bet>();
    const [myBetA, setMyBetA] = useState<Number | undefined>()
    const [myBetB, setMyBetB] = useState<Number | undefined>()
    const [saving, setSaving] = useState(false)
    const [currentPlayer, setCurrentPlayer] = useState<Player | undefined>()

    const initialized = useRef(false)
    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true
            MyPlayer().then(myPlayer => {
                setCurrentPlayer(myPlayer)
                if (myPlayer !== undefined) {
                    readMatch(matchId).then(matches => setMatch(matches))
                    readBetsForMatch(matchId).then(bets => {
                        for (const bet of bets) {
                            if (bet.playerId == myPlayer.id) {
                                setMyBet(bet)
                                setMyBetA(bet.teamA)
                                setMyBetB(bet.teamB)
                                break
                            }
                        }
                    })
                }
            })
        }
    }, [matchId])

    const teamAChanged = async function (e: ChangeEvent) {
        const inputField = e.target as HTMLInputElement;
        const teamAValue = Number(inputField.value)

        if (teamAValue < 0) {
            return
        }

        setMyBetA(teamAValue)
        setSaving(true)

        let savingBet = myBet
        if (savingBet == undefined) {
            savingBet = {matchId: match?.id!!, playerId: currentPlayer?.id!!, teamA: teamAValue, teamB: 0}
            savingBet = await insertBet(savingBet)
        } else {
            savingBet.teamA = teamAValue
            savingBet = await updateBet(savingBet)
        }

        setMyBet(savingBet)
        setSaving(false)
    }

    const teamBChanged = async function (e: ChangeEvent) {
        const inputField = e.target as HTMLInputElement;
        const teamBValue = Number(inputField.value)

        if (teamBValue < 0) {
            return
        }

        setMyBetB(teamBValue)
        setSaving(true)

        let savingBet = myBet
        if (savingBet == undefined) {
            savingBet = {matchId: match?.id!!, playerId: currentPlayer?.id!!, teamA: 0, teamB: teamBValue}
            savingBet = await insertBet(savingBet)
        } else {
            savingBet.teamB = teamBValue
            savingBet = await updateBet(savingBet)
        }

        setMyBet(savingBet)
        setSaving(false)
    }

    function matchHasBegun() {
        return match?.start !== undefined && match.start < new Date();
    }

    const renderFormIfPossible = function () {
        if (currentPlayer?.id != undefined) {
            const valA = myBetA !== undefined ? "" + myBetA : ""
            const valB = myBetB !== undefined ? "" + myBetB : ""
            return (
                <form>
                    <div>Mein Tipp:</div>
                    <input
                        className={"input-bet " + (myBetA !== undefined ? "has-value " : "") + (saving ? "is-busy" : "")}
                        type={"number"}
                        name={"teamA"} onChange={teamAChanged} value={valA}
                        disabled={saving || matchHasBegun()}></input>
                    <span>:</span>
                    <input
                        className={"input-bet " + (myBetB !== undefined ? "has-value " : "") + (saving ? "is-busy" : "")}
                        type={"number"}
                        name={"teamB"} onChange={teamBChanged}
                        value={valB}
                        disabled={saving || matchHasBegun()}></input>
                </form>
            )
        }
        return (
            <div></div>
        )
    }

    return renderFormIfPossible()

}