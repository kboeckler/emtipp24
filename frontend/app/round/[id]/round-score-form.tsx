'use client'

import {useEffect, useRef, useState} from "react";
import {findCurrentPlayer, findTeamsForRound, readRound, updateRound} from "@/app/actions/repo";
import {Round} from "@/app/round";
import {Team} from "@/app/teams/team";
import {Player} from "@/app/player/player";
import TeamField from "@/app/round/[id]/team-field";

export default function RoundScoreForm({roundId}: { roundId: string }) {
    const [player, setPlayer] = useState<Player>();
    const [round, setRound] = useState<Round>();
    const [teams, setTeams] = useState<Team[]>([])
    const [saving, setSaving] = useState(false)

    const initialized = useRef(false)
    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true
            findCurrentPlayer().then(setPlayer)
            readRound(roundId).then(round => setRound(round))
            findTeamsForRound(roundId).then(setTeams)
        }
    }, [roundId])

    const winnerFirstChanged = async function (newTeamId: string) {
        if (newTeamId === "") {
            return
        }
        setSaving(true)

        let savingRound = round
        if (savingRound != undefined) {
            savingRound.winnerFirstId = newTeamId
            savingRound = await updateRound(savingRound)
        }

        setRound(savingRound)
        setSaving(false)
    }

    const winnerSecondChanged = async function (newTeamId: string) {
        if (newTeamId === "") {
            return
        }
        setSaving(true)

        let savingRound = round
        if (savingRound != undefined) {
            savingRound.winnerSecondId = newTeamId
            savingRound = await updateRound(savingRound)
        }

        setRound(savingRound)
        setSaving(false)
    }

    const renderFormIfPossible = function () {
        if (player?.admin) {
            return (
                <form>
                    <TeamField teams={teams} teamIdSelected={round?.winnerFirstId || ""} disabled={saving}
                               saving={saving}
                               onChange={winnerFirstChanged}></TeamField>
                    <TeamField teams={teams} teamIdSelected={round?.winnerSecondId || ""} disabled={saving}
                               saving={saving}
                               onChange={winnerSecondChanged}></TeamField>
                </form>
            )
        } else return (
            <div></div>
        )
    }

    return renderFormIfPossible()

}