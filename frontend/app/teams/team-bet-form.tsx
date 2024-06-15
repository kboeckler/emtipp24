'use client'

import {useEffect, useRef, useState} from "react";
import {findAllTeamBets, findAllTeams, findCurrentPlayer, insertTeamBet, updateTeamBet} from "@/app/actions/repo";
import {Team} from "@/app/teams/team";
import {Player} from "@/app/player/player";
import TeamField from "@/app/round/[id]/team-field";
import {TeamBet} from "@/app/team-bet";

export default function TeamBetForm() {
    const [player, setPlayer] = useState<Player>();
    const [teams, setTeams] = useState<Team[]>([])
    const [myBets, setMyBets] = useState<Map<string, TeamBet>>(new Map());
    const [saving, setSaving] = useState(false)

    const initialized = useRef(false)
    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true
            findCurrentPlayer().then(playerRes => {
                setPlayer(playerRes)
                if (playerRes != undefined) {
                    findAllTeamBets().then(bets => {
                        const betsOfMyPlayer: Map<string, TeamBet> = new Map()
                        for (const bet of bets) {
                            if (bet.playerId == playerRes.id) {
                                betsOfMyPlayer.set(bet.reachedRoleId, bet)
                            }
                        }
                        setMyBets(betsOfMyPlayer)
                    })
                }
            })
            findAllTeams().then(setTeams)
        }
    }, [])

    const teamChanged = async function (roleId: string, newTeamId: string) {
        if (newTeamId === "") {
            return
        }
        setSaving(true)

        let savingBet = myBets.has(roleId) ? myBets.get(roleId) : undefined
        if (savingBet == undefined) {
            savingBet = {playerId: player!!.id, teamId: newTeamId, reachedRoleId: roleId}
            savingBet = await insertTeamBet(savingBet)
        } else {
            savingBet.teamId = newTeamId
            savingBet = await updateTeamBet(savingBet)
        }

        const newMyBets = myBets
        newMyBets.set(roleId, savingBet)

        setMyBets(newMyBets)
        setSaving(false)
    }

    return (
        <form>
            <div>Meine Tipps:</div>
            <br/>
            <span>Europameister:</span>
            <TeamField teams={teams}
                       teamIdSelected={myBets.get('TOURNAMENT_WINNER')?.teamId || ''}
                       disabled={saving}
                       saving={saving}
                       onChange={(newTeamId) => teamChanged('TOURNAMENT_WINNER', newTeamId)}></TeamField>
            <span>Vize-Europameister:</span>
            <TeamField teams={teams}
                       teamIdSelected={myBets.get('TOURNAMENT_SECOND')?.teamId || ''}
                       disabled={saving}
                       saving={saving}
                       onChange={(newTeamId) => teamChanged('TOURNAMENT_SECOND', newTeamId)}></TeamField>
        </form>
    )

}