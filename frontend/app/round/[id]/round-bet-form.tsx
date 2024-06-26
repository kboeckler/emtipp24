'use client'

import {useEffect, useRef, useState} from "react";
import {
    findCurrentPlayer,
    findTeamsForRound,
    insertRoundBet,
    readBetsForRound,
    readRound,
    updateRoundBet
} from "@/app/actions/repo";
import {Round} from "@/app/round";
import {RoundBet} from "@/app/round-bet";
import {Team} from "@/app/teams/team";
import {Player} from "@/app/player/player";
import TeamField from "@/app/round/[id]/team-field";

export default function RoundBetForm({roundId}: { roundId: string }) {
    const [player, setPlayer] = useState<Player>();
    const [round, setRound] = useState<Round>();
    const [teams, setTeams] = useState<Team[]>([])
    const [myBet, setMyBet] = useState<RoundBet>();
    const [myBetTeam, setMyBetTeam] = useState("")
    const [saving, setSaving] = useState(false)

    const initialized = useRef(false)
    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true
            findCurrentPlayer().then(playerRes => {
                setPlayer(playerRes)
                if (playerRes != undefined) {
                    readBetsForRound(roundId).then(bets => {
                        for (const bet of bets) {
                            if (bet.playerId == playerRes.id) {
                                setMyBet(bet)
                                setMyBetTeam(bet.placingTeamId)
                                break
                            }
                        }
                    })
                }
            })
            readRound(roundId).then(round => setRound(round))
            findTeamsForRound(roundId).then(setTeams)
        }
    }, [roundId])

    const teamChanged = async function (newTeamId: string) {
        if (newTeamId === "") {
            return
        }
        setMyBetTeam(newTeamId)
        setSaving(true)

        let savingBet = myBet
        if (savingBet == undefined) {
            savingBet = {roundId: round?.id!!, playerId: player!!.id, placement: 1, placingTeamId: newTeamId}
            savingBet = await insertRoundBet(savingBet)
        } else {
            savingBet.placingTeamId = newTeamId
            savingBet = await updateRoundBet(savingBet)
        }

        setMyBet(savingBet)
        setSaving(false)
    }

    return (
        <form>
            <TeamField teams={teams} teamIdSelected={myBetTeam} disabled={saving} saving={saving}
                       onChange={teamChanged}></TeamField>
        </form>
    )

}