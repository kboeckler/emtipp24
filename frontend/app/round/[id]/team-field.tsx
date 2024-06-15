'use client'

import {Team} from "@/app/teams/team";
import {ChangeEvent} from "react";

export default function TeamField({teams, teamIdSelected, disabled, saving, onChange}: {
    teams: Team[],
    teamIdSelected: string,
    disabled: boolean,
    saving: boolean,
    onChange: (newTeamId: string) => void
}) {

    const onValueChange = function (e: ChangeEvent) {
        const inputField = e.target as HTMLInputElement;
        const teamValue = inputField.value
        onChange(teamValue)
    }

    const renderChooseOptionIfNeeded = function () {
        if (teamIdSelected !== "") {
            return
        }
        return (<option value={""}>Team auswählen</option>)
    }

    const myBetPresent = teamIdSelected !== ""

    return (
        <div>
            <select
                className={"select-team-bet " + (myBetPresent ? "has-value " : "") + (saving ? "is-busy" : "")}
                value={teamIdSelected}
                onChange={onValueChange}
                disabled={disabled}
            >
                {renderChooseOptionIfNeeded()}
                {teams.map((team, index) => (
                        <option key={team.id} value={`${team.id}`}>{team.name}</option>
                    )
                )}
            </select>
        </div>
    )
}