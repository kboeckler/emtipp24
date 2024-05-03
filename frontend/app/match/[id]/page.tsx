import Link from 'next/link'
import MatchItem from "@/app/matches/match-item";
import {readMatch} from "@/app/repo";

export default async function MatchDetails({ params }: { params: { id: string } }) {
    const { id } = params

    const match = await readMatch(id)

    return (
        <main>
            <h1>Match Detail</h1>
            <Link href="/">Home</Link><br/>
            <Link href={"/matches"}>Match List</Link><br/>
            <Link href={`/match/${id}`}>Match {id}</Link><br/>
            <hr/>
            <div>Id: {match?.id}</div>
            <div>Start: {match?.start?.toDateString()}</div>
            <div>{match?.teamA?.name} gegen {match?.teamB?.name}</div>
        </main>
    );
}
