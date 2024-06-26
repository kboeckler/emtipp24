'use client'

import {Match} from "@/app/matches/match";
import {useEffect, useRef, useState} from "react";
import {findAllTeams, MyPlayer, readMatch, updateMatch} from "@/app/actions/repo";
import {Player} from "@/app/player/player";
import {Team} from "@/app/teams/team";
import TeamField from "@/app/round/[id]/team-field";

export default function MatchTeamsForm({matchId}: { matchId: string }) {
    const [match, setMatch] = useState<Match>();
    const [myTeamA, setMyTeamA] = useState<string>("");
    const [myTeamB, setMyTeamB] = useState<string>("");
    const [saving, setSaving] = useState(false)
    const [teams, setTeams] = useState<Team[]>([])
    const [currentPlayer, setCurrentPlayer] = useState<Player | undefined>()

    const initialized = useRef(false)
    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true
            MyPlayer().then(setCurrentPlayer)
            readMatch(matchId).then(match => {
                setMatch(match)
                setMyTeamA(match.teamA?.id || "")
                setMyTeamB(match.teamB?.id || "")
                return
            })
            findAllTeams().then(teams => {
                setTeams(teams)
            })
        }
    }, [matchId])

    const teamAChanged = async function (teamAValue: string) {
        const newTeamA = teams.find(t => t.id === teamAValue)
        if (newTeamA == undefined) {
            return
        }

        setMyTeamA(newTeamA.id)
        setSaving(true)

        let savingMatch = match
        if (savingMatch != undefined) {
            savingMatch.teamA = newTeamA
            savingMatch = await updateMatch(savingMatch)
        }

        setMatch(savingMatch)
        setSaving(false)
    }

    const teamBChanged = async function (teamBValue: string) {
        const newTeamB = teams.find(t => t.id === teamBValue)
        if (newTeamB == undefined) {
            return
        }

        setMyTeamB(newTeamB.id)
        setSaving(true)

        let savingMatch = match
        if (savingMatch != undefined) {
            savingMatch.teamB = newTeamB
            savingMatch = await updateMatch(savingMatch)
        }

        setMatch(savingMatch)
        setSaving(false)
    }

    function renderFormIfPossible() {
        if (currentPlayer?.admin) {
            return (
                <form>
                    <div>Teams:</div>
                    <TeamField teams={teams} teamIdSelected={myTeamA} disabled={saving} saving={saving}
                               onChange={teamAChanged}></TeamField>
                    <TeamField teams={teams} teamIdSelected={myTeamB} disabled={saving} saving={saving}
                               onChange={teamBChanged}></TeamField>
                </form>
            )
        } else return (<div></div>)
    }

    return renderFormIfPossible()

}