'use client'

import {Match} from "@/app/match";
import {Bet} from "@/app/bet";
import {ChangeEvent, useState} from "react";
import {insertBet, updateBet} from "@/app/actions/repo";

interface MatchBetFormProps {
    match: Match
}

export default function MatchBetForm({match}: MatchBetFormProps) {

    const [myBet, setMyBet] = useState<Bet>();
    const [myBetA, setMyBetA] = useState(0)
    const [myBetB, setMyBetB] = useState(0)
    const [saving, setSaving] = useState(false)

    const teamAChanged = async function (e: ChangeEvent) {
        const inputField = e.target as HTMLInputElement;
        const teamAValue = Number(inputField.value)
        console.log('A: ' + teamAValue)
        setMyBetA(teamAValue)
        setSaving(true)
 
        let savingBet = myBet
        if (savingBet == undefined) {
            savingBet = {matchId: match?.id!!, playerId: "meinsa", teamA: teamAValue, teamB: 0}
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

    return (
        <form>
            <input type={"number"} name={"teamA"} onChange={teamAChanged} value={myBetA} disabled={saving}></input>
            <input type={"number"} name={"teamB"} onChange={teamBChanged} value={myBetB} disabled={saving}></input>
        </form>
    )

}