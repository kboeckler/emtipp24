import {readMatch} from "@/app/actions/repo";

interface MatchItemProps {
    id: string
}

export default async function MatchItem({id}: MatchItemProps) {
    const match = await readMatch(id)
    return (
        <div>
            <div>{match.round.name} | {match?.start?.toDateString()} {match?.start?.toLocaleTimeString()}</div>
            <span>{match.teamA?.name} - {match.teamB?.name}</span>
        </div>
    )
}
