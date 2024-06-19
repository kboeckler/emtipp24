'use client'

import {Match} from "@/app/matches/match";
import {Bet} from "@/app/bet";
import {ChangeEvent, useEffect, useState} from "react";
import {insertBet, updateBet} from "@/app/actions/repo";
import {Player} from "@/app/player/player";

export default function MatchBetForm({player, match, matchBets}: { player: Player, match: Match, matchBets: Bet[] }) {
    const [myBet, setMyBet] = useState<Bet>();
    const [myBetA, setMyBetA] = useState<Number | undefined>()
    const [myBetB, setMyBetB] = useState<Number | undefined>()
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        for (const bet of matchBets) {
            if (bet.playerId == player.id) {
                setMyBet(bet)
                setMyBetA(bet.teamA)
                setMyBetB(bet.teamB)
                break
            }
        }
    }, [match.id, matchBets, player.id])

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
            savingBet = {matchId: match.id, playerId: player.id, teamA: teamAValue, teamB: 0}
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
            savingBet = {matchId: match.id, playerId: player.id, teamA: 0, teamB: teamBValue}
            savingBet = await insertBet(savingBet)
        } else {
            savingBet.teamB = teamBValue
            savingBet = await updateBet(savingBet)
        }

        setMyBet(savingBet)
        setSaving(false)
    }

    function matchHasBegun() {
        return match.start !== undefined && match.start < new Date();
    }

    const valA = myBetA !== undefined ? "" + myBetA : ""
    const valB = myBetB !== undefined ? "" + myBetB : ""

    return (
        <form className={"inline"}>
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