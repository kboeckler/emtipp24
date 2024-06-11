'use client'

import {Match} from "@/app/matches/match";
import {Bet} from "@/app/bet";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import {insertBet, MyPlayer, readBetsForMatch, readMatch, updateBet} from "@/app/actions/repo";
import {Player} from "@/app/player/player";

export default function MatchBetForm({matchId}: { matchId: string }) {
    const [match, setMatch] = useState<Match>();
    const [myBet, setMyBet] = useState<Bet>();
    const [myBetA, setMyBetA] = useState(0)
    const [myBetB, setMyBetB] = useState(0)
    const [saving, setSaving] = useState(false)
    const [currentPlayer, setCurrentPlayer] = useState<Player | undefined>()

    const initialized = useRef(false)
    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true
            MyPlayer().then(setCurrentPlayer)
            readMatch(matchId).then(matches => setMatch(matches))
            readBetsForMatch(matchId).then(bets => {
                for (const bet of bets) {
                    if (bet.playerId == "meinsa") {
                        setMyBet(bet)
                        setMyBetA(bet.teamA)
                        setMyBetB(bet.teamB)
                        break
                    }
                }
            })
        }
    }, [matchId])

    const teamAChanged = async function (e: ChangeEvent) {
        const inputField = e.target as HTMLInputElement;
        const teamAValue = Number(inputField.value)
        console.log('A: ' + teamAValue)
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
        console.log('B: ' + teamBValue)
        setMyBetB(teamBValue)
        setSaving(true)

        let savingBet = myBet
        if (savingBet == undefined) {
            savingBet = {matchId: match?.id!!, playerId: "meinsa", teamA: 0, teamB: teamBValue}
            savingBet = await insertBet(savingBet)
        } else {
            savingBet.teamB = teamBValue
            savingBet = await updateBet(savingBet)
        }

        setMyBet(savingBet)
        setSaving(false)
    }

    const renderFormIfPossible = function () {
        if (currentPlayer?.id != undefined)
            return (
                <form>
                    <input type={"number"} name={"teamA"} onChange={teamAChanged} value={myBetA}
                           disabled={saving}></input>
                    <input type={"number"} name={"teamB"} onChange={teamBChanged} value={myBetB}
                           disabled={saving}></input>
                </form>
            )
        return (
            <div></div>
        )
    }

    return renderFormIfPossible()

}