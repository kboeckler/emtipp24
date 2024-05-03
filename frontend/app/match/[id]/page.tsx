import Link from 'next/link'
import {readBetsForMatch, readMatch} from "@/app/repo";

export default async function MatchDetails({params}: { params: { id: string } }) {
    const {id} = params

    const match = await readMatch(id)
    const bets = await readBetsForMatch(id)

    const doSome = function() {
        alert('Hallo')
    }

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
            <form>
                <input type={"number"} name={"teamA"}></input>
                <input type={"number"} name={"teamB"}></input>
                <button type={"submit"} >Speichern</button>
            </form>
            {bets.map((bet) => (
                    <li key={bet.id}>{bet.teamA} : {bet.teamB} ({bet.reward})</li>
                )
            )}
        </main>
    );
}
