import MatchDetails from "@/app/match/[id]/match-details";
import Link from "next/link";
import MatchBetForm from "@/app/match/[id]/match-bet-form";

export default async function MatchDetailsPage({params}: { params: { id: string } }) {
    const {id} = params

    return (
        <main>
            <h1>Match Detail</h1>
            <Link href={"/login"}>Login</Link><br/>
            <Link href="/">Home</Link><br/>
            <Link href={"/matches"}>Match List</Link><br/>
            <Link href={`/match/${id}`}>Match {id}</Link><br/>
            <hr/>
            <MatchDetails matchId={id}></MatchDetails>
            <MatchBetForm matchId={id}></MatchBetForm>
        </main>
    );
}
