import MatchDetails from "@/app/match/[id]/match-details";
import {readBetsForMatch, readMatch} from "@/app/actions/repo";
import Link from "next/link";
import MatchBetForm from "@/app/match/[id]/match-bet-form";
import {Bet} from "@/app/bet";

export default async function MatchDetailsPage({params}: { params: { id: string } }) {
    const {id} = params

    const match = await readMatch(id)
    const bets = await readBetsForMatch(id)

    return (
        <main>
            <h1>Match Detail</h1>
            <Link href="/">Home</Link><br/>
            <Link href={"/matches"}>Match List</Link><br/>
            <Link href={`/match/${id}`}>Match {id}</Link><br/>
            <hr/>
            <MatchDetails match={match!!}></MatchDetails>
            <MatchBetForm match={match!!}></MatchBetForm>
        </main>
    );
}
