'use client'

import {Match} from "@/app/matches/match";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import {findCurrentPlayer, insertCurrentPlayer, isAuthenticated, readMatch, updateMatch} from "@/app/actions/repo";
import {Player} from "@/app/player";

export default function MatchScoreForm({matchId}: { matchId: string }) {
    const [match, setMatch] = useState<Match>();
    const [myScoreA, setMyScoreA] = useState(0)
    const [myScoreB, setMyScoreB] = useState(0)
    const [saving, setSaving] = useState(false)
    const [currentPlayer, setCurrentPlayer] = useState<Player | undefined>()

    const initialized = useRef(false)
    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true
            isAuthenticated().then(isAuthenticated => {
                if (isAuthenticated) {
                    findCurrentPlayer().then(playerOrUndefined => {
                        if (playerOrUndefined === undefined) {
                            insertCurrentPlayer().then(insertedPlayer => setCurrentPlayer(insertedPlayer))
                        } else {
                            setCurrentPlayer(playerOrUndefined)
                        }
                    })
                }
            })
            readMatch(matchId).then(match => {
                if (match?.scoreA == null) {
                    match!!.scoreA = 0
                }
                if (match?.scoreB == null) {
                    match!!.scoreB = 0
                }
                setMyScoreA(match!!.scoreA)
                setMyScoreB(match!!.scoreB)
                setMatch(match)
            })
        }
    }, [matchId])

    const scoreAChanged = async function (e: ChangeEvent) {
        const inputField = e.target as HTMLInputElement;
        const scoreAValue = Number(inputField.value)
        console.log('A: ' + scoreAValue)
        setMyScoreA(scoreAValue)
        setSaving(true)

        let savingMatch = match
        if (savingMatch != undefined) {
            savingMatch.scoreA = scoreAValue
            savingMatch = await updateMatch(savingMatch)
        }

        setMatch(savingMatch)
        setSaving(false)
    }

    const scoreBChanged = async function (e: ChangeEvent) {
        const inputField = e.target as HTMLInputElement;
        const scoreBValue = Number(inputField.value)
        console.log('B: ' + scoreBValue)
        setMyScoreB(scoreBValue)
        setSaving(true)

        let savingMatch = match
        if (savingMatch != undefined) {
            savingMatch.scoreB = scoreBValue
            savingMatch = await updateMatch(savingMatch)
        }

        setMatch(savingMatch)
        setSaving(false)
    }

    function renderFormIfPossible() {
        if (currentPlayer?.admin) {
            return (
                <form>
                    <input type={"number"} name={"scooreA"} onChange={scoreAChanged} value={myScoreA}
                           disabled={saving}></input>
                    <input type={"number"} name={"scoreB"} onChange={scoreBChanged} value={myScoreB}
                           disabled={saving}></input>
                </form>
            )
        } else return (<div></div>)
    }

    return renderFormIfPossible()

}