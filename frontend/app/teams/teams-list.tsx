import {findAllTeams} from "@/app/actions/repo";
import Link from "next/link";

export default async function TeamsList() {
    let teams = await findAllTeams()

    return (
        <ul>
            {teams.map((team, index) => (
                    <li key={team.id}><Link href={`/team/${team.id}`}>{team.name}</Link>
                    </li>
                )
            )}
        </ul>
    )
}