'use client'

import Link from 'next/link'
import {insertBet, readBetsForMatch, readMatch, updateBet} from "@/app/repo";
import {Match} from "@/app/match";
import {Bet} from "@/app/bet";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";

export default function MatchDetails({params}: { params: { id: string } }) {
    const {id} = params
    const [match, setMatch] = useState<Match>();
    const [bets, setBets] = useState<Bet[]>([]);
    const [myBet, setMyBet] = useState<Bet>();
    const [myBetA, setMyBetA] = useState(0)
    const [myBetB, setMyBetB] = useState(0)

    useEffect(() => {
        readMatch(id).then(matchResult => {
            setMatch(matchResult)
            setMyBet(new Bet(undefined, match?.id!!, "meinsa", 0, 0))
        })
        readBetsForMatch(id).then(betsResult => setBets(betsResult))
    }, [id, match?.id])

    const teamAChanged = async function (e: ChangeEvent) {
        const inputField = e.target as HTMLInputElement;
        const teamAValue = Number(inputField.value)
        console.log('A: ' + teamAValue)
        setMyBetA(teamAValue)

        let savingBet = myBet
        if (savingBet == undefined || savingBet.id == undefined) {
            savingBet = new Bet(undefined, match?.id!!, "meinsa", teamAValue, 0)
            savingBet = await insertBet(savingBet)
        } else {
            savingBet.teamA = teamAValue
            savingBet = await updateBet(savingBet)
        }

        setMyBet(savingBet)

        e.preventDefault()
    }

    const teamBChanged = async function (e: ChangeEvent) {
        const inputField = e.target as HTMLInputElement;
        const teamBValue = Number(inputField.value)
        console.log('B: ' + teamBValue)
        setMyBetB(teamBValue)

        let savingBet = myBet
        if (savingBet == undefined || savingBet.id == undefined) {
            savingBet = new Bet(undefined, match?.id!!, "meinsa", 0, teamBValue)
            savingBet = await insertBet(savingBet)
        } else {
            savingBet.teamB = teamBValue
            savingBet = await updateBet(savingBet)
        }

        setMyBet(savingBet)

        e.preventDefault()
    }

    return (
        <main>
            <h1>Match Detail</h1>
            <Link href="/">Home</Link><br/>
            <Link href={"/matches"}>Match List</Link><br/>
            <Link href={`/match/${id}`}>Match {id}</Link><br/>
            <hr/>
            <div>Id: {match?.id}</div>
            <div>Start: {match?.start?.toDateString()}</div>
            <div>{match?.teamA?.name} gegen {match?.teamB?.name}</div>
            <form>
                <input type={"number"} name={"teamA"} onChange={teamAChanged} value={myBetA}></input>
                <input type={"number"} name={"teamB"} onChange={teamBChanged} value={myBetB}></input>
                <button type={"submit"}>Speichern</button>
            </form>
            {bets.map((bet) => (
                    <li key={bet.id}>{bet.teamA} : {bet.teamB} ({bet.reward})</li>
                )
            )}
        </main>
    );
}
