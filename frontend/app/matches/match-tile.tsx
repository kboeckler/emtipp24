import Link from "next/link";
import MatchItem from "@/app/matches/match-item";
import MatchBetForm from "@/app/match/[id]/match-bet-form";
import MatchScore from "@/app/match/[id]/match-score";

interface MatchItemProps {
    id: string
}

export default async function MatchTile({id}: MatchItemProps) {
    return (
        <div className={"tile"}>
            <Link href={`/match/${id}`}>
                <MatchItem id={id}></MatchItem>
            </Link>
            <div>
                <MatchBetForm matchId={id}></MatchBetForm>
                <MatchScore matchId={id}></MatchScore>
            </div>
        </div>
    )
}
