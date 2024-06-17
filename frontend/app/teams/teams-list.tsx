import {findAllTeams} from "@/app/actions/repo";
import Link from "next/link";

export default async function TeamsList() {
    let teams = await findAllTeams()

    return (
        <div className={"tile-list"}>
            {teams.map((team, index) => (
                    <div className={"tile"} key={team.id}><Link href={`/team/${team.id}`}>{team.name}</Link>
                    </div>
                )
            )}
        </div>
    )
}