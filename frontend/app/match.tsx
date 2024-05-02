import {readMatch} from "@/app/repo";

export class Match {
    id: string
    start?: Date

    constructor(id: string, start?: Date) {
        this.id = id
        this.start = start
    }
}

interface MatchItemProps {
    id: string
}

export default async function MatchItem({id}: MatchItemProps) {
    const match = await readMatch(id)

    return (
        <span>Start: {match?.start?.toDateString()} | Id: {match?.id}</span>
    )
}
