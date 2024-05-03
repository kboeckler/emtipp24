import {readMatch} from "@/app/repo";

interface MatchItemProps {
    id: string
}

export default async function MatchItem({id}: MatchItemProps) {
    const match = await readMatch(id)

    return (
        <span>Start: {match?.start?.toDateString()} | Id: {match?.id}</span>
    )
}
