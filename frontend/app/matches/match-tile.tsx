import Link from "next/link";
import MatchItem from "@/app/matches/match-item";
import MatchBetForm from "@/app/match/[id]/match-bet-form";

interface MatchItemProps {
    id: string
}

export default async function MatchTile({id}: MatchItemProps) {
    return (
        <div className={"tile-match"}>
            <Link href={`/match/${id}`}>
                <MatchItem id={id}></MatchItem>
            </Link>
            <MatchBetForm matchId={id}></MatchBetForm>
        </div>
    )
}
