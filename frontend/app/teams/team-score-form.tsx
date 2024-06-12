'use client'

import {useEffect, useRef, useState} from "react";
import {findAllTeams, findCurrentPlayer, updateTeam} from "@/app/actions/repo";
import {Team} from "@/app/teams/team";
import {Player} from "@/app/player/player";
import TeamField from "@/app/round/[id]/team-field";

export default function TeamScoreForm() {
    const [player, setPlayer] = useState<Player>();
    const [teams, setTeams] = useState<Team[]>([])
    const [teamPerRole, setTeamPerRole] = useState<Map<string, Team>>(new Map());
    const [saving, setSaving] = useState(false)

    const initialized = useRef(false)
    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true
            findCurrentPlayer().then(setPlayer)
            findAllTeams().then(teams => {
                setTeams(teams)
                const teamPerRole = new Map()
                for (const team of teams) {
                    for (const reachedRoleId of team.reachedRoleIds) {
                        teamPerRole.set(reachedRoleId, team)
                    }
                }
                setTeamPerRole(teamPerRole)
            })
        }
    }, [])

    const teamChanged = async function (reachedRoleId: string, newTeamId: string) {
        if (newTeamId === "") {
            return
        }
        setSaving(true)

        for (const team of teams) {
            const previousTeamForThisRole = teamPerRole.get(reachedRoleId)
            if (previousTeamForThisRole != undefined) {
                teamPerRole.delete(reachedRoleId)
                const newReachedRoleIds = []
                for (const previousReachedRoleId of previousTeamForThisRole.reachedRoleIds) {
                    if (previousReachedRoleId != reachedRoleId) {
                        newReachedRoleIds.push(previousReachedRoleId)
                    }
                }
                previousTeamForThisRole.reachedRoleIds = newReachedRoleIds
                await updateTeam(previousTeamForThisRole)
            }
            const nextTeamForThisRole = teams.find(it => it.id == newTeamId)
            if (nextTeamForThisRole != undefined) {
                teamPerRole.set(reachedRoleId, nextTeamForThisRole)
                const newReachedRoleIds = []
                for (const previousReachedRoleId of nextTeamForThisRole.reachedRoleIds) {
                    if (previousReachedRoleId != reachedRoleId) {
                        newReachedRoleIds.push(previousReachedRoleId)
                    }
                }
                newReachedRoleIds.push(reachedRoleId)
                nextTeamForThisRole.reachedRoleIds = newReachedRoleIds
                await updateTeam(nextTeamForThisRole)
            }
        }

        setTeamPerRole(teamPerRole)
        setSaving(false)
    }

    const renderFormIfPossible = function () {
        if (player?.admin) {
            return (
                <form>
                    <span>WINNER Result:</span>
                    <TeamField teams={teams} teamIdSelected={teamPerRole.get('TOURNAMENT_WINNER')?.id || ""}
                               disabled={saving}
                               onChange={teamId => teamChanged('TOURNAMENT_WINNER', teamId)}></TeamField>
                    <span>SECOND Result:</span>
                    <TeamField teams={teams} teamIdSelected={teamPerRole.get('TOURNAMENT_SECOND')?.id || ""}
                               disabled={saving}
                               onChange={teamId => teamChanged('TOURNAMENT_SECOND', teamId)}></TeamField>
                </form>
            )
        } else return (
            <div></div>
        )
    }

    return renderFormIfPossible()

}