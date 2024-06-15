'use client'

import {useEffect, useRef, useState} from "react";
import {MyPlayer, readBetsForTeam, readTeam} from "@/app/actions/repo";
import {Team} from "@/app/teams/team";
import {TeamBet} from "@/app/team-bet";
import {Player} from "@/app/player/player";

export default function TeamDetails({teamId}: { teamId: string }) {
    const [player, setPlayer] = useState<Player>()
    const [team, setTeam] = useState<Team>()
    const [bets, setBets] = useState<TeamBet[]>([])

    const initialized = useRef(false)
    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true
            MyPlayer().then(myPlayer => {
                setPlayer(myPlayer)
                if (myPlayer !== undefined) {
                    readTeam(teamId).then(setTeam)
                    readBetsForTeam(teamId).then(bets => setBets(bets))
                }
            })
        }
    }, [teamId])

    const renderRolesIfAdmin = function () {
        if (player?.admin) {
            return (
                <>
                    <span>Rollen: {team?.reachedRoleIds}</span><br/>
                    {bets.map((bet) => (
                            <li key={bet.id}>{bet.playerId} wettet Rolle {bet.reachedRoleId} von {bet.teamId}</li>
                        )
                    )}
                </>
            )
        }
    }

    return (
        <div>
            <span>Name: {team?.name}</span><br/>
            {renderRolesIfAdmin()}
        </div>
    );
}
