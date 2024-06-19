import Link from "next/link";
import MatchItem from "@/app/matches/match-item";
import MatchBetForm from "@/app/match/[id]/match-bet-form";
import MatchReward from "@/app/match/[id]/match-reward";
import MatchResult from "@/app/match/[id]/match-result";
import {Match} from "@/app/matches/match";
import {Player} from "@/app/player/player";
import {Bet} from "@/app/bet";

export default async function MatchTile({player, match, matchBets}: {
    player: Player,
    match: Match,
    matchBets: Bet[]
}) {
    return (
        <div className={"tile"}>
            <Link href={`/match/${match.id}`}>
                <MatchItem match={match}></MatchItem>
            </Link>
            <MatchResult match={match}></MatchResult>
            <div>
                <MatchBetForm player={player} match={match} matchBets={matchBets}></MatchBetForm>
                <MatchReward player={player} matchBets={matchBets}></MatchReward>
            </div>
        </div>
    )
}
