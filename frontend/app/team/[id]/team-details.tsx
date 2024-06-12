'use client'

import {useEffect, useRef, useState} from "react";
import {readBetsForRound, readBetsForTeam, readRound, readTeam} from "@/app/actions/repo";
import {Round} from "@/app/round";
import {RoundBet} from "@/app/round-bet";
import {Team} from "@/app/teams/team";
import {TeamBet} from "@/app/team-bet";

export default function TeamDetails({teamId}: { teamId: string }) {
    const [team, setTeam] = useState<Team>()
    const [bets, setBets] = useState<TeamBet[]>([])

    const initialized = useRef(false)
    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true
            readTeam(teamId).then(setTeam)
            readBetsForTeam(teamId).then(bets => setBets(bets))
        }
    }, [teamId])

    return (
        <div>
            <span>Name: {team?.name}</span><br/>
            <span>Rollen: {team?.reachedRoleIds}</span><br/>
            {bets.map((bet) => (
                    <li key={bet.id}>{bet.playerId} wettet Rolle {bet.reachedRoleId} von {bet.teamId}</li>
                )
            )}
        </div>
    );
}
